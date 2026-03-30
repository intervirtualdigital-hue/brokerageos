import { useState, useMemo } from 'react';
import { useContacts, useDeals } from '@/hooks/useGHL';
import { Card } from '@/components/ui/card';
import { Loader2, CheckCircle2, Clock, Calendar, AlertCircle, ArrowRight, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ManualTask {
    id: string;
    type: 'broker';
    priority: 'high' | 'medium';
    title: string;
    desc: string;
    dateAssigned: Date;
    link: string;
}

export default function TasksPage() {
    const { data: contacts, isLoading: loadingContacts } = useContacts();
    const { data: deals, isLoading: loadingDeals } = useDeals();
    const [filter, setFilter] = useState<'all' | 'system' | 'broker'>('all');
    const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
    const [manualTasks, setManualTasks] = useState<ManualTask[]>([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', desc: '', priority: 'medium' as 'high' | 'medium' });

    const isLoading = loadingContacts || loadingDeals;

    const systemTasks = useMemo(() => {
        if (!contacts || !deals) return [];
        const generated: any[] = [];

        const oneDayAgo = new Date(Date.now() - 86400000);
        contacts.forEach(c => {
            if (c.dateAdded && new Date(c.dateAdded) > oneDayAgo) {
                generated.push({
                    id: `new_lead_${c.id}`,
                    type: 'system',
                    priority: 'high',
                    title: `Initial Outreach: ${c.firstName || 'Lead'} ${c.lastName || ''}`,
                    desc: 'New lead entered — follow up to capture intent.',
                    dateAssigned: new Date(c.dateAdded),
                    link: '/portal/clients',
                    contactId: c.id,
                });
            }
            const fourteenDaysAgo = new Date(Date.now() - (86400000 * 14));
            if (c.dateAdded && new Date(c.dateAdded) < fourteenDaysAgo) {
                generated.push({
                    id: `stale_${c.id}`,
                    type: 'system',
                    priority: 'medium',
                    title: `Re-engage: ${c.firstName || 'Lead'} ${c.lastName || ''}`,
                    desc: 'No activity in 14+ days. Send check-in message.',
                    dateAssigned: new Date(),
                    link: '/portal/messages',
                    contactId: c.id,
                });
            }
        });

        const sevenDaysAgo = new Date(Date.now() - (86400000 * 7));
        deals.forEach(d => {
            if (d.stage !== 'completed' && new Date((d as any).dateAdded || Date.now()) < sevenDaysAgo) {
                generated.push({
                    id: `stalled_${d.id}`,
                    type: 'system',
                    priority: 'high',
                    title: `Deal Stalled: ${d.title}`,
                    desc: 'In current stage 7+ days. Advance or close out.',
                    dateAssigned: new Date(),
                    link: '/portal/deals',
                });
            }
        });

        return generated.sort((a, b) => {
            if (a.priority === 'high' && b.priority !== 'high') return -1;
            if (a.priority !== 'high' && b.priority === 'high') return 1;
            return b.dateAssigned.getTime() - a.dateAssigned.getTime();
        });
    }, [contacts, deals]);

    const allTasks = [...systemTasks, ...manualTasks];
    const visibleTasks = allTasks
        .filter(t => !completedIds.has(t.id))
        .filter(t => filter === 'all' || t.type === filter);

    const handleComplete = (taskId: string) => {
        setCompletedIds(prev => new Set([...prev, taskId]));
        toast.success('Task marked complete.');
    };

    const handleCreateTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;
        const task: ManualTask = {
            id: `manual_${Date.now()}`,
            type: 'broker',
            priority: newTask.priority,
            title: newTask.title,
            desc: newTask.desc || 'Manual broker task.',
            dateAssigned: new Date(),
            link: '/portal/deals',
        };
        setManualTasks(prev => [task, ...prev]);
        setNewTask({ title: '', desc: '', priority: 'medium' });
        setShowCreateForm(false);
        toast.success('Task created.');
    };

    return (
        <div className="space-y-6 max-w-[1200px] animate-fade-in text-white/80 pb-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-[28px] font-serif font-bold text-white mb-1 tracking-tight">Global Tasks</h2>
                    <p className="text-white/50 text-[13px]">AI-generated + manual action items. {allTasks.length - completedIds.size} active.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-[#161616] border border-[#2A2A2A] rounded-xl p-1">
                        <button onClick={() => setFilter('all')} className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all ${filter === 'all' ? 'bg-[#222] text-brand-gold' : 'text-white/40 hover:text-white'}`}>All</button>
                        <button onClick={() => setFilter('system')} className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all ${filter === 'system' ? 'bg-[#222] text-brand-gold' : 'text-white/40 hover:text-white'}`}>System</button>
                        <button onClick={() => setFilter('broker')} className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all ${filter === 'broker' ? 'bg-[#222] text-brand-gold' : 'text-white/40 hover:text-white'}`}>Manual</button>
                    </div>
                    <button onClick={() => setShowCreateForm(true)} className="h-9 px-4 flex items-center gap-2 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-black font-bold text-[12px] shadow-lg transition-all">
                        <Plus className="h-3.5 w-3.5" /> New Task
                    </button>
                </div>
            </div>

            {/* Create Task Form */}
            {showCreateForm && (
                <Card className="bg-[#161616] border-[#2A2A2A] rounded-2xl p-6 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[14px] font-bold text-white">Create Manual Task</h3>
                        <button onClick={() => setShowCreateForm(false)} className="text-white/40 hover:text-white"><X className="h-4 w-4" /></button>
                    </div>
                    <form onSubmit={handleCreateTask} className="space-y-3">
                        <input
                            type="text" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})}
                            placeholder="Task title..." required
                            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[13px] text-white focus:outline-none focus:border-brand-gold/50"
                        />
                        <textarea
                            value={newTask.desc} onChange={e => setNewTask({...newTask, desc: e.target.value})}
                            placeholder="Description (optional)" rows={2}
                            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[13px] text-white focus:outline-none focus:border-brand-gold/50 resize-none"
                        />
                        <div className="flex items-center gap-3">
                            <select value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value as any})} className="bg-[#1A1A1A] border border-[#2A2A2A] p-2.5 rounded-xl text-[12px] text-white focus:outline-none appearance-none px-4">
                                <option value="high">⚡ High Priority</option>
                                <option value="medium">⏳ Medium Priority</option>
                            </select>
                            <button type="submit" className="ml-auto bg-brand-gold text-black px-6 py-2.5 rounded-xl font-bold text-[12px] hover:bg-brand-gold/90">Save Task</button>
                        </div>
                    </form>
                </Card>
            )}

            {/* Task List */}
            {isLoading ? (
                <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-brand-gold" /></div>
            ) : visibleTasks.length === 0 ? (
                <div className="text-center py-16 bg-[#161616] border border-[#2A2A2A] rounded-2xl">
                    <CheckCircle2 className="h-10 w-10 text-white/20 mx-auto mb-3" />
                    <h3 className="text-[16px] font-bold text-white mb-1">All caught up!</h3>
                    <p className="text-white/40 text-[13px]">No active tasks detected.</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {visibleTasks.map(task => (
                        <Card key={task.id} className="bg-[#161616] border-[#2A2A2A] rounded-2xl p-5 flex items-center justify-between gap-4 transition-all hover:bg-[#1A1A1A] hover:border-brand-gold/20 group">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className={`shrink-0 mt-0.5 h-9 w-9 rounded-full flex items-center justify-center border ${task.priority === 'high' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold'}`}>
                                    {task.priority === 'high' ? <AlertCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h3 className="text-[13px] font-bold text-white truncate">{task.title}</h3>
                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-white/5 text-white/50 border border-white/10 shrink-0">{task.type}</span>
                                    </div>
                                    <p className="text-[12px] text-white/50 truncate max-w-[500px]">{task.desc}</p>
                                    <div className="flex items-center gap-3 text-[10px] font-semibold text-white/30 mt-1">
                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(task.dateAssigned).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => handleComplete(task.id)} className="h-9 px-4 flex items-center gap-1.5 bg-[#222] hover:bg-[#10B981] hover:text-white border border-[#333] hover:border-[#10B981] rounded-xl transition-all text-[11px] font-bold text-white/60">
                                    <CheckCircle2 className="h-3.5 w-3.5" /> Done
                                </button>
                                <Link to={task.link} className="h-9 px-4 flex items-center gap-1.5 bg-[#222] hover:bg-brand-gold hover:text-black border border-[#333] hover:border-brand-gold rounded-xl transition-all text-[11px] font-bold text-white/60">
                                    Open <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
