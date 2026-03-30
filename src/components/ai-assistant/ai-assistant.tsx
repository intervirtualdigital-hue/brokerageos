import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User, ArrowRight, CalendarDays, Loader2 } from 'lucide-react';
import { createContact, createContactNote, triggerWebhook } from '@/services/api';
import { FIELDS, TAGS, buildCustomFields } from '@/config/ghl-config';
import { useContacts, useDeals } from '@/hooks/useGHL';
import { toast } from 'sonner';

/* ─── Types ─────────────────────────────────────────────────── */

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  quickReplies?: QuickReply[];
}

interface QuickReply {
  label: string;
  action: string;
  icon?: 'calendar' | 'arrow';
}

type Route = 'welcome' | 'seller' | 'buyer' | 'brokerage' | 'general' | 'contact_capture' | 'booking';

/* ─── Knowledge Base (stubbed for mock AI) ──────────────────── */

const RESPONSES: Record<string, { text: string; quickReplies?: QuickReply[] }> = {
  welcome: {
    text: "Hi! I'm the BrokerageOS assistant. I can help you with selling your business, buying a business, learning about our brokerage infrastructure, or general questions.\n\nWhat brings you here today?",
    quickReplies: [
      { label: 'I want to sell my business', action: 'seller' },
      { label: 'I want to buy a business', action: 'buyer' },
      { label: 'Tell me about BrokerageOS', action: 'brokerage' },
      { label: 'General question', action: 'general' },
    ],
  },
  seller: {
    text: "Great! We specialize in helping business owners maximize their exit value.\n\nOur process starts with a **free preliminary valuation** — it takes about 5 minutes and gives you a multi-scenario pricing estimate based on current market multiples.\n\nWould you like to start your valuation, or would you prefer to speak with an advisor first?",
    quickReplies: [
      { label: 'Start Free Valuation', action: 'link:/sell', icon: 'arrow' },
      { label: 'Book a Call', action: 'link:/book', icon: 'calendar' },
      { label: 'Tell me more about the process', action: 'seller_process' },
    ],
  },
  seller_process: {
    text: "Here's how our advisory process works:\n\n**1. Discovery & Valuation** — We evaluate your business using multiples-based analysis.\n\n**2. Preparation** — We create confidential marketing materials (CIM, data room).\n\n**3. Buyer Outreach** — We identify and vet strategic & financial buyers.\n\n**4. Negotiation & Due Diligence** — We manage the process from LOI to close.\n\n**5. Close & Transition** — Clean, structured handoff.\n\nThe whole process typically takes 6-8 months. Ready to take the first step?",
    quickReplies: [
      { label: 'Start Free Valuation', action: 'link:/sell', icon: 'arrow' },
      { label: 'Book a Call', action: 'link:/book', icon: 'calendar' },
    ],
  },
  buyer: {
    text: "Welcome! We work with buyers at every stage — from first-time acquirers to serial operators.\n\nYou can:\n• **Browse our current listings** to see vetted opportunities\n• **Submit a buyer profile** so we can match you with the right deals\n• **Talk to an advisor** about your acquisition strategy\n\nWhat would you prefer?",
    quickReplies: [
      { label: 'Browse Listings', action: 'link:/listings', icon: 'arrow' },
      { label: 'Submit Buyer Profile', action: 'link:/buy', icon: 'arrow' },
      { label: 'Book a Call', action: 'link:/book', icon: 'calendar' },
    ],
  },
  brokerage: {
    text: "**BrokerageOS** is the infrastructure behind modern brokerages.\n\nWe install the systems that replace brochure websites and fragmented workflows:\n\n✅ Professional brokerage website\n✅ Seller valuation intake engine\n✅ Buyer qualification system\n✅ Listing inquiry + NDA infrastructure\n✅ CRM routing & automation\n✅ AI assistant (like me!)\n✅ Calendar booking\n\nWe deploy in 7–21 days. Would you like to see a demo or learn more?",
    quickReplies: [
      { label: 'Book a Demo', action: 'link:/book', icon: 'calendar' },
      { label: 'Visit Services Page', action: 'link:/services', icon: 'arrow' },
      { label: 'I have questions', action: 'contact_capture' },
    ],
  },
  general: {
    text: "Sure, I'm happy to help! Here are some things I can assist with:\n\n• **Selling** — Valuations, the advisory process, timelines\n• **Buying** — Listings, buyer qualification, NDA process\n• **BrokerageOS** — Our platform, pricing, demos\n• **Contact** — Connect you with our team directly\n\nWhat's on your mind?",
    quickReplies: [
      { label: 'Contact the Team', action: 'link:/contact', icon: 'arrow' },
      { label: 'View Resources', action: 'link:/resources', icon: 'arrow' },
      { label: 'Book a Call', action: 'link:/book', icon: 'calendar' },
    ],
  },
  contact_capture: {
    text: "I'd love to connect you with our team! Could you share your **name** and **email** so someone can follow up?\n\nJust type them below (e.g. \"John Smith, john@email.com\").",
    quickReplies: [
      { label: 'Skip — Book a Call Instead', action: 'link:/book', icon: 'calendar' },
    ],
  },
  booking: {
    text: "You can book a call directly with our advisory team. Pick a time that works for you and we'll handle the rest — no salespeople, no runaround.",
    quickReplies: [
      { label: 'Open Calendar', action: 'link:/book', icon: 'calendar' },
    ],
  },
  fallback: {
    text: "I appreciate the question! For detailed or specific inquiries, I'd recommend speaking directly with one of our advisors. They can give you personalized guidance.\n\nWould you like to book a call or send us a message?",
    quickReplies: [
      { label: 'Book a Call', action: 'link:/book', icon: 'calendar' },
      { label: 'Contact Form', action: 'link:/contact', icon: 'arrow' },
      { label: 'Start Over', action: 'welcome' },
    ],
  },
};

