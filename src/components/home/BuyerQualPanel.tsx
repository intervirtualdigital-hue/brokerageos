
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const buyers = [
    {
        initials: 'JM', name: 'James Mercer', score: 94, capital: 92,
        tags: ['SBA Pre-Approved', '8 Yrs Ops Experience', 'Q2 Close'],
        status: 'Qualified', statusColor: 'text-green-400 bg-green-400/10 border-green-400/20',
    },
    {
        initials: 'TL', name: 'Taylor Lin', score: 78, capital: 65,
        tags: ['Strategic Buyer', 'Industry: HVAC', '90-Day Timeline'],
        status: 'Pending NDA', statusColor: 'text-brand-accent bg-brand-accent/10 border-brand-accent/25',
    },
    {
        initials: 'RB', name: 'R. Brennan Group', score: 52, capital: 40,
        tags: ['Missing PoF', 'No Prior Acquisitions'],
        status: 'Filtered', statusColor: 'text-red-400 bg-red-400/10 border-red-400/20',
    },
];

const BuyerMockup = () => (
    <div className="relative w-full max-w-[560px] mx-auto">
        <div className="absolute -inset-4 bg-brand-accent/8 blur-[60px] rounded-3xl pointer-events-none" />
        <div className="relative bg-[#111111] rounded-2xl border border-white/8 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0D0D0D]">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50" />
                </div>
                <div className="flex-grow mx-4">
                    <div className="bg-white/5 rounded-md h-5 flex items-center px-3">
                        <span className="text-[10px] text-white/25">brokerageos.com/buyers/qualified</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <div className="text-white font-semibold text-sm">Buyer Qualification Queue</div>
                        <div className="text-xs text-muted-text mt-0.5">Listing: HVAC Services — $2.4M–$3.1M</div>
                    </div>
                    <div className="text-xs text-soft-text bg-white/5 border border-white/8 rounded-full px-3 py-1">
                        12 inquiries · 3 shown
                    </div>
                </div>

                <div className="space-y-3">
                    {buyers.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i }}
                            className="bg-[#0D0D0D] border border-white/5 rounded-xl p-4 flex items-start gap-4"
                        >
                            <div className="w-10 h-10 rounded-xl bg-brand-accent/15 border border-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-sm shrink-0">
                                {b.initials}
                            </div>
                            <div className="flex-grow min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-white">{b.name}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${b.statusColor}`}>{b.status}</span>
                                </div>
                                {/* Score bar */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] text-white/30 w-10">Score</span>
                                    <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-accent rounded-full" style={{ width: `${b.score}%` }} />
                                    </div>
                                    <span className="text-[11px] font-bold text-brand-accent w-8 text-right">{b.score}/100</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {b.tags.map(t => (
                                        <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/5">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-text bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
                    <ShieldCheck size={13} className="text-green-400 shrink-0" />
                    <span><strong className="text-white">9 inquiries filtered</strong> before reaching your advisors this week</span>
                </div>
            </div>
        </div>
    </div>
);

export const BuyerQualPanel = () => (
    <section className="bg-[#141414] py-28 md:py-36 border-y border-border-divider/30 overflow-hidden relative">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-brand-accent/4 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left: Mockup (reversed on this panel) */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="order-2 lg:order-1"
                >
                    <BuyerMockup />
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
                        <span className="text-xs font-semibold text-soft-text uppercase tracking-wider">Module 03</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-semibold text-white mb-5 leading-tight tracking-tight">
                        Only serious buyers<br />reach your advisors.
                    </h2>
                    <p className="text-muted-text text-lg leading-relaxed mb-8 max-w-md">
                        The qualification engine evaluates every buyer inquiry — scoring liquidity, experience, and timeline — before any advisor time is spent.
                    </p>
                    <div className="flex flex-col gap-3 mb-10">
                        {['100-point qualification scoring', 'Proof of funds verification', 'Auto-filtered low-intent inquiries', 'Matched to active listings automatically'].map(f => (
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
