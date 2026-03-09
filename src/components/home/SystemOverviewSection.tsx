
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../ui/Section';
import { LayoutTemplate, Filter, ShieldCheck, FileSignature, Building2, Network, Bot, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const modules = [
    {
        id: 'website', num: '01', title: 'Institutional Brokerage Website', icon: LayoutTemplate,
        desc: 'Your public face stops looking like a template. The website is built to capture structured inquiries from buyers and sellers and position your firm with the credibility of a serious advisory operation — not just a landing page with a contact form.',
        features: ['Structured Inquiry Capture', 'Credibility-First Design', 'Mobile-First Architecture', 'Optimized Conversion Paths']
    },
    {
        id: 'valuation', num: '02', title: 'Preliminary Seller Valuation System', icon: Filter,
        desc: 'Before a broker picks up the phone, the system has already captured deal-critical information from the seller. Valuation flows structure what sellers share so conversations start with context, not questions.',
        features: ['Deal-Critical Data Capture', 'Dynamic Multiple Logic', 'Branded Output Generation', 'Incomplete Submission Flagging']
    },
    {
        id: 'buyer', num: '03', title: 'Buyer Qualification Engine', icon: ShieldCheck,
        desc: 'Not every inquiry deserves an advisor\'s attention. The qualification engine filters buyers before they reach your team — surfacing serious opportunities and filtering noise.',
        features: ['Proof of Funds Verification', 'Experience & Timeline Scoring', 'Automated Filtering', 'Mandate Matching']
    },
    {
        id: 'listings', num: '04', title: 'Listings Infrastructure', icon: Building2,
        desc: 'Each listing operates as its own structured intake point. Buyer interest is captured, tracked, and organized per listing — giving advisors visibility into who\'s engaged and how.',
        features: ['Per-Listing Intake Tracking', 'Blind Teaser Generation', 'Gated CIM Access', 'Buyer Activity Visibility']
    },
    {
        id: 'routing', num: '05', title: 'Advisor Routing Engine', icon: Network,
        desc: 'Opportunities route to the right advisor automatically. No more manually forwarding leads or figuring out who owns what.',
        features: ['Rules-Based Assignment', 'Deal Size & Industry Routing', 'Round-Robin Distribution', 'Salesforce/HubSpot Integration']
    },
    {
        id: 'nda', num: '06', title: 'Document & NDA Management', icon: FileSignature,
        desc: 'NDAs, engagement letters, and deal documents are sent, tracked, and managed inside the platform. The paper trail is organized from day one.',
        features: ['One-Click eSignatures', 'Listing-Specific NDAs', 'Full Audit Trails', 'Auto-CIM Delivery on Signing']
    },
    {
        id: 'ai', num: '07', title: 'AI Website Assistant', icon: Bot,
        desc: 'An AI assistant handles listing questions, captures inquiries, and directs visitors to the appropriate next step — 24/7, without a broker having to be available.',
        features: ['24/7 Availability', 'Listing-Specific Knowledge', 'Lead Capture & Routing', 'Structured Inquiry Handoff']
    },
    {
        id: 'recruiting', num: '08', title: 'Broker Recruiting Infrastructure', icon: Users,
        desc: 'Incoming broker inquiries enter the same structured intake system used for opportunities — capturing experience, deal history, and specializations so leadership can evaluate candidates consistently.',
        features: ['Structured Candidate Intake', 'Experience & Volume Capture', 'Consistent Evaluation Framework', 'Pipeline Visibility']
    },
];

export const SystemOverviewSection = () => {
    const [activeId, setActiveId] = useState('website');
    const active = modules.find(m => m.id === activeId)!;
    const ActiveIcon = active.icon;

    return (
        <Section className="bg-[#0A0A0A] border-y border-border-divider/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            <div className="text-center mb-16 relative z-10">
                <h2 className="text-5xl md:text-[64px] font-display font-semibold text-white mb-6 tracking-tight leading-tight">
                    The Infrastructure Behind the Results
                </h2>
                <p className="text-muted-text max-w-2xl mx-auto text-xl leading-relaxed">
                    BrokerageOS is a structured operating layer built for business brokerages. Each component handles a specific part of how deals enter and move through your firm.
                </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 max-w-6xl mx-auto">

                {/* Left: Module List */}
                <div className="lg:col-span-2 flex flex-col gap-1">
                    {modules.map((mod) => {
                        const Icon = mod.icon;
                        const isActive = mod.id === activeId;
                        return (
                            <motion.button
                                key={mod.id}
                                onClick={() => setActiveId(mod.id)}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-200 group ${isActive
                                        ? 'bg-brand-accent/10 border border-brand-accent/25'
                                        : 'border border-transparent hover:bg-white/[0.03] hover:border-white/5'
                                    }`}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-brand-accent text-[#1D1D1D]' : 'bg-white/5 text-muted-text group-hover:text-soft-text'}`}>
                                    <Icon size={17} />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className={`text-sm font-semibold transition-colors truncate ${isActive ? 'text-white' : 'text-soft-text'}`}>{mod.title}</div>
                                </div>
                                <span className={`text-[10px] font-bold tracking-widest shrink-0 ${isActive ? 'text-brand-accent' : 'text-white/20'}`}>{mod.num}</span>
                            </motion.button>
                        );
                    })}

                    <div className="mt-4 px-2">
                        <Link to="/modules" className="inline-flex items-center gap-1.5 text-sm text-muted-text hover:text-brand-accent transition-colors group">
                            View all modules
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Right: Detail Panel */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeId}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="h-full bg-[#141414] border border-brand-accent/15 rounded-2xl p-8 relative overflow-hidden flex flex-col"
                        >
                            <div className="absolute top-0 right-0 w-56 h-56 bg-brand-accent/5 blur-[80px] rounded-full pointer-events-none" />

                            <div className="relative z-10 flex flex-col flex-grow">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-accent/15 border border-brand-accent/25 flex items-center justify-center">
                                        <ActiveIcon size={26} className="text-brand-accent" />
                                    </div>
                                    <span className="text-4xl font-display font-semibold text-white/[0.06]">{active.num}</span>
                                </div>

                                <h3 className="text-2xl font-semibold text-white mb-3">{active.title}</h3>
                                <p className="text-soft-text leading-relaxed mb-8 flex-grow">{active.desc}</p>

                                <div className="border-t border-white/5 pt-6">
                                    <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">Core Capabilities</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {active.features.map(feat => (
                                            <div key={feat} className="flex items-center gap-2 text-sm text-soft-text">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                                                {feat}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Section>
    );
};
