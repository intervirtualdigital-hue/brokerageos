import { Loader2, Info, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useContacts, useDeals } from '@/hooks/useGHL';
import { RevenueChart } from './revenue-chart';
import { CrmProfilePanel } from './crm-profile-panel';
import { ActivityFeedPanel } from './activity-feed-panel';

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
        <div className="flex flex-col gap-6 animate-fade-in max-w-[1400px]">
            {/* Header */}
            <div className="shrink-0">
                <h2 className="text-[28px] font-serif font-bold text-white mb-1 tracking-tight leading-tight">Brokerage Dashboard</h2>
                <p className="text-white/50 text-[13px]">Here's what's happening in your firm today.</p>
            </div>

            {/* Row 1: Revenue + Mandates + Leads */}
            <div className="grid grid-cols-12 gap-5" style={{ height: 'calc(50vh - 90px)', minHeight: '280px', maxHeight: '360px' }}>
                <RevenueChart deals={deals || []} />

                {/* Active Mandates */}
                <Card className="col-span-12 lg:col-span-3 bg-[#161616] border-[#2A2A2A] p-5 rounded-2xl flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Active Mandates</h3>
                        <Info className="h-3 w-3 text-white/40" />
                    </div>
                    <div className="flex-1 overflow-y-auto hide-scrollbar space-y-2 pr-1">
                        {loadingDeals ? (
                            <div className="flex justify-center items-center h-full"><Loader2 className="h-5 w-5 animate-spin text-brand-gold" /></div>
                        ) : mandates.length === 0 ? (
                            <div className="text-center text-white/40 text-[12px] py-8">No active mandates.</div>
                        ) : mandates.map((deal, i) => (
                            <Link to="/portal/deals" key={i} className="flex items-center justify-between group cursor-pointer bg-[#1A1A1A] p-3 rounded-xl border border-[#2A2A2A] hover:border-brand-gold/30 transition-all">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="h-7 w-7 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shrink-0">
                                        <span className="text-[10px] font-bold text-white/50">{deal.initials}</span>
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
                                    <ArrowRight className="h-3 w-3 text-white/20 group-hover:text-brand-gold transition-colors mt-1 ml-auto" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </Card>

                {/* New Leads */}
                <Card className="col-span-12 lg:col-span-3 bg-[#161616] border-[#2A2A2A] p-5 rounded-2xl flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-[11px] font-bold text-white/60 uppercase tracking-widest">New Leads</h3>
                            <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                        </div>
                        <Link to="/portal/clients" className="text-[10px] font-bold text-brand-gold uppercase hover:underline">View All</Link>
                    </div>
                    <div className="flex-1 overflow-y-auto hide-scrollbar space-y-1">
                        {loadingContacts ? (
                            <div className="flex justify-center items-center h-full"><Loader2 className="h-5 w-5 animate-spin text-brand-gold" /></div>
                        ) : newLeads.length === 0 ? (
                            <div className="text-center text-white/40 text-[12px] py-8">No recent leads.</div>
                        ) : newLeads.map((lead, i) => (
                            <Link to="/portal/messages" key={i} className="flex items-center justify-between group cursor-pointer p-2.5 rounded-xl hover:bg-[#1A1A1A] transition-all">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="h-8 w-8 rounded-full bg-[#111] border border-white/5 flex items-center justify-center shrink-0">
                                        <span className="text-[10px] font-bold text-brand-gold">{lead.initials}</span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[12px] font-semibold text-white group-hover:text-brand-gold transition-colors truncate max-w-[90px]">{lead.name}</p>
                                        <p className="text-[10px] text-white/40 truncate max-w-[90px]">{lead.type}</p>
                                    </div>
                                </div>
                                <span className="text-[9px] font-medium text-white/30 shrink-0">{lead.time}</span>
                            </Link>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Row 2: CRM Profile + Activity Feed */}
            <div className="grid grid-cols-12 gap-5" style={{ height: 'calc(50vh - 90px)', minHeight: '280px', maxHeight: '360px' }}>
                <CrmProfilePanel contacts={contacts || []} />
                <ActivityFeedPanel contacts={contacts || []} />
            </div>
        </div>
    );
}
