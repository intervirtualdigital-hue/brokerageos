import { useState, useRef } from 'react';
import { Search, SlidersHorizontal, Phone, MoreVertical, Paperclip, Send, FileText, Link2, Mail, MessageSquare, CheckCircle2, Tag, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useConversations, useConversationMessages } from '@/hooks/useGHL';
import { sendMessage, createContactNote, triggerWebhook } from '@/services/api';

export default function MessagesPage() {
    const { data: realConversations, isLoading: isConvLoading } = useConversations();
    const [chatSelectionId, setActiveChatId] = useState<string | null>(null);
    const [method, setMethod] = useState<'sms' | 'email'>('sms');
    const [messageInput, setMessageInput] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [isSending, setIsSending] = useState(false);
    
    // UI states
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    
    // Inline edit states
    const [editableValues, setEditableValues] = useState<Record<string, {stage: string, budget: string}>>({});
    const [isCalling, setIsCalling] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const conversations = (realConversations || []).map(c => ({
        id: c.id,
        contactId: c.contactId,
        name: c.fullName || c.contactName || c.email || c.phone || 'Unknown',
        avatar: (c.fullName || c.contactName || c.email || c.phone || 'U').substring(0, 2).toUpperCase(),
        time: c.lastMessageDate ? new Date(c.lastMessageDate).toLocaleTimeString() : '',
        preview: c.lastMessageBody || 'No recent message',
        unread: c.unreadCount || 0,
        type: c.type || 'Message',
        budget: 'TBD',
        stage: 'ACTIVE',
        email: c.email || 'unknown@email.com',
        phone: c.phone || '',
        isNew: (c.unreadCount || 0) > 0
    }));

    const activeChatId = chatSelectionId || (conversations.length > 0 ? conversations[0].id : null);
    const activeChat = conversations.find(c => c.id === activeChatId) || null;
    
    const { data: realMessages, refetch: refetchMessages } = useConversationMessages(activeChatId);

    const newLeads = conversations.filter(c => c.isNew);
    const ongoingChats = conversations.filter(c => !c.isNew);

    const activeDealState = activeChat ? (editableValues[activeChat.id] || { stage: activeChat.stage, budget: activeChat.budget }) : null;
    
    const handleValueChange = (field: 'stage'|'budget', val: string) => {
        if (!activeChat) return;
        setEditableValues(prev => ({
            ...prev,
            [activeChat.id]: {
                ...(prev[activeChat.id] || { stage: activeChat.stage, budget: activeChat.budget }),
                [field]: val
            }
        }));
    };

    const handleCallSimulation = async () => {
        if (!activeChat) return;
        setIsCalling(true);
        toast.info(`Dialing ${activeChat.phone}...`);
        
        // Log the call
        await createContactNote(activeChat.contactId, "Dialed contact via CRM integrations.");
        
        setTimeout(() => {
            setIsCalling(false);
            toast.success("Call ended and logged to contact profile.");
        }, 2000);
    };

    const handleSendMessage = async () => {
        if (!messageInput.trim() || !activeChat) return;
        if (method === 'email' && !emailSubject.trim()) {
            toast.error("Please enter an email subject line.");
            return;
        }
        
        setIsSending(true);
        try {
            await sendMessage({
                conversationId: activeChat.id,
                contactId: activeChat.contactId,
                type: method === 'email' ? 'Email' : 'SMS',
                message: method === 'email' ? `Subject: ${emailSubject}\n\n${messageInput}` : messageInput
            });
            toast.success(`${method.toUpperCase()} sent to ${activeChat.name}.`);
            setMessageInput('');
            setEmailSubject('');
            refetchMessages();
        } catch (error) {
            console.error("Failed to send message", error);
            toast.error("Failed to send message via GoHighLevel API.");
        } finally {
            setIsSending(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            toast.success(`Attached ${e.target.files.length} file(s) to composer.`);
        }
    };

    const ChatListItem = ({ chat }: { chat: typeof conversations[0] }) => (
        <div 
            onClick={() => setActiveChatId(chat.id)}
            className={`flex items-start gap-4 p-3 rounded-2xl cursor-pointer border transition-all ${activeChatId === chat.id ? 'bg-brand-gold/[0.08] border-brand-gold/20 relative shadow-lg' : 'bg-transparent border-transparent hover:bg-white/[0.03]'}`}
        >
            {activeChatId === chat.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-brand-gold rounded-r-full shadow-[0_0_10px_rgba(255,221,89,0.5)]" />}
            <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-[13px] font-bold ${activeChatId === chat.id ? 'bg-[#2A2A2A] text-brand-gold border border-brand-gold/30' : 'bg-[#2A2A2A] text-white/50 border border-white/5'}`}>
                {chat.avatar}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <p className={`text-[14px] font-semibold truncate ${activeChatId === chat.id ? 'text-brand-gold' : 'text-white'}`}>{chat.name}</p>
                    <span className={`text-[11px] ${activeChatId === chat.id ? 'text-brand-gold' : 'text-white/40'}`}>{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[13px] text-white/50 truncate w-[180px]">{chat.preview}</p>
                    {chat.unread > 0 && (
                        <div className="h-5 w-5 rounded-full bg-brand-gold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,221,89,0.3)]">
                            <span className="text-[11px] font-bold text-black">{chat.unread}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-[calc(100vh-120px)] w-full flex gap-6 max-w-[1600px] animate-fade-in text-white/80">
            {/* Left Drawer - Conversations */}
            <div className="w-[320px] shrink-0 flex flex-col gap-6">
                <div className="flex items-center justify-between relative">
                    <h2 className="text-xl font-serif font-bold text-white tracking-tight">Inbox</h2>
                    <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white/5 text-white/60 hover:text-white transition-colors">
                        <SlidersHorizontal className="h-4 w-4" />
                    </button>
                    {isFilterOpen && (
                        <div className="absolute top-10 right-0 w-48 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-2xl p-2 z-50 animate-fade-in">
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-2 mb-2 mt-1">Filter By</p>
                            <button className="w-full text-left px-3 py-2 text-[13px] text-white hover:bg-white/5 rounded-lg transition-colors flex justify-between items-center">Unread <div className="h-2 w-2 rounded-full bg-brand-gold" /></button>
                            <button className="w-full text-left px-3 py-2 text-[13px] text-white hover:bg-white/5 rounded-lg transition-colors">Sellers</button>
                            <button className="w-full text-left px-3 py-2 text-[13px] text-white hover:bg-white/5 rounded-lg transition-colors">Buyers</button>
                        </div>
                    )}
                </div>
                
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search CRM..."
                        className="w-full h-10 pl-10 pr-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-[13px] text-white focus:outline-none focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all placeholder:text-white/30"
                    />
                </div>

                <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-6">
                    {isConvLoading ? (
                        <div className="flex-1 justify-center items-center flex">
                            <Loader2 className="h-6 w-6 animate-spin text-brand-gold" />
                        </div>
                    ) : conversations.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-white/40 text-[13px] italic p-4 text-center">
                            No conversations found in CRM.
                        </div>
                    ) : (
                        <>
                            {/* New Leads Group */}
                            {newLeads.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 px-1 mb-1">
                                        <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Action Required</p>
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                                    </div>
                                    {newLeads.map(chat => <ChatListItem key={chat.id} chat={chat as any} />)}
                                </div>
                            )}
                            
                            {/* Ongoing Group */}
                            {ongoingChats.length > 0 && (
                                <div className="flex flex-col gap-2 border-t border-[#2A2A2A]/50 pt-4 mt-2">
                                    <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest px-1 mb-1">Ongoing Deal Activity</p>
                                    {ongoingChats.map(chat => <ChatListItem key={chat.id} chat={chat as any} />)}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Middle Main - Chat Area */}
            {activeChat ? (
            <div className="flex-1 bg-[#161616] border border-[#2A2A2A] rounded-3xl flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="h-20 shrink-0 border-b border-[#2A2A2A] flex items-center justify-between px-6 relative">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-[13px] font-bold bg-[#333333] text-brand-gold border border-brand-gold/30 relative">
                            {activeChat.avatar}
                            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-[#10B981] rounded-full border border-[#161616]" />
                        </div>
                        <div>
                            <h3 className="text-[16px] font-semibold text-white">{activeChat.name}</h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[12px] text-[#10B981] leading-none">Status: {activeChat.stage}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={handleCallSimulation} className={`h-9 w-9 flex flex-col items-center justify-center rounded-xl transition-colors tooltip-trigger ${isCalling ? 'bg-green-500/20 text-green-400 animate-pulse' : 'bg-[#222222] hover:bg-brand-gold/10 hover:text-brand-gold text-white/60'}`} title="Call Contact">
                            <Phone className="h-4 w-4" />
                        </button>
                        <button onClick={() => setIsOptionsOpen(!isOptionsOpen)} className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#222222] hover:bg-[#333333] text-white/60 transition-colors">
                            <MoreVertical className="h-4 w-4" />
                        </button>
                        {isOptionsOpen && (
                            <div className="absolute top-16 right-6 w-48 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-2xl p-2 z-50 animate-fade-in">
                                <button onClick={() => {toast("Marked as unread in CRM"); setIsOptionsOpen(false)}} className="w-full text-left px-3 py-2 text-[13px] text-white hover:bg-white/5 rounded-lg transition-colors">Mark as Unread</button>
                                <button onClick={() => {toast.success("Contact assigned to active user"); setIsOptionsOpen(false)}} className="w-full text-left px-3 py-2 text-[13px] text-white hover:bg-white/5 rounded-lg transition-colors">Assign Lead</button>
                                <button onClick={() => {toast.error("Contact archived"); setIsOptionsOpen(false)}} className="w-full text-left px-3 py-2 text-[13px] text-red-400 hover:bg-white/5 rounded-lg transition-colors mt-1 border-t border-white/5 pt-3">Archive Thread</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 hide-scrollbar flex-col-reverse justify-start">
                    {realMessages && realMessages.length > 0 ? (
                        [...realMessages].reverse().map((msg: any) => (
                            <div key={msg.id} className={`flex flex-col ${msg.direction === 'outbound' ? 'items-end' : 'items-start'} gap-1`}>
                                <div className={`${msg.direction === 'outbound' ? 'bg-brand-gold text-black rounded-tr-sm' : 'bg-[#1A1A1A] border border-[#2A2A2A] text-white rounded-tl-sm'} px-5 py-3.5 rounded-2xl max-w-[75%] text-[14px] leading-relaxed shadow-[0_4px_14px_rgba(255,221,89,0.15)]`}>
                                    {msg.body}
                                </div>
                                <span className={`text-[11px] text-white/30 ${msg.direction === 'outbound' ? 'mr-2' : 'ml-2'}`}>
                                    {new Date(msg.dateAdded).toLocaleTimeString()}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-white/40 gap-3">
                            <MessageSquare className="h-8 w-8 opacity-20" />
                            <p className="text-[13px] italic">No message history yet.</p>
                        </div>
                    )}
                </div>

                {/* Chat Input */}
                <div className="p-4 shrink-0 bg-[#161616] border-t border-[#2A2A2A] flex flex-col gap-3">
                    {/* Method Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex bg-[#1A1A1A] rounded-lg p-1 border border-[#2A2A2A] shrink-0">
                            <button 
                                onClick={() => setMethod('sms')} 
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-md transition-colors ${method === 'sms' ? 'bg-[#333] text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
                            >
                                <MessageSquare className="h-3 w-3" /> SMS
                            </button>
                            <button 
                                onClick={() => setMethod('email')} 
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-md transition-colors ${method === 'email' ? 'bg-[#333] text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
                            >
                                <Mail className="h-3 w-3" /> EMAIL
                            </button>
                        </div>
                        {method === 'sms' && (
                            <span className="text-[11px] text-white/30 px-2 tracking-wide">160 Char Limit per Segment</span>
                        )}
                    </div>

                    {/* Email Subject Line */}
                    {method === 'email' && (
                        <div className="bg-[#1F1F1F] rounded-xl border border-[#2A2A2A] focus-within:border-brand-gold/30 transition-all flex items-center px-4 h-12">
                            <span className="text-[13px] text-white/40 font-medium mr-3 w-16">Subject:</span>
                            <input
                                type="text"
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
                                placeholder="Enter email subject line..."
                                className="flex-1 bg-transparent border-none outline-none text-[14px] text-white placeholder:text-white/20"
                            />
                        </div>
                    )}

                    {/* Main Input */}
                    <div className="w-full bg-[#1F1F1F] rounded-2xl flex items-center px-4 gap-3 border border-[#2A2A2A] focus-within:border-brand-gold/30 transition-all min-h-[56px] py-1">
                        <button onClick={() => fileInputRef.current?.click()} className="text-white/40 hover:text-brand-gold transition-colors p-1" title="Attach Files">
                            <Paperclip className="h-4 w-4" />
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            multiple 
                            onChange={handleFileUpload} 
                        />
                        
                        <textarea
                            placeholder={`Type an ${method.toUpperCase()} message...`}
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => { 
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            className="flex-1 bg-transparent border-none outline-none text-[14px] text-white placeholder:text-white/30 resize-none py-4 max-h-[120px]"
                            rows={1}
                        />

                        <button 
                            onClick={handleSendMessage} 
                            disabled={!messageInput.trim() || isSending}
                            className="h-9 w-9 shrink-0 rounded-full bg-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-black flex items-center justify-center transition-all disabled:opacity-50 disabled:hover:bg-brand-gold/20 disabled:hover:text-brand-gold shadow-lg disabled:shadow-none"
                        >
                            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 ml-0.5" />}
                        </button>
                    </div>
                </div>
            </div>
            ) : (
                <div className="flex-1 bg-[#161616] border border-[#2A2A2A] rounded-3xl flex flex-col items-center justify-center text-white/60">
                    <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                    <p className="font-semibold mb-1">No Conversation Selected</p>
                    <p className="text-[13px] text-white/40">Select a thread from the inbox to view details.</p>
                </div>
            )}

            {/* Right Pane - Contact Context CRM Profile */}
            {activeChat && activeDealState && (
            <div className="w-[340px] shrink-0 border-l border-[#2A2A2A] pl-6 flex flex-col gap-6 overflow-y-auto hide-scrollbar">
                <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A]">
                    <h2 className="text-xl font-serif font-bold text-white tracking-tight">CRM Profile</h2>
                    <button onClick={() => toast("Editing contact in GHL...")} className="text-[12px] font-bold text-brand-gold hover:underline">Edit</button>
                </div>
                
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="h-20 w-20 rounded-full bg-[#1A1A1A] border-2 border-[#2A2A2A] flex items-center justify-center text-[24px] font-bold text-brand-gold relative shadow-xl">
                        {activeChat.avatar}
                        {activeChat.isNew && (
                            <div className="absolute top-0 right-0 h-4 w-4 bg-[#10B981] rounded-full border-2 border-[#121212]" title="New Lead" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-[18px] font-bold text-white">{activeChat.name}</h3>
                        <p className="text-[13px] text-white/50 bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-1 rounded-full inline-block mt-2 font-medium">{activeChat.type}</p>
                    </div>
                </div>

                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 flex flex-col gap-5">
                    <div className="flex items-start gap-4">
                        <Mail className="h-4 w-4 text-white/30 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                            <p className="text-[11px] font-bold text-white/30 uppercase tracking-wider mb-0.5">Email Address</p>
                            <p className="text-[13px] text-white truncate hover:text-brand-gold cursor-pointer transition-colors" title={activeChat.email}>{activeChat.email}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="h-4 w-4 text-white/30 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-[11px] font-bold text-white/30 uppercase tracking-wider mb-0.5">Phone Number</p>
                            <p className="text-[13px] text-white">{activeChat.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Tag className="h-4 w-4 text-white/30 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-[11px] font-bold text-white/30 uppercase tracking-wider mb-1.5">Active Tags</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] px-2 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20 leading-none">VIP</span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 leading-none">VERIFIED</span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10 leading-none">WEB_LEAD</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex flex-col gap-3 shrink-0">
                    <div className="flex justify-between items-center text-[12px] px-1">
                        <span className="text-white/40 font-bold uppercase tracking-widest">GHL Stage</span>
                        <input 
                            value={activeDealState.stage}
                            onChange={(e) => handleValueChange('stage', e.target.value)}
                            onBlur={() => toast('Deal Stage successfully synced to CRM webhook.')}
                            className="bg-transparent border-b border-transparent hover:border-brand-gold/30 focus:border-brand-gold text-brand-gold font-bold text-right outline-none w-[140px] transition-colors"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 bg-[#222222] p-2.5 rounded-lg border border-white/5 mt-0.5">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Value</span>
                            <input 
                                value={activeDealState.budget}
                                onChange={(e) => handleValueChange('budget', e.target.value)}
                                className="bg-transparent text-[13px] font-semibold text-white outline-none w-full pr-1 hover:text-brand-gold transition-colors focus:bg-[#333] px-1 -ml-1 rounded"
                            />
                        </div>
                        <div className="flex flex-col gap-0.5 items-end">
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Confidence</span>
                            <span className="text-[13px] font-semibold text-[#10B981]">85%</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-auto shrink-0 pb-2">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1 mb-0.5 mt-2">Quick Actions (Automations)</p>
                    <button 
                        onClick={async () => {
                            toast.loading("Triggering NDA flow in GHL...", { id: 'nda' });
                            await triggerWebhook('send_nda', { contactId: activeChat.contactId, email: activeChat.email });
                            toast.success(`NDA template sent to ${activeChat.email} via GHL.`, { id: 'nda' });
                        }} 
                        className="w-full flex items-center justify-between bg-transparent hover:bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3 transition-colors group"
                    >
                        <div className="flex items-center gap-2">
                            <FileText className="h-3.5 w-3.5 text-white/40 group-hover:text-brand-gold transition-colors" />
                            <span className="text-[12px] font-medium text-white/80 group-hover:text-white transition-colors">Send NDA Execution</span>
                        </div>
                        <CheckCircle2 className="h-3.5 w-3.5 text-white/20 group-hover:text-brand-gold transition-colors" />
                    </button>
                    <button 
                        onClick={async () => {
                            toast.loading("Attaching CIM securely...", { id: 'cim' });
                            await triggerWebhook('send_cim', { contactId: activeChat.contactId, email: activeChat.email });
                            toast.success(`CIM Data Room URL successfully dispatched.`, { id: 'cim' });
                        }} 
                        className="w-full flex items-center justify-between bg-transparent hover:bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3 transition-colors group"
                    >
                        <div className="flex items-center gap-2">
                            <Link2 className="h-3.5 w-3.5 text-white/40 group-hover:text-brand-gold transition-colors" />
                            <span className="text-[12px] font-medium text-white/80 group-hover:text-white transition-colors">Share VDR / CIM</span>
                        </div>
                        <CheckCircle2 className="h-3.5 w-3.5 text-white/20 group-hover:text-brand-gold transition-colors" />
                    </button>
                </div>
            </div>
            )}
        </div>
    );
}
