
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const routingEvents = [
    {
        time: 'Just now',
        event: 'New Inquiry Received',
        detail: 'HVAC Services · $1.84M Revenue',
        rule: 'Deal Size: $1M+ → Senior Advisor Team',
        assigned: 'S. Clarke',
        color: 'bg-brand-accent',
        glow: 'shadow-[0_0_12px_rgba(255,224,89,0.4)]',
        live: true,
    },
    {
        time: '4m ago',
        event: 'NDA Executed',
        detail: 'Regional Staffing · Buyer: T. Lin',
        rule: 'Auto: CIM Access Unlocked',
        assigned: 'System',
        color: 'bg-blue-400',
        glow: '',
        live: false,
    },
    {
        time: '12m ago',
        event: 'Buyer Qualified',
        detail: 'Score: 94/100 · Capital Verified',
        rule: 'Matched to 2 active listings',
        assigned: 'J. Park',
        color: 'bg-green-400',
        glow: '',
        live: false,
    },
    {
        time: '31m ago',
        event: 'Inquiry Filtered',
        detail: 'Missing PoF · Score: 38/100',
        rule: 'Auto-rejection sent',
        assigned: 'System',
        color: 'bg-red-400',
        glow: '',
        live: false,
    },
];

const advisors = [
    { initials: 'SC', name: 'S. Clarke', active: 2, capacity: 85 },
    { initials: 'JP', name: 'J. Park', active: 3, capacity: 70 },
    { initials: 'MR', name: 'M. Reyes', active: 1, capacity: 95 },
];

const RoutingMockup = () => (
    <div className="relative w-full max-w-[560px] mx-auto">
        <div className="absolute -inset-4 bg-brand-accent/8 blur-[60px] rounded-3xl pointer-events-none" />
        <div className="relative bg-[#111111] rounded-2xl border border-white/8 overflow-hidden shadow-2xl">
            {/* Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0D0D0D]">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50" />
                </div>
                <div className="flex-grow mx-4">
                    <div className="bg-white/5 rounded-md h-5 flex items-center px-3">
                        <span className="text-[10px] text-white/25">brokerageos.com/routing/live</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-green-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Live
                </div>
            </div>

            <div className="grid grid-cols-5">
                {/* Routing feed */}
                <div className="col-span-3 p-4 border-r border-white/5">
                    <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">Routing Activity</div>
                    <div className="space-y-3">
                        {routingEvents.map((ev, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 6 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.08 * i }}
                                className={`relative flex gap-3 p-3 rounded-xl ${ev.live ? 'bg-brand-accent/8 border border-brand-accent/20' : 'bg-white/[0.02] border border-white/5'}`}
                            >
                                <div className={`w-2 rounded-full shrink-0 ${ev.color} ${ev.glow}`} style={{ minHeight: '100%' }} />
                                <div className="flex-grow min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-xs font-semibold text-white">{ev.event}</span>
                                        <span className="text-[9px] text-white/25">{ev.time}</span>
                                    </div>
                                    <div className="text-[10px] text-muted-text">{ev.detail}</div>
                                    <div className="text-[10px] text-brand-accent/70 mt-1 flex items-center gap-1">
                                        <Zap size={9} />
                                        {ev.rule}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Advisor capacity */}
                <div className="col-span-2 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">Advisor Capacity</div>
                    <div className="space-y-4">
                        {advisors.map((a, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-md bg-brand-accent/15 border border-brand-accent/20 flex items-center justify-center text-brand-accent text-[9px] font-bold">{a.initials}</div>
                                        <span className="text-xs text-white font-medium">{a.name}</span>
                                    </div>
                                    <span className="text-[10px] text-brand-accent font-bold">{a.active} active</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${a.capacity}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.7, delay: 0.1 * i }}
                                        className="h-full bg-gradient-to-r from-brand-accent to-brand-accent/60 rounded-full"
                                    />
                                </div>
                                <div className="text-[9px] text-white/25 mt-1">{a.capacity}% capacity</div>
                            </div>
                        ))}
                    </div>

                    {/* Today's stats */}
                    <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
                        <div className="flex justify-between text-[10px]">
                            <span className="text-white/30">Routed today</span>
                            <span className="text-white font-semibold">18</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                            <span className="text-white/30">Auto-filtered</span>
                            <span className="text-red-400 font-semibold">9</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                            <span className="text-white/30">Avg. response</span>
                            <span className="text-green-400 font-semibold">&lt; 3 min</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const AdvisorRoutingPanel = () => (
    <section className="bg-[#141414] py-28 md:py-36 border-y border-border-divider/30 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-brand-accent/4 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left: Mockup */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="order-2 lg:order-1"
                >
                    <RoutingMockup />
                </motion.div>

                {/* Right: Copy */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="order-1 lg:order-2"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-divider bg-white/4 mb-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                        <span className="text-xs font-semibold text-soft-text uppercase tracking-wider">Module 05</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-semibold text-white mb-5 leading-tight tracking-tight">
                        Deals route themselves<br />to the right advisor.
                    </h2>
                    <p className="text-muted-text text-lg leading-relaxed mb-8 max-w-md">
                        No more manually forwarding leads or figuring out who owns what. The routing engine assigns opportunities based on your rules — deal size, industry, or geography.
                    </p>
                    <div className="flex flex-col gap-3 mb-10">
                        {['Rules-based advisor assignment', 'Real-time routing activity feed', 'Capacity monitoring per advisor', 'Auto-rejection with audit trail'].map(f => (
                            <div key={f} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                                <span className="text-soft-text text-sm">{f}</span>
                            </div>
                        ))}
                    </div>
                    <Link to="/modules">
                        <button className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-white transition-colors group">
                            See all modules <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    </section>
);
