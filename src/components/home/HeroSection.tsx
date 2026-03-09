
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
    return (
        <Section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex flex-col justify-center" container={false}>

            {/* ── Video Background ── */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover grayscale opacity-60"
                >
                    <source src="/hero-bg-blocks.mp4" type="video/mp4" />
                </video>

                {/* Layer 1: base dark overlay — much darker to prevent text disruption */}
                <div className="absolute inset-0 bg-[#0A0A0A]/85" />

                {/* Layer 2: Removed brand tint to prevent redness */}

                {/* Layer 3: vignette — darkens edges, focuses center */}
                <div className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(5,5,5,0.95) 100%)'
                    }}
                />

                {/* Layer 4: bottom fade into the next section */}
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050505] to-transparent" />

                {/* Layer 5: top fade from header */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505]/60 to-transparent" />
            </div>

            {/* ── Content ── */}
            <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center max-w-5xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                    <span className="text-sm font-medium text-white/80">Infrastructure for M&A brokerages</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-[32px] sm:text-5xl md:text-[72px] font-display font-semibold text-white mb-6 leading-[1.08] tracking-tight"
                >
                    Run Your Brokerage Like
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-[#FFE888] to-brand-accent/70">
                        the Firms That Never Have
                    </span>
                    <br />
                    to Explain Themselves.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed px-2 sm:px-0"
                >
                    The most respected business brokerages don't just close more deals — they operate differently. Structured intake. Qualified buyers. Deals that move. BrokerageOS gives your firm the same infrastructure, from day one.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <Link to="/book-review">
                        <button className="inline-flex items-center gap-2.5 bg-brand-accent text-[#111111] font-bold px-7 py-4 rounded-xl text-sm hover:brightness-110 transition-all group shadow-[0_0_40px_rgba(255,224,89,0.25)]">
                            Request an Infrastructure Review
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <Link to="/demo">
                        <button className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium px-7 py-4 rounded-xl text-sm transition-all backdrop-blur-sm bg-black/20">
                            See How It Works
                        </button>
                    </Link>
                </motion.div>

                {/* Stat bar */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4"
                >
                    {[
                        { value: '14 Days', label: 'Full Deployment' },
                        { value: '7 Modules', label: 'Integrated Systems' },
                        { value: 'Managed', label: 'No Technical Team Required' },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="text-lg font-display font-semibold text-white drop-shadow">{stat.value}</span>
                            <span className="text-sm text-white/40">{stat.label}</span>
                            {i < 2 && <span className="hidden sm:block w-px h-4 bg-white/15 ml-2" />}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ── Dashboard Mockup below hero copy ── */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-12 sm:mt-16 md:mt-20 relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-12 w-full z-10"
            >
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
                <div className="glass-panel p-2 rounded-t-2xl border-b-0 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] bg-[#1A1A1A]/50 backdrop-blur-sm">
                    <div className="bg-[#141414] rounded-xl h-[300px] sm:h-[400px] md:h-[560px] border border-border-divider/50 relative overflow-hidden flex flex-col">
                        {/* Mock Dashboard UI Header */}
                        <div className="h-12 border-b border-border-divider bg-[#1A1A1A] flex items-center px-4 gap-2 shrink-0">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <div className="mx-auto w-64 h-6 bg-black/40 rounded-md border border-white/5 flex items-center justify-center">
                                <span className="text-[10px] text-white/20">brokerageos.com/dashboard</span>
                            </div>
                        </div>

                        {/* Dashboard content */}
                        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 flex-grow overflow-hidden">
                            <div className="col-span-2 flex flex-col gap-5">
                                {/* Pipeline chart */}
                                <div className="rounded-xl bg-gradient-to-br from-brand-accent/5 to-transparent border border-brand-accent/15 p-5 flex flex-col shadow-inner">
                                    <div className="flex justify-between items-center mb-5">
                                        <div className="text-sm text-white font-semibold">Active Mandates</div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                                            <span className="text-xs font-medium text-brand-accent">3 New Valuations</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-3 h-20">
                                        {[
                                            { label: 'Inquiry', h: '25%', accent: false },
                                            { label: 'Valuation', h: '60%', accent: false },
                                            { label: 'NDA Signed', h: '100%', accent: true },
                                            { label: 'Under LOI', h: '20%', accent: false },
                                        ].map(bar => (
                                            <div key={bar.label} className="flex flex-col justify-end gap-1.5">
                                                <div
                                                    className={`w-full rounded-sm border-t ${bar.accent ? 'bg-brand-accent/40 border-brand-accent shadow-[0_0_12px_rgba(255,223,89,0.3)]' : 'bg-white/10 border-white/20'}`}
                                                    style={{ height: bar.h }}
                                                />
                                                <div className={`text-[10px] text-center font-medium ${bar.accent ? 'text-brand-accent' : 'text-muted-text'}`}>{bar.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Bottom cards */}
                                <div className="grid grid-cols-2 gap-5 flex-grow">
                                    <div className="rounded-xl bg-white/[0.02] border border-white/8 p-4 space-y-3">
                                        <div className="text-xs text-white/50 font-medium pb-2 border-b border-white/8">Recent Buyers</div>
                                        {[
                                            { initials: 'JD', name: 'John Doe', sub: 'Liquid: $5M+', badge: 'Vetted', badgeColor: 'text-green-400 bg-green-400/10' },
                                            { initials: '', name: 'Awaiting NDA', sub: 'Sent 2hr ago', badge: '', badgeColor: '' },
                                        ].map((b, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-7 h-7 rounded-lg ${b.initials ? 'bg-brand-accent/10 border border-brand-accent/30 text-brand-accent' : 'bg-white/5 border border-white/10'} flex items-center justify-center text-xs font-bold`}>{b.initials}</div>
                                                    <div>
                                                        <div className="text-xs text-white font-medium">{b.name}</div>
                                                        <div className="text-[10px] text-white/30">{b.sub}</div>
                                                    </div>
                                                </div>
                                                {b.badge && <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${b.badgeColor}`}>{b.badge}</span>}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="rounded-xl bg-white/[0.02] border border-white/8 p-4 flex flex-col items-center justify-center text-center gap-2">
                                        <div className="w-10 h-10 rounded-full border border-brand-accent/40 bg-brand-accent/10 flex items-center justify-center mb-1">
                                            <svg className="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                        </div>
                                        <div className="text-sm text-white font-medium">Deploy New Listing</div>
                                        <div className="text-[10px] text-white/30">Auto-generate CIM & Teaser</div>
                                    </div>
                                </div>
                            </div>
                            {/* Routing feed sidebar */}
                            <div className="rounded-xl bg-white/[0.02] border border-white/8 p-4 flex flex-col gap-3">
                                <div className="text-xs text-white/50 font-medium pb-2 border-b border-white/8">Automated Routing</div>
                                {[
                                    { text: 'SaaS Valuation Request', sub: 'Routed to Tech Team', active: false },
                                    { text: 'New Buyer NDA Complete', sub: 'Unlocking CIM Access', active: true },
                                    { text: 'HVAC Seller Inquiry', sub: 'Missing financials', active: false },
                                ].map((item, i) => (
                                    <div key={i} className={`p-3 rounded-lg border flex gap-2.5 ${item.active ? 'bg-brand-accent/5 border-brand-accent/20' : 'bg-black/30 border-white/5 opacity-50'}`}>
                                        <div className={`w-1 rounded-full shrink-0 ${item.active ? 'bg-brand-accent shadow-[0_0_8px_rgba(255,223,89,0.6)]' : 'bg-white/20'}`} />
                                        <div>
                                            <div className={`text-xs font-semibold ${item.active ? 'text-white' : 'text-white/70'}`}>{item.text}</div>
                                            <div className={`text-[10px] mt-0.5 ${item.active ? 'text-brand-accent' : 'text-white/30'}`}>{item.sub}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Section>
    );
};