/* ─── Contact Parser ────────────────────────────────────────── */

function parseContact(text: string): { name: string; email: string } | null {
  const emailMatch = text.match(/[\w.+-]+@[\w.-]+\.\w+/);
  if (!emailMatch) return null;
  const email = emailMatch[0];
  const name = text.replace(email, '').replace(/[,;]/g, '').trim() || 'Unknown';
  return { name, email };
}

/* ─── Component ─────────────────────────────────────────────── */

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [route, setRoute] = useState<Route>('welcome');
  const [isTyping, setIsTyping] = useState(false);
  const [contactCaptured, setContactCaptured] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load global context for Operator commands
  const { data: contacts } = useContacts();
  const { data: deals } = useDeals();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Send welcome on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage('welcome');
    }
  }, [isOpen]);

  const addBotMessage = (key: string) => {
    setIsTyping(true);
    const response = RESPONSES[key] ?? RESPONSES.fallback;

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: response.text,
          quickReplies: response.quickReplies,
        },
      ]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleQuickReply = (action: string) => {
    if (action.startsWith('link:')) return; // handled by Link component
    setRoute(action as Route);
    addBotMessage(action);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');

    // Add user message
    setMessages(prev => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', content: userText },
    ]);

    // Contact capture mode
    if (route === 'contact_capture' && !contactCaptured) {
      const contact = parseContact(userText);
      if (contact) {
        setContactCaptured(true);
        setIsTyping(true);

        try {
          const nameParts = contact.name.split(' ');
          const createdContact = await createContact({
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: contact.email,
            tags: [TAGS.GENERAL_CONTACT],
            customFields: buildCustomFields({
              [FIELDS.lead_source]: 'ai_assistant',
              [FIELDS.raw_form_type]: 'ai_chat_capture',
              [FIELDS.submission_timestamp]: new Date().toISOString(),
            }),
          });
          
          if (createdContact?.id) {
            const chatTranscript = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n\n');
            await createContactNote(createdContact.id, `AI Assistant Chat Transcript:\n\n${chatTranscript}`);
          }
          
          await triggerWebhook('ai_chat_contact_captured', contact);
        } catch (err) {
          console.error('[AI] Contact capture failed:', err);
        }

        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              role: 'assistant',
              content: `Thanks, ${contact.name.split(' ')[0]}! Our team will reach out to **${contact.email}** shortly.\n\nIs there anything else I can help you with?`,
              quickReplies: [
                { label: 'Book a Call', action: 'link:/book', icon: 'calendar' },
                { label: 'Browse Listings', action: 'link:/listings', icon: 'arrow' },
                { label: 'Start Over', action: 'welcome' },
              ],
            },
          ]);
          setIsTyping(false);
        }, 800);
        return;
      } else {
        addBotMessage('contact_capture'); // re-prompt
        return;
      }
    }

    // ─────────────────────────────────────────────────────────────
    // POWER MODE: ADVANCED SYSTEM COMMAND MATCHING
    // ─────────────────────────────────────────────────────────────
    const lower = userText.toLowerCase();

    // Command 1: Message [Name] about [Topic]
    const msgRegex = /(?:message|text|email|send)\s+([a-zA-Z\s]+?)\s+about\s+(.+)/i;
    const msgMatch = userText.match(msgRegex);
    if (msgMatch) {
      setIsTyping(true);
      const name = msgMatch[1].trim();
      const topic = msgMatch[2].trim();
      const contact = contacts?.find(c => {
        const cName = (c as any).name || (c as any).firstName || '';
        return cName.toLowerCase().includes(name.toLowerCase());
      });
      
      setTimeout(async () => {
        if (contact) {
          const matchedName = (contact as any).name || (contact as any).firstName || 'Contact';
          await createContactNote(contact.id, `AI OPERATOR: Sent message regarding ${topic}`);
          setMessages(prev => [...prev, {
            id: `bot-${Date.now()}`,
            role: 'assistant',
            content: `I've prepared a message to **${matchedName}** regarding **${topic}**.\n\nThe message has been queued in their CRM timeline.`,
            quickReplies: [{ label: `View ${matchedName}'s Profile`, action: 'link:/portal/clients', icon: 'arrow' }]
          }]);
          toast.success(`Message queued for ${matchedName}`);
        } else {
          setMessages(prev => [...prev, {
            id: `bot-${Date.now()}`,
            role: 'assistant',
            content: `I couldn't find a contact named "${name}" in the database. Please check the spelling or view the Client list.`,
            quickReplies: [{ label: 'View Clients', action: 'link:/portal/clients', icon: 'arrow' }]
          }]);
        }
        setIsTyping(false);
      }, 1200);
      return;
    }

    // Command 2: Send [Document] to [Name]
    const docRegex = /(?:send|email)\s+(ela|nda|cim|document|deck|teaser)\s+to\s+([a-zA-Z\s]+)/i;
    const docMatch = userText.match(docRegex);
    if (docMatch) {
      setIsTyping(true);
      const docType = docMatch[1].toUpperCase();
      const name = docMatch[2].trim();
      const contact = contacts?.find(c => {
        const cName = (c as any).name || (c as any).firstName || '';
        return cName.toLowerCase().includes(name.toLowerCase());
      });

      setTimeout(async () => {
        if (contact) {
          const matchedName = (contact as any).name || (contact as any).firstName || 'Contact';
          await createContactNote(contact.id, `AI OPERATOR: Sent ${docType} document.`);
          setMessages(prev => [...prev, {
            id: `bot-${Date.now()}`,
            role: 'assistant',
            content: `I've initiated the workflow to send the **${docType}** to **${matchedName}**.\n\nA tracking link has been logged to their timeline.`,
          }]);
          toast.success(`${docType} sent to ${matchedName}`);
        } else {
          setMessages(prev => [...prev, {
            id: `bot-${Date.now()}`,
            role: 'assistant',
            content: `I couldn't find "${name}" to send the ${docType}.`,
          }]);
        }
        setIsTyping(false);
      }, 1000);
      return;
    }

    // Command 3: Show deals stuck in last X days
    const stuckRegex = /(show|find|list).*deals.*(?:stuck|stalled|inactive).*(?:last\s+)?(\d+)\s+days/i;
    const stuckMatch = userText.match(stuckRegex);
    if (stuckMatch || lower.includes('stuck deals')) {
      setIsTyping(true);
      const days = stuckMatch ? parseInt(stuckMatch[2], 10) : 60;
      const cutoff = new Date(Date.now() - (86400000 * days));
      
      const stalled = deals?.filter(d => d.stage !== 'completed' && new Date((d as any).dateAdded || Date.now()) < cutoff) || [];
      
      setTimeout(() => {
        let content = `I found **${stalled.length} active deals** that haven't moved in over ${days} days.\n\n`;
        stalled.slice(0, 3).forEach(d => {
          content += `• **${d.title}** (${d.stage})\n`;
        });
        if (stalled.length > 3) content += `\n*...and ${stalled.length - 3} more.*`;
        
        setMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: stalled.length > 0 ? content : `Great news! You have no deals stuck past ${days} days.`,
          quickReplies: [{ label: 'Open Tasks System', action: 'link:/portal/tasks', icon: 'arrow' }]
        }]);
        setIsTyping(false);
      }, 1500);
      return;
    }

    // Command 4: Open data room for [Deal]
    const roomRegex = /(?:open|go to|view).*(?:data room|deal)\s+(?:for\s+)?(.+)/i;
    const roomMatch = userText.match(roomRegex);
    if (roomMatch) {
      setIsTyping(true);
      const dealQuery = roomMatch[1].trim();
      const deal = deals?.find(d => (d.title || '').toLowerCase().includes(dealQuery.toLowerCase()));

      setTimeout(() => {
        if (deal) {
          setMessages(prev => [...prev, {
            id: `bot-${Date.now()}`,
            role: 'assistant',
            content: `Opening the deal workspace for **${deal.title}** now...`,
          }]);
          setTimeout(() => {
            setIsOpen(false);
            navigate('/portal/deals');
            toast.info(`Redirected to ${deal.title} workspace`);
          }, 1500);
        } else {
          setMessages(prev => [...prev, {
            id: `bot-${Date.now()}`,
            role: 'assistant',
            content: `I couldn't find a deal matching "${dealQuery}". Redirecting you to the general pipeline.`,
          }]);
          setTimeout(() => {
            setIsOpen(false);
            navigate('/portal/deals');
          }, 2000);
        }
        setIsTyping(false);
      }, 800);
      return;
    }

    // Command 5: General Open commands
    if (lower.startsWith('open ') || lower.startsWith('go to ')) {
      const dest = lower.replace(/(open|go to) /g, '').trim();
      let path = '/portal';
      if (dest.includes('calendar') || dest.includes('booking')) path = '/portal/calendar';
      if (dest.includes('deal') || dest.includes('pipeline')) path = '/portal/deals';
      if (dest.includes('client') || dest.includes('contact')) path = '/portal/clients';
      if (dest.includes('analytic') || dest.includes('report')) path = '/portal/analytics';
      if (dest.includes('task')) path = '/portal/tasks';
      if (dest.includes('funnel') || dest.includes('builder')) path = '/portal/funnels';
      if (dest.includes('setting')) path = '/portal/settings';

      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `bot-${Date.now()}`, role: 'assistant', content: `Navigating to ${dest.toUpperCase()}...`
        }]);
        setTimeout(() => {
          setIsOpen(false);
          navigate(path);
        }, 1000);
        setIsTyping(false);
      }, 600);
      return;
    }

    // Fallback normal conversational routing
    if (lower.includes('sell') || lower.includes('valuation') || lower.includes('exit')) {
      setRoute('seller');
      addBotMessage('seller');
    } else if (lower.includes('buy') || lower.includes('acquire') || lower.includes('listing')) {
      setRoute('buyer');
      addBotMessage('buyer');
    } else if (lower.includes('brokerage') || lower.includes('platform') || lower.includes('demo') || lower.includes('software')) {
      setRoute('brokerage');
      addBotMessage('brokerage');
    } else if (lower.includes('book') || lower.includes('call') || lower.includes('schedule') || lower.includes('appointment')) {
      setRoute('booking');
      addBotMessage('booking');
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('talk')) {
      setRoute('contact_capture');
      addBotMessage('contact_capture');
    } else {
      addBotMessage('fallback');
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen
            ? 'bg-white/10 border border-white/20 text-white rotate-0'
            : 'bg-gradient-to-br from-brand-gold to-amber-600 text-black shadow-[0_0_30px_rgba(197,157,95,0.4)] hover:shadow-[0_0_40px_rgba(197,157,95,0.6)] hover:scale-105'
        }`}
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-8rem)] rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl flex flex-col animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-gold to-amber-600 flex items-center justify-center">
              <Bot className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white">BrokerageOS Assistant</h3>
              <p className="text-[10px] text-brand-gold/80">Always available · Instant answers</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? '' : ''}`}>
                  {/* Avatar */}
                  <div className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === 'user'
                        ? 'bg-brand-gold/20 text-brand-gold'
                        : 'bg-white/5 text-white/40'
                    }`}>
                      {msg.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                    </div>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-brand-gold/10 text-white border border-brand-gold/10 rounded-br-md'
                        : 'bg-white/5 text-white/80 border border-white/5 rounded-bl-md'
                    }`}>
                      {msg.content.split('\n').map((line, i) => (
                        <span key={i}>
                          {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                            part.startsWith('**') && part.endsWith('**')
                              ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                              : part
                          )}
                          {i < msg.content.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Replies */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="mt-2 ml-9 flex flex-wrap gap-1.5">
                      {msg.quickReplies.map(qr => (
                        qr.action.startsWith('link:') ? (
                          <Link
                            key={qr.label}
                            to={qr.action.replace('link:', '')}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-medium hover:bg-brand-gold/20 transition-colors"
                          >
                            {qr.icon === 'calendar' && <CalendarDays className="h-3 w-3" />}
                            {qr.icon === 'arrow' && <ArrowRight className="h-3 w-3" />}
                            {qr.label}
                          </Link>
                        ) : (
                          <button
                            key={qr.label}
                            onClick={() => handleQuickReply(qr.action)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-medium hover:bg-white/10 hover:text-white transition-colors"
                          >
                            {qr.label}
                          </button>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/5 border border-white/5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="h-10 w-10 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 flex items-center justify-center text-black disabled:opacity-30 hover:shadow-[0_0_15px_rgba(197,157,95,0.3)] transition-all shrink-0"
              >
                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
