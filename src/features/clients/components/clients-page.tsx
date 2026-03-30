import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContacts, useContactNotes, useContactTasks } from '@/hooks/useGHL';
import { createContact, createOpportunity, updateContact, createContactNote, createContactTask, updateContactTask } from '@/services/api';
import { Card } from '@/components/ui/card';
import { Loader2, Search, Mail, Phone, Plus, Edit2, CheckCircle2, Circle, Clock, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/modal';
import { ADVISORS } from '@/config/ghl-config';

function ClientActivityFeed({ contactId }: { contactId: string }) {
    const { data: notes, refetch: refetchNotes } = useContactNotes(contactId);
    const { data: tasks, refetch: refetchTasks } = useContactTasks(contactId);
    const [activeTab, setActiveTab] = useState<'timeline' | 'tasks'>('timeline');
    const [inputValue, setInputValue] = useState('');
    const [assignedTo, setAssignedTo] = useState(ADVISORS[0].id);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        setIsSubmitting(true);
        try {
            if (activeTab === 'timeline') {
                await createContactNote(contactId, inputValue);
                toast.success("Note added.");
                refetchNotes();
            } else {
                await createContactTask(contactId, { title: inputValue, assignedTo });
                toast.success("Task created and assigned.");
                refetchTasks();
            }
            setInputValue('');
        } catch (err) {
            toast.error("Failed to add activity.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleTask = async (taskId: string, completed: boolean) => {
        try {
            await updateContactTask(contactId, taskId, { completed: !completed, status: !completed ? 'completed' : 'pending' });
            refetchTasks();
        } catch (err) {
            toast.error("Failed to update task.");
        }
    };

    const combinedTimeline = [
        ...(notes || []).map(n => ({ ...n, type: 'note' as const, date: new Date(n.dateAdded || Date.now()) })),
        ...(tasks || []).map(t => ({ ...t, type: 'task' as const, date: new Date(t.dateAdded || Date.now()) }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    return (
        <div className="mt-6 border-t border-[#2A2A2A] pt-6">
            <div className="flex gap-4 mb-4 border-b border-[#2A2A2A]">
                <button onClick={() => setActiveTab('timeline')} className={`pb-2 text-[13px] font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'timeline' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-white/40 hover:text-white'}`}>Timeline</button>
                <button onClick={() => setActiveTab('tasks')} className={`pb-2 text-[13px] font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'tasks' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-white/40 hover:text-white'}`}>Tasks ({(tasks || []).filter(t => !t.completed && t.status !== 'completed').length})</button>
            </div>
            
            <form onSubmit={handleSubmit} className="mb-6 relative">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={e => setInputValue(e.target.value)} 
                        placeholder={activeTab === 'timeline' ? "Add a note..." : "Add a new task..."}
                        className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-[13px] text-white focus:outline-none focus:border-brand-gold/50 transition-all px-4 py-3"
                    />
                    {activeTab === 'tasks' && (
                        <select 
                            value={assignedTo} 
                            onChange={e => setAssignedTo(e.target.value)}
                            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-[13px] text-white focus:outline-none px-3 py-3 w-[140px] appearance-none"
                        >
                            {ADVISORS.map(a => <option key={a.id} value={a.id}>Assign: {a.name.split(' ')[0]}</option>)}
                        </select>
                    )}
                    <button type="submit" disabled={isSubmitting || !inputValue.trim()} className="px-6 bg-[#222] hover:bg-brand-gold hover:text-black disabled:opacity-50 disabled:hover:bg-[#222] disabled:hover:text-white transition-colors rounded-xl text-[13px] font-bold text-white shrink-0">
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                    </button>
                </div>
            </form>

            <div className="max-h-[240px] overflow-y-auto hide-scrollbar space-y-3">
                {activeTab === 'tasks' ? (
                    (tasks || []).length === 0 ? <p className="text-white/30 text-[12px] text-center italic py-4">No tasks found.</p> :
                    (tasks || []).sort((a,b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1)).map(t => (
                        <div key={t.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]">
                            <button onClick={() => toggleTask(t.id, t.completed || t.status === 'completed')} className="mt-0.5 text-brand-gold shrink-0">
                                {t.completed || t.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                            </button>
                            <div>
                                <p className={`text-[13px] ${t.completed || t.status === 'completed' ? 'text-white/30 line-through' : 'text-white'}`}>{t.title || t.body}</p>
                                <p className="text-[11px] text-white/30 truncate mt-1">Added {format(new Date(t.dateAdded || Date.now()), 'MMM d, h:mm a')}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    combinedTimeline.length === 0 ? <p className="text-white/30 text-[12px] text-center italic py-4">No activity history.</p> :
                    combinedTimeline.map(item => (
                        <div key={item.id} className="flex items-start gap-3">
                            <div className="mt-1 shrink-0 bg-[#1A1A1A] p-2 rounded-full border border-[#2A2A2A]">
                                {item.type === 'task' ? <CheckCircle2 className="h-3 w-3 text-white/40" /> : <MessageSquare className="h-3 w-3 text-white/40" />}
                            </div>
                            <div className="flex-1 bg-[#1A1A1A] p-3 rounded-xl border border-[#2A2A2A]">
                                <p className="text-[13px] text-white whitespace-pre-wrap">{item.type === 'note' ? (item as any).body : `Task: ${(item as any).title}`}</p>
                                <div className="flex items-center gap-1.5 mt-2">
                                    <Clock className="h-3 w-3 text-white/30" />
                                    <p className="text-[11px] text-white/30">{format(item.date, 'MMM d, yyyy h:mm a')}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default function ClientsPage() {
    const { data: contacts, isLoading, refetch } = useContacts();
    const navigate = useNavigate();
    
    const [modalMode, setModalMode] = useState<'create' | 'edit' | false>(false);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sanitizeTags = (tags?: string[]) => {
        if (!tags) return [];
        return tags.filter(t => 
            !t.startsWith('LISTING_ID_') && 
            !t.startsWith('BROKERAGEOS_') && 
            !t.includes('VALUATION_SUBMITTED') &&
            !t.includes('raw_')
        );
    };

    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = new FormData(e.currentTarget);
        const data = {
            firstName: form.get('firstName') as string,
            lastName: form.get('lastName') as string,
            email: form.get('email') as string,
            phone: form.get('phone') as string,
            companyName: form.get('companyName') as string,
        };
        
        try {
            if (modalMode === 'edit' && selectedContact) {
                await updateContact(selectedContact.id, data);
                toast.success("Client updated successfully in CRM.");
                // Update local selected state to reflect changes before refetch
                setSelectedContact({ ...selectedContact, ...data });
            } else {
                await createContact(data as any);
                toast.success("Client added successfully to CRM.");
            }
            setModalMode(false);
            if (modalMode === 'create') setSelectedContact(null);
            refetch();
        } catch (error) {
            toast.error(`Failed to ${modalMode} client. Check your API settings.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 max-w-[1400px] animate-fade-in text-white/80 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-[32px] font-serif font-bold text-white mb-2 tracking-tight">Clients Explorer</h2>
                    <p className="text-white/50 text-[15px]">Live view of your entire CRM contact database.</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="w-full h-10 pl-10 pr-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-[13px] text-white focus:outline-none focus:ring-1 focus:ring-brand-gold/50 transition-all placeholder:text-white/30"
                        />
                    </div>
                    <button 
                        onClick={() => { setModalMode('create'); setSelectedContact(null); }}
                        className="h-10 px-5 flex items-center justify-center shrink-0 gap-2 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-black font-semibold shadow-[0_0_15px_rgba(255,221,89,0.2)] transition-all text-[14px]"
                    >
                        <Plus className="h-4 w-4" /> Add Client
                    </button>
                </div>
            </div>

            <Card className="bg-[#161616] border-[#2A2A2A] rounded-3xl overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-[#2A2A2A] bg-[#111111]">
                                <th className="p-5 text-[12px] font-bold text-white/40 uppercase tracking-widest pl-8">Name & Company</th>
                                <th className="p-5 text-[12px] font-bold text-white/40 uppercase tracking-widest">Contact Info</th>
                                <th className="p-5 text-[12px] font-bold text-white/40 uppercase tracking-widest">Tags</th>
                                <th className="p-5 text-[12px] font-bold text-white/40 uppercase tracking-widest text-right pr-8">Added</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2A2A2A]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center">
                                        <Loader2 className="h-6 w-6 animate-spin text-brand-gold mx-auto" />
                                    </td>
                                </tr>
                            ) : contacts?.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-white/40 text-[14px]">
                                        No contacts found in GHL.
                                    </td>
                                </tr>
                            ) : (
                                contacts?.map(contact => (
                                    <tr 
                                        key={contact.id} 
                                        onClick={() => setSelectedContact(contact)}
                                        className="hover:bg-[#1A1A1A] transition-colors group cursor-pointer"
                                    >
                                        <td className="p-5 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-[#2A2A2A] border border-white/5 flex items-center justify-center shrink-0">
                                                    <span className="text-[13px] font-bold text-brand-gold uppercase">
                                                        {contact.firstName?.[0] || contact.lastName?.[0] || '?'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-semibold text-white group-hover:text-brand-gold transition-colors flex items-center gap-2">
                                                        {contact.firstName} {contact.lastName}
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); setSelectedContact(contact); setModalMode('edit'); }} 
                                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full transition-all"
                                                        >
                                                            <Edit2 className="h-3 w-3" />
                                                        </button>
                                                    </p>
                                                    <p className="text-[12px] text-white/40">{contact.companyName || 'No Company'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="space-y-1.5">
                                                <p className="text-[13px] text-white flex items-center gap-2">
                                                    <Mail className="h-3 w-3 text-white/30" /> {contact.email || '—'}
                                                </p>
                                                <p className="text-[13px] text-white/60 flex items-center gap-2">
                                                    <Phone className="h-3 w-3 text-white/30" /> {contact.phone || '—'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-wrap gap-2 max-w-[200px]">
                                                {sanitizeTags(contact.tags).slice(0, 3).map(tag => (
                                                    <span key={tag} className="bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                                        {tag.replace(/_/g, ' ')}
                                                    </span>
                                                ))}
                                                {sanitizeTags(contact.tags).length > 3 && (
                                                    <span className="bg-white/5 text-white/40 border border-white/10 px-2 py-0.5 rounded text-[10px] font-bold">
                                                        +{sanitizeTags(contact.tags).length - 3}
                                                    </span>
                                                )}
                                                {sanitizeTags(contact.tags).length === 0 && (
                                                    <span className="text-white/20 text-[12px] italic">—</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-5 pr-8 text-right text-[13px] text-white/50">
                                            {format(new Date(contact.dateAdded || Date.now()), 'MMM d, yyyy')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal 
                isOpen={modalMode !== false} 
                onClose={() => setModalMode(false)} 
                title={modalMode === 'edit' ? "Edit Contact Details" : "Create New Contact"}
            >
                <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[12px] font-bold text-white/60 uppercase tracking-widest mb-1.5 block">First Name</label>
                            <input name="firstName" required defaultValue={modalMode === 'edit' && selectedContact ? selectedContact.firstName : ''} type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[14px] text-white focus:outline-none focus:border-brand-gold/50 transition-colors" placeholder="Jane" />
                        </div>
                        <div>
                            <label className="text-[12px] font-bold text-white/60 uppercase tracking-widest mb-1.5 block">Last Name</label>
                            <input name="lastName" type="text" defaultValue={modalMode === 'edit' && selectedContact ? selectedContact.lastName : ''} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[14px] text-white focus:outline-none focus:border-brand-gold/50 transition-colors" placeholder="Doe" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[12px] font-bold text-white/60 uppercase tracking-widest mb-1.5 block">Email Address</label>
                        <input name="email" required type="email" defaultValue={modalMode === 'edit' && selectedContact ? selectedContact.email : ''} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[14px] text-white focus:outline-none focus:border-brand-gold/50 transition-colors" placeholder="jane@example.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[12px] font-bold text-white/60 uppercase tracking-widest mb-1.5 block">Phone Number</label>
                            <input name="phone" type="tel" defaultValue={modalMode === 'edit' && selectedContact ? selectedContact.phone : ''} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[14px] text-white focus:outline-none focus:border-brand-gold/50 transition-colors" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div>
                            <label className="text-[12px] font-bold text-white/60 uppercase tracking-widest mb-1.5 block">Company</label>
                            <input name="companyName" type="text" defaultValue={modalMode === 'edit' && selectedContact ? selectedContact.companyName : ''} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[14px] text-white focus:outline-none focus:border-brand-gold/50 transition-colors" placeholder="Acme Corp" />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3 justify-end border-t border-[#2A2A2A] mt-6">
                        <button type="button" onClick={() => setModalMode(false)} className="px-5 py-2.5 text-[13px] font-bold text-white/60 hover:text-white transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="bg-brand-gold text-black px-6 py-2.5 rounded-xl font-bold text-[13px] hover:bg-brand-gold/90 transition-colors flex items-center justify-center min-w-[120px]">
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (modalMode === 'edit' ? "Save Changes" : "Save Client")}
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal 
                isOpen={!!selectedContact && modalMode === false} 
                onClose={() => setSelectedContact(null)} 
                title="Client Details"
            >
                {selectedContact && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-brand-gold flex items-center justify-center text-black font-bold text-2xl">
                                    {selectedContact.firstName?.[0] || '?'}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{selectedContact.firstName} {selectedContact.lastName}</h3>
                                    <p className="text-white/50">{selectedContact.companyName || 'Independent Investor'}</p>
                                </div>
                            </div>
                            <button onClick={() => setModalMode('edit')} className="text-brand-gold text-[13px] hover:underline font-bold px-3 py-1.5 rounded-lg border border-brand-gold/20 hover:bg-brand-gold/10 transition-colors">
                                Edit
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex justify-between items-center">
                                <span className="text-white/40 text-[13px]"><Mail className="inline h-4 w-4 mr-2"/> Email</span>
                                <span className="text-white text-[13px]">{selectedContact.email || 'N/A'}</span>
                            </div>
                            <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex justify-between items-center">
                                <span className="text-white/40 text-[13px]"><Phone className="inline h-4 w-4 mr-2"/> Phone</span>
                                <span className="text-white text-[13px]">{selectedContact.phone || 'N/A'}</span>
                            </div>
                            <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] flex justify-between items-center">
                                <span className="text-white/40 text-[13px]">GHL ID</span>
                                <span className="text-white/60 text-[12px] font-mono">{selectedContact.id}</span>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button className="flex-1 bg-[#222] hover:bg-[#333] text-white py-3 rounded-xl text-[13px] font-bold transition-colors" onClick={() => navigate('/portal/messages')}>
                                Send Message
                            </button>
                            <button 
                                className="flex-1 bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/20 text-brand-gold py-3 rounded-xl text-[13px] font-bold transition-colors" 
                                onClick={async () => {
                                    toast.loading("Creating Deal...", { id: 'deal' });
                                    try {
                                        await createOpportunity({
                                            name: `${selectedContact.firstName || 'Client'} Deal`,
                                            pipelineId: import.meta.env.VITE_GHL_PIPELINE_ID || '',
                                            pipelineStageId: '',
                                            contactId: selectedContact.id
                                        });
                                        toast.success("Deal created from contact successfully.", { id: 'deal' });
                                        navigate('/portal/deals');
                                    } catch (e) {
                                        console.error("Deal creation error", e);
                                        toast.error("Failed to create deal. Ensure pipeline settings are accurate.", { id: 'deal' });
                                    }
                                }}
                            >
                                Create Deal
                            </button>
                        </div>

                        <ClientActivityFeed contactId={selectedContact.id} />
                    </div>
                )}
            </Modal>
        </div>
    );
}
