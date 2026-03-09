import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../ui/Section';

const architectureTabs = [
    { id: 'funnel', label: 'Valuation Funnel' },
    { id: 'ai', label: 'AI Assistant' },
    { id: 'buyer', label: 'Buyer Intake' },
    { id: 'listing', label: 'Listing Detail' },
    { id: 'crm', label: 'CRM Logic' },
];

export const DemoSection = () => {
    const [activeTab, setActiveTab] = useState(architectureTabs[0].id);

    return (
        <Section className="relative overflow-hidden">
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-border-divider to-transparent" />

            <div className="text-center mb-16 px-4">
                <h2 className="text-5xl md:text-[64px] font-display font-semibold text-white mb-4 leading-tight tracking-tight">
                    System Architecture Modules
                </h2>
                <p className="text-muted-text max-w-2xl mx-auto text-lg md:text-[20px] mb-10 text-balance leading-relaxed">
                    Explore the modular framework designed to replace fragmented brokerage workflows with interconnected systems.
                </p>

                <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
                    {architectureTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-brand-accent text-[#1D1D1D] shadow-[0_0_15px_rgba(255,223,89,0.3)]'
                                : 'bg-white/5 text-soft-text hover:bg-white/10'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 lg:px-12">
                <div className="aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden glass-panel relative border border-border-divider">
                    <div className="absolute inset-0 bg-[#0A0A0A] bg-grid opacity-20 pointer-events-none" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-[#141414] p-6 lg:p-10 flex flex-col"
                        >
                            {/* Fake UI content based on tab to make it look active */}
                            {/* Custom UI content based on active tab */}

                            {activeTab === 'funnel' && (
                                <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 h-full">
                                    <div className="flex flex-col gap-6 w-full md:w-1/2">
                                        <div className="bg-[#1A1A1A] border border-white/5 rounded-lg p-4 flex items-center gap-4 relative">
                                            <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-soft-text font-bold">1</div>
                                            <div>
                                                <div className="text-white font-medium text-sm">Seller Intake Form</div>
                                                <div className="text-xs text-muted-text">32 data points captured</div>
                                            </div>
                                            <div className="absolute top-full left-9 w-0.5 h-6 bg-brand-accent/30" />
                                        </div>
                                        <div className="bg-[#1A1A1A] border border-white/5 rounded-lg p-4 flex items-center gap-4 relative">
                                            <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-soft-text font-bold">2</div>
                                            <div>
                                                <div className="text-white font-medium text-sm">Financial Ingestion</div>
                                                <div className="text-xs text-muted-text">P&L, Trailing 12 Mo, Add-backs</div>
                                            </div>
                                            <div className="absolute top-full left-9 w-0.5 h-6 bg-brand-accent/30" />
                                        </div>
                                        <div className="bg-[#1A1A1A] border border-brand-accent/20 rounded-lg p-4 flex items-center gap-4 shadow-[0_0_15px_rgba(255,223,89,0.05)]">
                                            <div className="w-10 h-10 rounded bg-brand-accent/10 flex items-center justify-center text-brand-accent font-bold">3</div>
                                            <div>
                                                <div className="text-white font-medium text-sm">Multiple Mapping</div>
                                                <div className="text-xs text-brand-accent">Industry: SaaS • Multiple: 4.2x</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex flex-col justify-center items-center px-4">
                                        <svg className="w-8 h-8 text-brand-accent/50 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                    <div className="w-full md:w-1/2 flex items-center justify-center">
                                        <div className="w-full max-w-[300px] bg-gradient-to-b from-brand-accent/10 to-transparent border border-brand-accent/30 rounded-xl p-8 text-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-brand-accent/opacity-10 animate-pulse pointer-events-none" />
                                            <div className="text-sm font-semibold text-brand-accent uppercase tracking-wider mb-2">Calculated Valuation</div>
                                            <div className="text-3xl font-display text-white font-bold mb-1">$4.5M — $5.2M</div>
                                            <div className="text-xs text-muted-text">Ready for Advisor Review</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'ai' && (
                                <div className="flex-grow flex flex-col h-full bg-[#111] rounded-lg border border-white/5 overflow-hidden">
                                    <div className="bg-[#1A1A1A] px-4 py-3 border-b border-white/5 flex items-center gap-3 shrink-0">
                                        <div className="w-8 h-8 rounded bg-brand-accent/20 flex items-center justify-center text-brand-accent text-xs font-bold">AI</div>
                                        <div className="text-sm text-white font-medium">Listing Intelligence Engine</div>
                                    </div>
                                    <div className="flex-grow p-5 flex flex-col justify-center gap-4">
                                        <div className="self-end bg-white/10 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                                            <p className="text-sm text-white">I'm looking for a B2B SaaS company doing at least $1M in EBITDA, preferably remote.</p>
                                        </div>
                                        <div className="self-start flex gap-3 max-w-[80%]">
                                            <div className="w-6 h-6 shrink-0 rounded bg-brand-accent/20 flex items-center justify-center mt-1 text-brand-accent text-[10px] font-bold">AI</div>
                                            <div className="flex flex-col gap-2">
                                                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
                                                    <p className="text-sm text-soft-text leading-relaxed">Parsing requirements:<br />• Industry: <strong>SaaS (B2B)</strong><br />• Min EBITDA: <strong>$1,000,000</strong></p>
                                                </div>
                                                <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-lg p-3">
                                                    <div className="text-xs text-brand-accent font-semibold mb-1">2 Mandates Found:</div>
                                                    <div className="text-sm text-white flex justify-between"><span>Project Velocity</span> <span className="text-muted-text">$1.2M EBITDA</span></div>
                                                    <div className="text-sm text-white flex justify-between mt-1"><span>Project Titan</span> <span className="text-muted-text">$2.4M EBITDA</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'buyer' && (
                                <div className="flex-grow flex items-center justify-center h-full">
                                    <div className="w-full max-w-lg bg-[#1A1A1A] border border-white/5 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-6">
                                            <div className="inline-flex items-center gap-1.5 bg-success-accent/10 text-success-accent text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                                                <span className="w-1.5 h-1.5 rounded-full bg-success-accent animate-pulse" /> Verified Vetted
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white text-xl font-medium border border-white/10">JD</div>
                                            <div>
                                                <div className="text-xl text-white font-semibold">Jonathan Doe</div>
                                                <div className="text-sm text-muted-text">Acquisition Group LLC</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-[#111] rounded p-3 border border-white/5">
                                                <div className="text-[10px] uppercase text-soft-text font-semibold tracking-wider mb-1">Liquid Capital Verified</div>
                                                <div className="text-brand-accent font-medium">$5,000,000+</div>
                                            </div>
                                            <div className="bg-[#111] rounded p-3 border border-white/5">
                                                <div className="text-[10px] uppercase text-soft-text font-semibold tracking-wider mb-1">Target Industries</div>
                                                <div className="text-white font-medium">SaaS, FinTech</div>
                                            </div>
                                            <div className="bg-[#111] rounded p-3 border border-white/5">
                                                <div className="text-[10px] uppercase text-soft-text font-semibold tracking-wider mb-1">Timeline</div>
                                                <div className="text-white font-medium">Under 6 Months</div>
                                            </div>
                                            <div className="bg-[#111] rounded p-3 border border-white/5">
                                                <div className="text-[10px] uppercase text-soft-text font-semibold tracking-wider mb-1">Current Holdings</div>
                                                <div className="text-white font-medium">2 Active PortCos</div>
                                            </div>
                                        </div>
                                        <button className="w-full bg-white/5 hover:bg-white/10 transition-colors text-white py-2.5 rounded text-sm font-medium border border-white/10">View Full Buyer Profile</button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'listing' && (
                                <div className="flex-grow flex flex-col h-full bg-[#1A1A1A] border border-white/5 rounded-xl overflow-hidden">
                                    <div className="p-6 border-b border-white/5 bg-[#111] flex justify-between items-start">
                                        <div>
                                            <div className="text-2xl text-white font-display font-semibold mb-1">Project Alpha (B2B SaaS)</div>
                                            <div className="text-sm text-muted-text flex gap-4"><span>Est. 2018</span> <span>Remote (US)</span></div>
                                        </div>
                                        <div className="bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded text-brand-accent text-sm font-medium">Teaser Active</div>
                                    </div>
                                    <div className="flex-grow p-6 flex flex-col gap-6">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-soft-text uppercase tracking-wider font-semibold mb-1">TTM Revenue</span>
                                                <span className="text-xl text-white font-medium">$3,200,450</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-soft-text uppercase tracking-wider font-semibold mb-1">SDE</span>
                                                <span className="text-xl text-brand-accent font-medium">$850,000</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-soft-text uppercase tracking-wider font-semibold mb-1">Margin</span>
                                                <span className="text-xl text-white font-medium">26%</span>
                                            </div>
                                        </div>
                                        <div className="mt-auto">
                                            <div className="text-sm font-medium text-white mb-3">Data Room Access</div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                                                    <div className="flex items-center gap-3">
                                                        <svg className="w-5 h-5 text-muted-text" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                        <span className="text-sm text-white">Blind Teaser.pdf</span>
                                                    </div>
                                                    <span className="text-xs text-success-accent font-medium">Public</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-[#111] rounded border border-white/5 relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)] pointer-events-none" />
                                                    <div className="flex items-center gap-3 relative z-10">
                                                        <svg className="w-5 h-5 text-brand-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                                        <span className="text-sm text-soft-text">Confidential Information Memorandum (CIM)</span>
                                                    </div>
                                                    <span className="text-xs text-brand-accent font-medium relative z-10">Locked: Awaiting NDA</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'crm' && (
                                <div className="flex-grow flex items-center justify-center h-full">
                                    <div className="w-full flex flex-col gap-4 max-w-2xl px-4">
                                        {/* Logic Node 1 */}
                                        <div className="flex items-center gap-4 relative">
                                            <div className="w-24 shrink-0 text-right text-[10px] text-brand-accent uppercase tracking-widest font-bold">Inbound</div>
                                            <div className="flex-grow bg-[#1A1A1A] border border-white/10 rounded p-4 shadow-lg relative z-10">
                                                <div className="text-sm text-white font-medium">New Buyer Registration</div>
                                                <div className="text-xs text-soft-text mt-1">Capital field: $2,000,000</div>
                                            </div>
                                            {/* Connector line down to next node */}
                                            <div className="absolute top-1/2 right-[50%] w-0.5 h-12 bg-white/10 translate-y-6" />
                                        </div>

                                        {/* Logic Rule */}
                                        <div className="flex items-center gap-4 relative mt-2">
                                            <div className="w-24 shrink-0 text-right text-[10px] text-muted-text uppercase tracking-widest font-semibold flex items-center justify-end gap-1">Rule <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
                                            <div className="flex-grow bg-brand-accent/5 border border-brand-accent/20 rounded p-3">
                                                <code className="text-xs text-brand-accent font-mono">IF Capital &gt; $1M THEN Proceed ELSE Reject</code>
                                            </div>
                                            <div className="absolute top-1/2 right-[50%] w-0.5 h-12 bg-white/10 translate-y-6" />
                                        </div>

                                        {/* Result Node */}
                                        <div className="flex items-center gap-4 relative mt-2">
                                            <div className="w-24 shrink-0 text-right text-[10px] text-success-accent uppercase tracking-widest font-bold">Action</div>
                                            <div className="flex-grow bg-[#1A1A1A] border border-success-accent/30 rounded p-4 shadow-[0_0_20px_rgba(74,222,128,0.05)] relative z-10">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-sm text-white font-medium">Auto-Send Non-Disclosure Agreement</div>
                                                        <div className="text-xs text-muted-text mt-1">Via DocuSign Integration</div>
                                                    </div>
                                                    <span className="flex h-3 w-3 relative">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-accent opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-success-accent"></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Section>
    );
};
