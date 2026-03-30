import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

export function RevenueChart({ deals }: { deals: any[] }) {
    const [period, setPeriod] = useState<30 | 60 | 90>(30);

    const activeDeals = deals?.filter(d => d.stage !== 'completed') || [];
    const pipelineValue = activeDeals.reduce((sum, d) => sum + (d.valuation || d.askingPrice || 0), 0);
    const closedValue = deals?.filter(d => d.stage === 'completed').reduce((sum, d) => sum + (d.valuation || d.askingPrice || 0), 0) || 0;
    const dealsPerStage = activeDeals.reduce((acc, d) => { acc[d.stage] = (acc[d.stage] || 0) + 1; return acc; }, {} as Record<string, number>);

    const chartData = period === 30 
        ? [{ name: 'W1', value: 1200 }, { name: 'W2', value: 1800 }, { name: 'W3', value: 3000 }, { name: 'W4', value: 4500 }]
        : period === 60 
            ? [{ name: 'M1', value: 4000 }, { name: 'M2', value: 5000 }]
            : [{ name: 'M1', value: 3000 }, { name: 'M2', value: 4000 }, { name: 'M3', value: 6000 }];

    return (
        <Card className="col-span-12 lg:col-span-6 bg-[#161616] border-[#2A2A2A] p-5 rounded-2xl flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Revenue Overview</h3>
                <div className="flex bg-[#1A1A1A] rounded-md p-0.5 border border-[#2A2A2A]">
                    {[30, 60, 90].map(p => (
                        <button 
                            key={p} 
                            onClick={() => setPeriod(p as any)}
                            className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all ${period === p ? 'bg-brand-gold text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            {p}D
                        </button>
                    ))}
                </div>
            </div>

            {/* Inline Stats */}
            <div className="flex gap-3 mb-3">
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-2 rounded-xl flex-1">
                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Pipeline</p>
                    <p className="text-[18px] font-serif font-bold text-white tracking-tight leading-none">${(pipelineValue / 1000000).toFixed(1)}M</p>
                </div>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-2 rounded-xl flex-1">
                    <p className="text-[9px] font-bold text-brand-gold uppercase tracking-widest mb-0.5">Closed</p>
                    <p className="text-[18px] font-serif font-bold text-brand-gold tracking-tight leading-none">${(closedValue / 1000000).toFixed(1)}M</p>
                </div>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-2 rounded-xl flex-1">
                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">By Stage</p>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                        {Object.entries(dealsPerStage).slice(0, 3).map(([stage, count]) => (
                            <span key={stage} className="text-[9px] font-bold text-white/60 bg-white/5 px-1.5 py-0.5 rounded">{String(count)}</span>
                        ))}
                        {activeDeals.length === 0 && <span className="text-[10px] text-white/30">—</span>}
                    </div>
                </div>
            </div>
            
            {/* Chart */}
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FFDD59" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#FFDD59" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 500 }} dy={5} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 500 }} tickFormatter={(val) => `$${val}`} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff20', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area type="monotone" dataKey="value" stroke="#FFDD59" strokeWidth={2.5} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1A1A1A] border border-brand-gold/30 p-3 rounded-xl shadow-lg flex flex-col gap-1 min-w-[120px]">
                <p className="text-[11px] font-black text-white/50 uppercase tracking-widest leading-none">{label}</p>
                <p className="text-[20px] font-black text-brand-gold tracking-tight leading-none">
                    ${payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};
