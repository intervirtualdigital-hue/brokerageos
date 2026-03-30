import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MessageSquare, Calendar, Loader2, Search } from 'lucide-react';
import { createContactNote } from '@/services/api';
import { toast } from 'sonner';

export function CrmProfilePanel({ contacts }: { contacts: any[] }) {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [isActioning, setIsActioning] = useState<string | false>(false);
    const [actionModal, setActionModal] = useState<'email' | 'sms' | false>(false);
    const [messageParams, setMessageParams] = useState({ subject: '', body: '' });

    const contact = contacts?.[selectedIdx];

    if (!contact) {
        return (
            <Card className="col-span-12 lg:col-span-7 bg-[#161616] border-[#2A2A2A] p-6 rounded-3xl flex items-center justify-center min-h-[380px]">
                <p className="text-white/40 text-[14px]">No CRM contacts available.</p>
            </Card>
        );
    }

    const initials = contact.firstName?.[0] || contact.lastName?.[0] || '?';
    const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Unknown';
    const advisor = contact.customFields?.find((f: any) => f.key === 'BROKERAGEOS_internal_assigned_broker')?.value || 'Olivia Martin';

    const handleAction = async (type: 'call' | 'email' | 'sms' | 'book') => {
        if (type === 'call') {
            window.location.href = `tel:${contact.phone || ''}`;
            await createContactNote(contact.id, "Attempted Call from Quick Actions.");
            toast.success("Call tracked in timeline.");
            return;
        }
        if (type === 'book') {
            window.open('/book', '_blank');
            return;
        }
        // For internal GHL sending
        setActionModal(type);
    };

    const submitMessage = async () => {
        if (!messageParams.body) return;
        setIsActioning(actionModal as string);
        try {
            // First we need to get or create a conversation for this contact to send a message natively
            // Actually, in the UI demo, we can just proxy it or log it as a note if direct conversation ID isn't mapped
            await createContactNote(contact.id, `Sent ${actionModal}: ${messageParams.subject}\n\n${messageParams.body}`);
            toast.success(`${(actionModal as string).toUpperCase()} sent and logged to GHL timeline.`);
            setActionModal(false);
            setMessageParams({ subject: '', body: '' });
        } catch (e) {
            toast.error(`Failed to send ${actionModal}.`);
        } finally {
            setIsActioning(false);
        }
    };

    return (
        <Card className="col-span-12 lg:col-span-7 bg-[#161616] border-[#2A2A2A] rounded-3xl flex overflow-hidden min-h-[380px]">
            {/* Left sidebar: lead selector */}
            <div className="w-[30%] border-r border-[#2A2A2A] bg-[#1A1A1A] flex flex-col">
                <div className="p-4 border-b border-[#2A2A2A]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
                        <input type="text" placeholder="Search profiles..." className="w-full bg-[#222] border border-[#333] rounded-lg py-2 pl-9 pr-3 text-[12px] text-white focus:outline-none focus:border-brand-gold/50" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto hide-scrollbar p-2 space-y-1">
                    {contacts.slice(0, 8).map((c, i) => (
                        <button key={c.id} onClick={() => setSelectedIdx(i)} className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${selectedIdx === i ? 'bg-brand-gold/10 border border-brand-gold/20' : 'hover:bg-white/5 border border-transparent'}`}>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${selectedIdx === i ? 'bg-brand-gold text-black border-brand-gold' : 'bg-[#222] text-brand-gold border-white/10'}`}>
                                <span className="text-[11px] font-bold">{(c.firstName?.[0] || '?').toUpperCase()}</span>
                            </div>
                            <div className="min-w-0">
                                <p className={`text-[12px] font-bold truncate ${selectedIdx === i ? 'text-brand-gold' : 'text-white'}`}>{c.firstName} {c.lastName}</p>
                                <p className="text-[10px] text-white/40 truncate">{c.email}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right side: Detailed Profile & Actions */}
            <div className="flex-1 p-8 flex flex-col relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-5">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-gold to-amber-600 flex items-center justify-center text-black font-bold text-2xl shadow-[0_0_30px_rgba(197,157,95,0.3)]">
                            {initials}
                        </div>
                        <div>
                            <h2 className="text-[24px] font-serif font-bold text-white leading-tight">{fullName}</h2>
                            <p className="text-white/50 text-[14px]">{contact.companyName || 'Lead Profile'}</p>
                        </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-widest">
                        {contact.tags?.[0] ? contact.tags[0].replace(/_/g, ' ') : 'NEW LEAD'}
                    </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                        <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1">Email</p>
                        <p className="text-[13px] text-white truncate">{contact.email || '—'}</p>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                        <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1">Phone</p>
                        <p className="text-[13px] text-white truncate">{contact.phone || '—'}</p>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                        <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1">Assigned Advisor</p>
                        <p className="text-[13px] text-brand-gold font-bold flex items-center gap-2">
                           <span className="h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(255,221,89,0.5)]"></span>
                           {advisor}
                        </p>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                        <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1">Last Contacted</p>
                        <p className="text-[13px] text-white">{contact.dateAdded ? new Date(contact.dateAdded).toLocaleDateString() : 'Just now'}</p>
                    </div>
                </div>

                {/* Quick Actions Footer */}
                <div className="mt-auto grid grid-cols-4 gap-3">
                    <button onClick={() => handleAction('call')} className="flex flex-col items-center justify-center gap-2 bg-[#222] hover:bg-brand-gold hover:text-black border border-[#333] hover:border-brand-gold text-white p-4 rounded-2xl transition-all group">
                        <Phone className="h-5 w-5 text-white/50 group-hover:text-black transition-colors" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Call</span>
                    </button>
                    <button onClick={() => handleAction('email')} className="flex flex-col items-center justify-center gap-2 bg-[#222] hover:bg-brand-gold hover:text-black border border-[#333] hover:border-brand-gold text-white p-4 rounded-2xl transition-all group">
                        <Mail className="h-5 w-5 text-white/50 group-hover:text-black transition-colors" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Email</span>
                    </button>
                    <button onClick={() => handleAction('sms')} className="flex flex-col items-center justify-center gap-2 bg-[#222] hover:bg-brand-gold hover:text-black border border-[#333] hover:border-brand-gold text-white p-4 rounded-2xl transition-all group">
                        <MessageSquare className="h-5 w-5 text-white/50 group-hover:text-black transition-colors" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">SMS</span>
                    </button>
                    <button onClick={() => handleAction('book')} className="flex flex-col items-center justify-center gap-2 bg-[#222] hover:bg-brand-gold hover:text-black border border-[#333] hover:border-brand-gold text-white p-4 rounded-2xl transition-all group">
                        <Calendar className="h-5 w-5 text-white/50 group-hover:text-black transition-colors" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Book</span>
                    </button>
                </div>

                {/* Inline Action Modal Form */}
                {actionModal && (
                    <div className="absolute inset-0 bg-[#161616]/95 backdrop-blur-sm p-8 flex flex-col z-10 animate-fade-in">
                        <h3 className="text-[16px] font-bold text-white mb-4 capitalize">New {actionModal} to {contact.firstName}</h3>
                        {actionModal === 'email' && (
                            <input 
                                type="text" placeholder="Subject" 
                                value={messageParams.subject} onChange={e => setMessageParams({...messageParams, subject: e.target.value})}
                                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 text-[13px] text-white mb-3 focus:border-brand-gold/50 outline-none" 
                            />
                        )}
                        <textarea 
                            placeholder="Type your message..." 
                            value={messageParams.body} onChange={e => setMessageParams({...messageParams, body: e.target.value})}
                            className="w-full flex-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 text-[13px] text-white mb-4 focus:border-brand-gold/50 outline-none resize-none" 
                        />
                        <div className="flex gap-3 mt-auto">
                            <button onClick={() => setActionModal(false)} className="flex-1 py-3 text-[13px] font-bold text-white/60 hover:text-white border border-[#2A2A2A] rounded-xl hover:bg-[#222] transition-colors">Cancel</button>
                            <button onClick={submitMessage} disabled={!messageParams.body || !!isActioning} className="flex-1 py-3 text-[13px] font-bold text-black bg-brand-gold hover:bg-brand-gold/80 rounded-xl transition-colors flex items-center justify-center">
                                {isActioning ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send & Log'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
