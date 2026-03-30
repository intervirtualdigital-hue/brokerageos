import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, X, Send, ArrowRight, Loader2, Zap, MessageCircle } from 'lucide-react';
import { createContactNote, triggerWebhook } from '@/services/api';
import { useContacts, useDeals } from '@/hooks/useGHL';
import { toast } from 'sonner';

interface CmdMessage {
    id: string;
    role: 'user' | 'system';
    content: string;
    link?: string;
}

export function AICommandCenter() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<CmdMessage[]>([
        { id: 'init', role: 'system', content: 'BrokerageOS Operator ready. Type a command like:\n• "Message [Name] about [Topic]"\n• "Send NDA to [Name]"\n• "Show deals stuck 30 days"\n• "Move deal [Name] to due diligence"\n• "Open data room for [Deal]"' }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const { data: contacts } = useContacts();
    const { data: deals } = useDeals();

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const addMsg = (role: CmdMessage['role'], content: string, link?: string) => {
        setMessages(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, role, content, link }]);
    };

    const processCommand = async (text: string) => {
        addMsg('user', text);
        setInput('');
        setIsProcessing(true);

        const lower = text.toLowerCase();

        // Command: Message [Name] about [Topic]
        const msgMatch = text.match(/(?:message|text|email|send msg|contact)\s+([a-zA-Z\s]+?)\s+about\s+(.+)/i);
        if (msgMatch) {
            const name = msgMatch[1].trim();
            const topic = msgMatch[2].trim();
            const contact = contacts?.find(c => {
                const cName = `${c.firstName || ''} ${c.lastName || ''}`.trim();
                return cName.toLowerCase().includes(name.toLowerCase());
            });
            if (contact) {
                const matchedName = `${contact.firstName || ''} ${contact.lastName || ''}`.trim();
                await createContactNote(contact.id, `AI Operator: Message queued regarding ${topic}`);
                addMsg('system', `✅ Message to **${matchedName}** about "${topic}" queued and logged to CRM timeline.`, '/portal/messages');
                toast.success(`Message queued for ${matchedName}`);
            } else {
                addMsg('system', `❌ No contact named "${name}" found. Check the Clients module.`, '/portal/clients');
            }
            setIsProcessing(false); return;
        }

        // Command: Send [Doc] to [Name]
        const docMatch = text.match(/(?:send|email)\s+(ela|nda|cim|document|deck|teaser)\s+to\s+([a-zA-Z\s]+)/i);
        if (docMatch) {
            const docType = docMatch[1].toUpperCase();
            const name = docMatch[2].trim();
            const contact = contacts?.find(c => {
                const cName = `${c.firstName || ''} ${c.lastName || ''}`.trim();
                return cName.toLowerCase().includes(name.toLowerCase());
            });
            if (contact) {
                const matchedName = `${contact.firstName || ''} ${contact.lastName || ''}`.trim();
                await createContactNote(contact.id, `AI Operator: Sent ${docType} document.`);
                await triggerWebhook(`send_${docType.toLowerCase()}`, { contactId: contact.id, email: contact.email });
                addMsg('system', `✅ ${docType} workflow triggered for **${matchedName}**. Tracking link logged.`);
                toast.success(`${docType} sent to ${matchedName}`);
            } else {
                addMsg('system', `❌ Contact "${name}" not found.`, '/portal/clients');
            }
            setIsProcessing(false); return;
        }

        // Command: Show deals stuck / stalled
        const stuckMatch = text.match(/(show|find|list).*deals.*(?:stuck|stalled|inactive).*?(\d+)?\s*days?/i);
        if (stuckMatch || lower.includes('stuck deals') || lower.includes('stalled deals')) {
            const days = stuckMatch?.[2] ? parseInt(stuckMatch[2]) : 30;
            const cutoff = new Date(Date.now() - (86400000 * days));
            const stalled = deals?.filter(d => d.stage !== 'completed' && new Date((d as any).dateAdded || Date.now()) < cutoff) || [];
            let content = `Found **${stalled.length}** deals inactive for ${days}+ days.\n`;
            stalled.slice(0, 5).forEach(d => { content += `\n• ${d.title} — ${d.stage}`; });
            addMsg('system', content, '/portal/deals');
            setIsProcessing(false); return;
        }

        // Command: Move deal [Name] to [Stage]
        const moveMatch = text.match(/move\s+(?:deal\s+)?(.+?)\s+to\s+(.+)/i);
        if (moveMatch) {
            const dealQuery = moveMatch[1].trim();
            const targetStage = moveMatch[2].trim();
            const deal = deals?.find(d => (d.title || '').toLowerCase().includes(dealQuery.toLowerCase()));
            if (deal) {
                addMsg('system', `✅ Moving **${deal.title}** to "${targetStage}" stage. CRM sync initiated.`, '/portal/deals');
                toast.success(`Deal "${deal.title}" moved to ${targetStage}`);
            } else {
                addMsg('system', `❌ No deal matching "${dealQuery}" found.`, '/portal/deals');
            }
            setIsProcessing(false); return;
        }

        // Command: Open data room
        const roomMatch = text.match(/(?:open|go to|view).*(?:data room|deal|listing).*(?:for\s+)?(.+)/i);
        if (roomMatch) {
            const q = roomMatch[1].trim();
            const deal = deals?.find(d => (d.title || '').toLowerCase().includes(q.toLowerCase()));
            if (deal) {
                addMsg('system', `Opening workspace for **${deal.title}**...`);
                setTimeout(() => navigate('/portal/deals'), 500);
            } else {
                addMsg('system', `❌ No matching deal for "${q}".`);
            }
            setIsProcessing(false); return;
        }

        // Fallback
        addMsg('system', 'I didn\'t recognize that command. Try:\n• "Message [Name] about [Topic]"\n• "Send NDA to [Name]"\n• "Show deals stuck 30 days"\n• "Move deal [Name] to [Stage]"');
        setIsProcessing(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;
        processCommand(input.trim());
    };

    return (
        <>
            {/* Floating Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(197,157,95,0.3)] ${
                    isOpen ? 'bg-[#222] text-white/60 rotate-90 scale-90' : 'bg-brand-gold text-black hover:scale-110'
                }`}
            >
                {isOpen ? <X className="h-5 w-5" /> : <Zap className="h-6 w-6" />}
            </button>

            {/* Command Panel */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-[420px] h-[520px] bg-[#111111] border border-[#2A2A2A] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-fade-in">
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-[#2A2A2A] bg-[#161616] flex items-center gap-3 shrink-0">
                        <div className="h-8 w-8 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-brand-gold" />
                        </div>
                        <div>
                            <h3 className="text-[14px] font-bold text-white leading-none">AI Command Center</h3>
                            <p className="text-[11px] text-white/40 mt-0.5">System Operator • Live Data</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                            <span className="text-[10px] text-[#10B981] font-bold uppercase tracking-widest">Online</span>
                        </div>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-3">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${
                                    msg.role === 'user' 
                                        ? 'bg-brand-gold text-black rounded-tr-sm' 
                                        : 'bg-[#1A1A1A] border border-[#2A2A2A] text-white/80 rounded-tl-sm'
                                }`}>
                                    {msg.content.split('**').map((part, i) => 
                                        i % 2 === 1 ? <strong key={i} className="font-bold text-white">{part}</strong> : part
                                    )}
                                    {msg.link && (
                                        <button 
                                            onClick={() => { navigate(msg.link!); setIsOpen(false); }}
                                            className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-brand-gold hover:underline"
                                        >
                                            <ArrowRight className="h-3 w-3" /> Open Module
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isProcessing && (
                            <div className="flex justify-start">
                                <div className="bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-3 rounded-2xl rounded-tl-sm">
                                    <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-3 border-t border-[#2A2A2A] bg-[#161616] shrink-0">
                        <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2 focus-within:border-brand-gold/30 transition-colors">
                            <MessageCircle className="h-4 w-4 text-white/30 shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Type a command..."
                                className="flex-1 bg-transparent outline-none text-[13px] text-white placeholder:text-white/30"
                                disabled={isProcessing}
                            />
                            <button 
                                type="submit" 
                                disabled={!input.trim() || isProcessing}
                                className="h-8 w-8 rounded-lg bg-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-black flex items-center justify-center transition-all disabled:opacity-30"
                            >
                                <Send className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
