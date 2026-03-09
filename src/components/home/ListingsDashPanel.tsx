
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Users, TrendingUp, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const listings = [
    { name: 'HVAC Services Group', revenue: '$1.84M', ebitda: '$412K', ndas: 7, buyers: 4, stage: 'Active', progress: 75 },
    { name: 'Regional Staffing Firm', revenue: '$3.2M', ebitda: '$680K', ndas: 3, buyers: 2, stage: 'LOI Review', progress: 90 },
    { name: 'Commercial Landscaping', revenue: '$980K', ebitda: '$190K', ndas: 12, buyers: 8, stage: 'CIM Sent', progress: 55 },
];

const stageColors: Record<string, string> = {
    'Active': 'text-green-400 bg-green-400/10 border-green-400/20',
    'LOI Review': 'text-brand-accent bg-brand-accent/10 border-brand-accent/25',
    'CIM Sent': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
};

const ListingsMockup = () => (
    <div className="relative w-full max-w-[580px] mx-auto">
        <div className="absolute -inset-4 bg-brand-accent/8 blur-[60px] rounded-3xl pointer-events-none" />
        <div className="relative bg-[#111111] rounded-2xl border border-white/8 overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0D0D0D]">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50" />
                </div>
                <div className="flex-grow mx-4">
                    <div className="bg-white/5 rounded-md h-5 flex items-center px-3">
                        <span className="text-[10px] text-white/25">brokerageos.com/listings/dashboard</span>
                    </div>
                </div>
                <button className="text-[10px] bg-brand-accent text-[#1D1D1D] font-bold px-3 py-1 rounded-md">+ New Listing</button>
            </div>

            {/* Summary stats bar */}
            <div className="grid grid-cols-4 border-b border-white/5">
                {[
                    { label: 'Active Listings', value: '3', icon: FileText },
                    { label: 'Total NDAs', value: '22', icon: Eye },
                    { label: 'Qualified Buyers', value: '14', icon: Users },
                    { label: 'Avg. Deal Size', value: '$2.1M', icon: TrendingUp },
                ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col items-center gap-1 py-3 border-r border-white/5 last:border-0">
                        <span className="text-base font-bold text-white">{value}</span>
                        <span className="text-[9px] text-white/30 uppercase tracking-wider text-center px-1">{label}</span>
                    </div>
                ))}
            </div>

            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b border-white/5">
                {['Listing', 'Revenue', 'NDAs', 'Buyers', 'Stage'].map(h => (
                    <div key={h} className={`text-[9px] uppercase tracking-widest text-white/25 font-bold ${h === 'Listing' ? 'col-span-4' : h === 'Stage' ? 'col-span-2' : 'col-span-2 text-center'}`}>{h}</div>
                ))}
            </div>

            {/* Listing rows */}
            <div className="divide-y divide-white/5">
                {listings.map((l, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 * i }}
                        className="grid grid-cols-12 gap-2 px-4 py-3.5 items-center hover:bg-white/[0.02] transition-colors"
                    >
                        <div className="col-span-4">
                            <div className="text-xs font-semibold text-white truncate">{l.name}</div>
                            <div className="text-[10px] text-muted-text mt-0.5">EBITDA: {l.ebitda}</div>
                        </div>
                        <div className="col-span-2 text-center">
                            <span className="text-xs font-medium text-soft-text">{l.revenue}</span>
                        </div>
                        <div className="col-span-2 text-center">
                            <span className="text-xs font-semibold text-white bg-brand-accent/10 border border-brand-accent/20 px-2 py-0.5 rounded-full">{l.ndas}</span>
                        </div>
                        <div className="col-span-2 text-center">
                            <span className="text-xs text-soft-text">{l.buyers}</span>
                        </div>
                        <div className="col-span-2">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${stageColors[l.stage]}`}>{l.stage}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

export const ListingsDashPanel = () => (
    <section className="bg-[#0A0A0A] py-28 md:py-36 border-y border-border-divider/30 overflow-hidden relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left: Copy */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-divider bg-white/4 mb-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                        <span className="text-xs font-semibold text-soft-text uppercase tracking-wider">Module 04</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-semibold text-white mb-5 leading-tight tracking-tight">
                        Every listing is its<br />own deal machine.
                    </h2>
                    <p className="text-muted-text text-lg leading-relaxed mb-8 max-w-md">
                        Each listing operates as a structured intake point. Buyer interest is captured, tracked, and organized per listing — giving advisors complete visibility at a glance.
                    </p>
                    <div className="flex flex-col gap-3 mb-10">
                        {['Per-listing NDA and buyer tracking', 'Blind teaser and CIM generation', 'Real-time buyer activity feed', 'Multi-listing advisor dashboard'].map(f => (
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

                {/* Right: Mockup */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <ListingsMockup />
                </motion.div>
            </div>
        </div>
    </section>
);
