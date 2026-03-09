
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ValuationMockup = () => (
    <div className="relative w-full max-w-[560px] mx-auto">
        {/* Ambient glow */}
        <div className="absolute -inset-4 bg-brand-accent/8 blur-[60px] rounded-3xl pointer-events-none" />

        {/* Browser chrome */}
        <div className="relative bg-[#111111] rounded-2xl border border-white/8 overflow-hidden shadow-2xl">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0D0D0D]">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50" />
                </div>
                <div className="flex-grow mx-4">
                    <div className="bg-white/5 rounded-md h-5 flex items-center px-3">
                        <span className="text-[10px] text-white/25">brokerageos.com/sell/intake</span>
                    </div>
                </div>
            </div>

            {/* App content */}
            <div className="p-6 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-white font-semibold text-sm">Seller Intake — Step 2 of 4</div>
                        <div className="text-muted-text text-xs mt-0.5">Business Financials</div>
                    </div>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className={`h-1.5 w-8 rounded-full ${n <= 2 ? 'bg-brand-accent' : 'bg-white/10'}`} />
                        ))}
                    </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <label className="text-[11px] text-white/40 uppercase tracking-wider font-medium">Industry</label>
                        <div className="bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 flex items-center justify-between">
                            <span className="text-sm text-white">HVAC Services</span>
                            <Building2 size={13} className="text-brand-accent" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] text-white/40 uppercase tracking-wider font-medium">Years Operating</label>
                        <div className="bg-white/5 border border-white/8 rounded-lg px-3 py-2.5">
                            <span className="text-sm text-white">14 Years</span>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] text-white/40 uppercase tracking-wider font-medium">Trailing 12M Revenue</label>
                        <div className="bg-white/5 border border-brand-accent/30 rounded-lg px-3 py-2.5">
                            <span className="text-sm text-white font-medium">$1,840,000</span>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] text-white/40 uppercase tracking-wider font-medium">EBITDA (TTM)</label>
                        <div className="bg-white/5 border border-white/8 rounded-lg px-3 py-2.5">
                            <span className="text-sm text-white">$412,000</span>
                        </div>
                    </div>
                </div>

                {/* Valuation output */}
                <div className="bg-gradient-to-r from-brand-accent/15 to-brand-accent/5 border border-brand-accent/25 rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute right-3 top-3">
                        <TrendingUp size={32} className="text-brand-accent/20" />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-brand-accent/70 font-bold mb-1">Preliminary Valuation Range</div>
                    <div className="text-3xl font-display font-bold text-white mb-1">$2.4M – $3.1M</div>
                    <div className="text-xs text-muted-text">Based on 5.8–7.5× EBITDA multiple · HVAC Services benchmark</div>
                </div>

                {/* Auto-qualification badge */}
                <div className="flex items-center gap-2 bg-green-500/8 border border-green-500/20 rounded-lg px-4 py-2.5">
                    <CheckCircle2 size={15} className="text-green-400 shrink-0" />
                    <span className="text-sm text-green-300 font-medium">Mandate criteria met — routing to advisor team</span>
                </div>
            </div>
        </div>
    </div>
);

export const ValuationFunnelPanel = () => (
    <section className="bg-[#0A0A0A] py-28 md:py-36 border-y border-border-divider/30 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-brand-accent/4 blur-[100px] rounded-full pointer-events-none" />
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
                        <span className="text-xs font-semibold text-soft-text uppercase tracking-wider">Module 01</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-semibold text-white mb-5 leading-tight tracking-tight">
                        Sellers arrive with<br />context, not questions.
                    </h2>
                    <p className="text-muted-text text-lg leading-relaxed mb-8 max-w-md">
                        Before a broker picks up the phone, the system has captured deal-critical financials and generated a preliminary valuation range — automatically.
                    </p>
                    <div className="flex flex-col gap-3 mb-10">
                        {['Structured 4-step seller intake', 'Dynamic multiple logic by industry', 'Auto-qualification against mandate criteria', 'Complete briefing delivered to advisor'].map(f => (
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
                    <ValuationMockup />
                </motion.div>
            </div>
        </div>
    </section>
);
