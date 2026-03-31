import { Loader2, Info, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useContacts, useDeals } from '@/hooks/useGHL';
import { RevenueChart } from './revenue-chart';
import { CrmProfilePanel } from './crm-profile-panel';
import { ActivityFeedPanel } from './activity-feed-panel';
import { motion } from 'framer-motion';

const getStatusColor = (stage: string) => {
    switch (stage.toLowerCase()) {
        case 'due_diligence': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        case 'offer': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
        case 'closing': return 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20';
        case 'access_granted': return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20';
        case 'review': return 'bg-brand-gold/10 text-brand-gold border-brand-gold/20';
        default: return 'bg-white/10 text-white/70 border-white/20';
    }
};

export default function DashboardPage() {
    const { data: contacts, isLoading: loadingContacts } = useContacts();
    const { data: deals, isLoading: loadingDeals } = useDeals();

    const activeDeals = deals?.filter(d => d.stage !== 'completed') || [];
    
    const mandates = activeDeals.slice(0, 5).map(deal => ({
        company: deal.title || 'Unknown Deal',
        stage: deal.stage.replace('_', ' ').toUpperCase(),
        value: deal.valuation ? `$${deal.valuation.toLocaleString()}` : (deal.askingPrice ? `$${deal.askingPrice.toLocaleString()}` : 'TBD'),
        initials: (deal.title || 'U').substring(0, 2).toUpperCase()
    }));

    const newLeads = (contacts || []).slice(0, 5).map(c => {
        const name = `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.email || 'Unknown Contact';
        return {
            name,
            type: c.tags?.[0] ? c.tags[0].replace(/_/g, ' ') : 'New Contact',
            time: c.dateAdded ? new Date(c.dateAdded).toLocaleDateString() : 'Recent',
            initials: (c.firstName?.[0] || name[0]).toUpperCase() + (c.lastName?.[0] || '').toUpperCase()
        };
    });

    return (
        <div className="flex flex-col gap-5 animate-fade-in max-w-[1500px]">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="shrink-0 flex items-center justify-between"
            >
                <div>
                    <h2 className="text-[26px] font-serif font-bold text-white mb-0.5 tracking-tight leading-tight">Brokerage Dashboard</h2>
                    <p className="text-white/40 text-[12px]">Real-time firm operations & pipeline health.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">GHL Live Data</span>
                    </div>
                </div>
            </motion.div>

            {/* Row 1: Revenue + Mandates + Leads */}
            <div className="grid grid-cols-12 gap-5" style={{ height: 'calc(50vh - 85px)', minHeight: '270px', maxHeight: '340px' }}>
                <motion.div 
                    className="col-span-12 lg:col-span-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <RevenueChart deals={deals || []} />
                </motion.div>

                {/* Active Mandates */}
                <motion.div 
                    className="col-span-12 lg:col-span-3 h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-[#161616] border-[#2A2A2A] p-5 rounded-2xl flex flex-col h-full hover:border-brand-gold/20 transition-colors">
                        <div className="flex items-center justify-between mb-3 shrink-0">
                            <h3 className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Active Mandates</h3>
                            <Info className="h-3 w-3 text-white/40" />
                        </div>
                        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-2 pr-1 content-start">
                            {loadingDeals ? (
                                <div className="flex justify-center items-center h-full"><Loader2 className="h-5 w-5 animate-spin text-brand-gold" /></div>
                            ) : mandates.length === 0 ? (
                                <div className="text-center text-white/40 text-[12px] py-8 border border-dashed border-white/5 rounded-xl">No active mandates.</div>
                            ) : mandates.map((deal, i) => (
                                <Link to="/portal/deals" key={i} className="flex items-center justify-between group cursor-pointer bg-[#1A1A1A] p-3 rounded-xl border border-[#2A2A2A] hover:border-brand-gold/30 hover:bg-[#222] transition-all">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="h-7 w-7 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-gold/40 transition-colors">
                                            <span className="text-[10px] font-bold text-white/50 group-hover:text-brand-gold/80 transition-colors">{deal.initials}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[12px] font-bold text-white group-hover:text-brand-gold transition-colors leading-none truncate max-w-[100px]">{deal.company}</p>
                                            <span className={`text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full border w-max mt-1 inline-block ${getStatusColor(deal.stage)}`}>
                                                {deal.stage}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-[12px] font-bold text-white leading-none">{deal.value}</p>
                                        <ArrowRight className="h-3 w-3 text-white/10 group-hover:text-brand-gold transition-colors mt-1 ml-auto" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                {/* New Leads */}
                <motion.div 
                    className="col-span-12 lg:col-span-3 h-full"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="bg-[#161616] border-[#2A2A2A] p-5 rounded-2xl flex flex-col h-full hover:border-brand-gold/20 transition-colors">
                        <div className="flex items-center justify-between mb-3 shrink-0">
                            <div className="flex items-center gap-2">
                                <h3 className="text-[11px] font-bold text-white/60 uppercase tracking-widest">New Leads</h3>
                                <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                            </div>
                            <Link to="/portal/clients" className="text-[10px] font-bold text-brand-gold uppercase hover:underline underline-offset-4">View All</Link>
                        </div>
                        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-1">
                            {loadingContacts ? (
                                <div className="flex justify-center items-center h-full"><Loader2 className="h-5 w-5 animate-spin text-brand-gold" /></div>
                            ) : newLeads.length === 0 ? (
                                <div className="text-center text-white/40 text-[12px] py-8 border border-dashed border-white/5 rounded-xl">No recent leads.</div>
                            ) : newLeads.map((lead, i) => (
                                <Link to="/portal/messages" key={i} className="flex items-center justify-between group cursor-pointer p-2.5 rounded-xl hover:bg-[#1A1A1A] hover:ring-1 hover:ring-white/5 transition-all">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="h-8 w-8 rounded-full bg-[#111] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-brand-gold/30 transition-colors">
                                            <span className="text-[10px] font-bold text-brand-gold/70 group-hover:text-brand-gold transition-colors">{lead.initials}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[12px] font-semibold text-white group-hover:text-brand-gold transition-colors truncate max-w-[90px]">{lead.name}</p>
                                            <p className="text-[10px] text-white/40 truncate max-w-[90px]">{lead.type}</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-medium text-white/30 shrink-0 group-hover:text-white/60 transition-colors">{lead.time}</span>
                                </Link>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Row 2: CRM Profile + Activity Feed */}
            <motion.div 
                className="grid grid-cols-12 gap-5" 
                style={{ height: 'calc(50vh - 85px)', minHeight: '270px', maxHeight: '340px' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <CrmProfilePanel contacts={contacts || []} />
                <ActivityFeedPanel contacts={contacts || []} />
            </motion.div>
        </div>
    );
}
