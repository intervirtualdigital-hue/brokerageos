import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Info, TrendingUp, Trophy, Users, DollarSign, Medal, Briefcase, Calendar } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Card } from '@/components/ui/card';

const conversionData = [
    { name: 'Jan', value: 45 }, { name: 'Feb', value: 52 }, { name: 'Mar', value: 38 },
    { name: 'Apr', value: 65 }, { name: 'May', value: 48 }, { name: 'Jun', value: 75 },
];

const revenueData = [
    { name: 'Q1', value: 1.2 }, { name: 'Q2', value: 1.8 }, { name: 'Q3', value: 2.4 }, { name: 'Q4', value: 3.1 }
];

const brokerLeaderboard = [
    { rank: 1, name: "Olivia Martin", deals: 14, volume: 12500000, conversion: 68 },
    { rank: 2, name: "Jackson Lee", deals: 11, volume: 8900000, conversion: 54 },
    { rank: 3, name: "Isabella Nguyen", deals: 9, volume: 7200000, conversion: 61 },
    { rank: 4, name: "William Kim", deals: 7, volume: 4100000, conversion: 42 },
    { rank: 5, name: "Sofia Davis", deals: 5, volume: 2800000, conversion: 38 },
];

export default function AnalyticsPage() {
    const [activeTab, setActiveTab] = useState<'firm' | 'leaderboard'>('firm');
    const [selectedBroker, setSelectedBroker] = useState<any | null>(null);

    return (
        <div className="space-y-8 max-w-[1400px] animate-fade-in text-white/80 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-[32px] font-serif font-bold text-white mb-2 tracking-tight">Analytics & Intelligence</h2>
                    <p className="text-white/50 text-[15px]">Deep insights into your funnel performance and deal velocity.</p>
                </div>
                
                <div className="flex bg-[#161616] border border-[#2A2A2A] rounded-xl p-1 shrink-0">
                    <button 
                        onClick={() => setActiveTab('firm')}
                        className={`px-5 py-2 flex items-center gap-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === 'firm' ? 'bg-[#222] text-white shadow-md border border-white/5' : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'}`}
                    >
                        <Building2Icon className="h-4 w-4" /> Firm Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('leaderboard')}
                        className={`px-5 py-2 flex items-center gap-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === 'leaderboard' ? 'bg-[#222] text-brand-gold shadow-md border border-brand-gold/20' : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'}`}
                    >
                        <Trophy className="h-4 w-4" /> Broker Leaderboard
                    </button>
                </div>
            </div>
            
            {activeTab === 'firm' ? (
                /* General Brokerage Standpoint */
                <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-[#161616] border-[#2A2A2A] p-6 rounded-3xl flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                                <DollarSign className="h-6 w-6 text-brand-gold" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1">Gross Commission</p>
                                <p className="text-[24px] font-black text-white">$4.2M</p>
                            </div>
                        </Card>
                        <Card className="bg-[#161616] border-[#2A2A2A] p-6 rounded-3xl flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                <TrendingUp className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1">Avg Deal Size</p>
                                <p className="text-[24px] font-black text-white">$1.8M</p>
                            </div>
                        </Card>
                        <Card className="bg-[#161616] border-[#2A2A2A] p-6 rounded-3xl flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-[#10B981]/10 flex items-center justify-center shrink-0">
                                <Users className="h-6 w-6 text-[#10B981]" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1">Total Active Clients</p>
                                <p className="text-[24px] font-black text-white">284</p>
                            </div>
                        </Card>
                    </div>

                    {/* Speed Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-[#161616] border-[#2A2A2A] p-6 rounded-3xl flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                                <Calendar className="h-6 w-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1">Avg Response Time</p>
                                <p className="text-[24px] font-black text-white">2.4h</p>
                                <p className="text-[11px] text-[#10B981] font-bold">↑ 18% faster than last month</p>
                            </div>
                        </Card>
                        <Card className="bg-[#161616] border-[#2A2A2A] p-6 rounded-3xl flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                                <TrendingUp className="h-6 w-6 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1">Lead Response Speed</p>
                                <p className="text-[24px] font-black text-white">14min</p>
                                <p className="text-[11px] text-[#10B981] font-bold">Within 15-min gold standard</p>
                            </div>
                        </Card>
                        <Card className="bg-[#161616] border-[#2A2A2A] p-6 rounded-3xl flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                                <Briefcase className="h-6 w-6 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1">Deal Velocity</p>
                                <p className="text-[24px] font-black text-white">47 days</p>
                                <p className="text-[11px] text-white/50">Avg time from lead to close</p>
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Lead Conversions Area Chart */}
                        <Card className="bg-[#161616] border-[#2A2A2A] p-8 rounded-3xl h-[400px] flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-[14px] font-bold text-white/60 uppercase tracking-widest">Lead Conversions (MQL)</h3>
                                    <span title="Marketing Qualified Leads converting to active opportunities.">
                                        <Info className="h-4 w-4 text-white/40 cursor-help" />
                                    </span>
                                </div>
                                <span className="text-brand-gold font-bold text-[18px]">+14%</span>
                            </div>
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={conversionData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 12, fontWeight: 500 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 12, fontWeight: 500 }} />
                                        <Tooltip cursor={{ stroke: '#ffffff20', strokeWidth: 1, strokeDasharray: '4 4' }} contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', borderRadius: '8px', color: '#fff' }} />
                                        <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fill="url(#colorConv)" animationDuration={1500} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>

                        {/* Revenue Bar Chart */}
                        <Card className="bg-[#161616] border-[#2A2A2A] p-8 rounded-3xl h-[400px] flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-[14px] font-bold text-white/60 uppercase tracking-widest">Quarterly Revenue (M)</h3>
                                </div>
                                <span className="text-[#10B981] font-bold text-[18px]">+22%</span>
                            </div>
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 12, fontWeight: 500 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 12, fontWeight: 500 }} />
                                        <Tooltip cursor={{ fill: '#ffffff05' }} contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', borderRadius: '8px', color: '#fff' }} formatter={(val) => [`$${val}M`, 'Revenue']} />
                                        <Bar dataKey="value" fill="#FFDD59" radius={[4, 4, 0, 0]} animationDuration={1500} barSize={40}>
                                            {revenueData.map((_entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === revenueData.length - 1 ? '#FFDD59' : '#ffffff20'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>
                </div>
            ) : (
                /* Top Performing Broker Leaderboard */
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-3xl overflow-hidden p-0 relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 blur-3xl pointer-events-none rounded-bl-full" />
                        
                        <div className="p-8 pb-6 border-b border-[#2A2A2A] flex items-center justify-between relative z-10">
                            <div>
                                <h3 className="text-[20px] font-bold text-white flex items-center gap-3">
                                    <Medal className="h-5 w-5 text-brand-gold" />
                                    Firm Top Performers
                                </h3>
                                <p className="text-[13px] text-white/40 mt-1">Ranked by total closed deal volume (YTD).</p>
                            </div>
                            <div className="bg-[#1A1A1A] px-4 py-2 border border-[#2A2A2A] rounded-lg">
                                <span className="text-[12px] font-bold text-white/50 uppercase tracking-widest mr-3">Overall Firm Volume</span>
                                <span className="text-[16px] font-black text-brand-gold">$34.5M</span>
                            </div>
                        </div>

                        <table className="w-full text-left relative z-10">
                            <thead className="bg-[#111111]/80 backdrop-blur">
                                <tr>
                                    <th className="p-5 pl-8 text-[12px] font-bold text-white/30 uppercase tracking-widest w-[80px]">Rank</th>
                                    <th className="p-5 text-[12px] font-bold text-white/30 uppercase tracking-widest">Broker Name</th>
                                    <th className="p-5 text-[12px] font-bold text-white/30 uppercase tracking-widest text-center">Deals Closed</th>
                                    <th className="p-5 text-[12px] font-bold text-white/30 uppercase tracking-widest text-center">Conversion %</th>
                                    <th className="p-5 pr-8 text-[12px] font-bold text-white/30 uppercase tracking-widest text-right">Lead Volume</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2A2A2A]/50">
                                {brokerLeaderboard.map((broker) => (
                                    <tr key={broker.rank} onClick={() => setSelectedBroker(broker)} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                        <td className="p-5 pl-8">
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[13px] font-black shadow-inner
                                                ${broker.rank === 1 ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(255,221,89,0.4)]' : 
                                                  broker.rank === 2 ? 'bg-[#C0C0C0] text-black shadow-[0_0_15px_rgba(192,192,192,0.4)]' : 
                                                  broker.rank === 3 ? 'bg-[#CD7F32] text-black shadow-[0_0_15px_rgba(205,127,50,0.4)]' : 
                                                  'bg-[#2A2A2A] text-white/40'}`}>
                                                {broker.rank}
                                            </div>
                                        </td>
                                        <td className="p-5 font-semibold text-[15px] text-white group-hover:text-brand-gold transition-colors">
                                            {broker.name}
                                            {broker.rank === 1 && <span className="ml-3 text-[10px] font-bold bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded uppercase tracking-wider border border-brand-gold/20">MVP</span>}
                                        </td>
                                        <td className="p-5 text-center font-bold text-[14px] text-white/80">{broker.deals}</td>
                                        <td className="p-5 text-center font-bold text-[14px] text-white/80">
                                            <div className="flex items-center justify-center gap-2">
                                                <span>{broker.conversion}%</span>
                                                <div className="w-16 h-1.5 bg-[#222] rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#10B981] rounded-full" style={{ width: `${broker.conversion}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5 pr-8 text-right font-black text-[15px] font-mono text-brand-gold drop-shadow-md">
                                            ${(broker.volume / 1000000).toFixed(1)}M
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <Modal isOpen={!!selectedBroker} onClose={() => setSelectedBroker(null)} title="Broker Performance Drilldown">
                {selectedBroker && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-16 w-16 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-xl font-black text-brand-gold">
                                {selectedBroker.name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div>
                                <h3 className="text-[20px] font-bold text-white">{selectedBroker.name}</h3>
                                <p className="text-[13px] text-white/50">Rank #{selectedBroker.rank} • Senior Advisor</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-4 rounded-xl">
                                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1.5"><DollarSign className="h-3 w-3" /> YTD Volume</p>
                                <p className="text-[20px] font-black text-brand-gold">${(selectedBroker.volume / 1000000).toFixed(1)}M</p>
                            </div>
                            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-4 rounded-xl">
                                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Briefcase className="h-3 w-3" /> Deals Won</p>
                                <p className="text-[20px] font-bold text-white">{selectedBroker.deals}</p>
                            </div>
                            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-4 rounded-xl">
                                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1.5"><TrendingUp className="h-3 w-3" /> Conversion Rate</p>
                                <p className="text-[20px] font-bold text-[#10B981]">{selectedBroker.conversion}%</p>
                            </div>
                            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-4 rounded-xl">
                                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Calendar className="h-3 w-3" /> Active Pipeline</p>
                                <p className="text-[20px] font-bold text-blue-400">4 Deals</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#2A2A2A] flex justify-end">
                            <button onClick={() => setSelectedBroker(null)} className="px-5 py-2.5 bg-brand-gold text-black font-bold text-[13px] rounded-xl hover:bg-brand-gold/80 transition-all">Close Drilldown</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

function Building2Icon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" />
            <path d="M16 6h.01" />
            <path d="M12 6h.01" />
            <path d="M12 10h.01" />
            <path d="M12 14h.01" />
            <path d="M16 10h.01" />
            <path d="M16 14h.01" />
            <path d="M8 10h.01" />
            <path d="M8 14h.01" />
        </svg>
    )
}
