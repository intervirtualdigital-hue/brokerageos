
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../ui/Section';
import {
    LayoutTemplate, Filter, ShieldCheck, FileSignature,
    Building2, Network, Bot, Users, ArrowRight,
    Globe, Smartphone, MousePointerClick,
    TrendingUp, DollarSign, BarChart3,
    UserCheck, AlertTriangle, CheckCircle2,
    Eye, FileText, Lock,
    GitBranch, Zap, RotateCcw,
    PenTool, Shield, Send,
    MessageSquare, Clock, Sparkles,
    Briefcase, Star, Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ═══════════════════════════════════════════ */
/*        INTERACTIVE MODULE MOCKUPS          */
/* ═══════════════════════════════════════════ */

const ACCENT = '#FFDD59';
const SURFACE = '#1A1A1A';
const CARD = '#0F0F0F';

/* ─── 01: Institutional Brokerage Website ─── */
const WebsiteMockup = () => {
    const [activeTab, setActiveTab] = useState<'desktop' | 'mobile'>('desktop');
    const pages = [
        { name: 'Home', status: 'live', views: '2.4k' },
        { name: 'Listings', status: 'live', views: '1.8k' },
        { name: 'Sell Business', status: 'live', views: '960' },
        { name: 'About', status: 'live', views: '420' },
    ];

    return (
        <div className="space-y-3">
            {/* Browser chrome */}
            <div className="rounded-xl overflow-hidden border border-white/10" style={{ background: CARD }}>
                {/* Tab bar */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="flex items-center gap-1.5 bg-white/5 rounded-md px-3 py-1 text-[10px] text-white/40">
                            <Lock size={9} />
                            yourbrokerage.com
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {(['desktop', 'mobile'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className="p-1 rounded transition-colors"
                                style={{ color: activeTab === tab ? ACCENT : 'rgba(255,255,255,0.25)' }}
                            >
                                {tab === 'desktop' ? <Globe size={12} /> : <Smartphone size={12} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mock site */}
                <div className="p-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className={activeTab === 'mobile' ? 'max-w-[140px] mx-auto' : ''}
                        >
                            {/* Hero mockup */}
                            <div className="rounded-lg overflow-hidden border border-white/5" style={{ background: '#0D0D0D' }}>
                                <div className="p-3 space-y-2">
                                    <div className="h-1.5 w-16 rounded-full bg-white/10" />
                                    <div className="h-2 w-3/4 rounded-full bg-white/15" />
                                    <div className="h-1.5 w-1/2 rounded-full bg-white/8" />
                                    <div className="flex gap-2 mt-3">
                                        <div className="h-5 px-2 rounded-md text-[8px] font-bold flex items-center" style={{ background: ACCENT, color: '#111' }}>
                                            Get Started
                                        </div>
                                        <div className="h-5 px-2 rounded-md border border-white/15 text-[8px] text-white/40 flex items-center">
                                            Learn More
                                        </div>
                                    </div>
                                </div>
                                {/* Inquiry form mini */}
                                <div className="border-t border-white/5 p-2 mx-2 mb-2 mt-1 rounded-md" style={{ background: 'rgba(255,221,89,0.04)' }}>
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <MousePointerClick size={8} style={{ color: ACCENT }} />
                                        <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Structured Intake</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-3 rounded bg-white/5 border border-white/8" />
                                        <div className="h-3 rounded bg-white/5 border border-white/8" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Live pages */}
            <div className="grid grid-cols-2 gap-2">
                {pages.map(p => (
                    <div key={p.name} className="flex items-center justify-between px-2.5 py-2 rounded-lg border border-white/5" style={{ background: CARD }}>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            <span className="text-[10px] text-white/60">{p.name}</span>
                        </div>
                        <span className="text-[9px] text-white/30">{p.views}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ─── 02: Seller Valuation System ─── */
const ValuationMockup = () => {
    const [step, setStep] = useState(0);
    const steps = ['Business Info', 'Financials', 'Valuation'];

    useEffect(() => {
        const timer = setInterval(() => setStep(s => (s + 1) % 3), 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="space-y-3">
            {/* Progress steps */}
            <div className="flex items-center gap-1">
                {steps.map((s, i) => (
                    <div key={s} className="flex items-center gap-1 flex-1">
                        <div
                            className="w-5 h-5 rounded-full text-[8px] font-bold flex items-center justify-center transition-all duration-500"
                            style={{
                                background: i <= step ? ACCENT : 'rgba(255,255,255,0.08)',
                                color: i <= step ? '#111' : 'rgba(255,255,255,0.3)',
                            }}
                        >
                            {i + 1}
                        </div>
                        <span className="text-[9px] text-white/40 hidden sm:block">{s}</span>
                        {i < 2 && <div className="flex-1 h-px mx-1" style={{ background: i < step ? ACCENT : 'rgba(255,255,255,0.08)' }} />}
                    </div>
                ))}
            </div>

            {/* Form card */}
            <div className="rounded-xl border border-white/8 p-4" style={{ background: CARD }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {step === 0 && (
                            <div className="space-y-2.5">
                                <div>
                                    <div className="text-[9px] text-white/30 uppercase tracking-wider mb-1">Business Name</div>
                                    <div className="h-7 rounded-md bg-white/5 border border-white/8 px-2 flex items-center text-[10px] text-white/50">Pacific Coast Advisory</div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <div className="text-[9px] text-white/30 uppercase tracking-wider mb-1">Industry</div>
                                        <div className="h-7 rounded-md bg-white/5 border border-white/8 px-2 flex items-center text-[10px] text-white/50">SaaS / Tech</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] text-white/30 uppercase tracking-wider mb-1">Years Operating</div>
                                        <div className="h-7 rounded-md bg-white/5 border border-white/8 px-2 flex items-center text-[10px] text-white/50">8 years</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {step === 1 && (
                            <div className="space-y-2.5">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <div className="text-[9px] text-white/30 uppercase tracking-wider mb-1">Annual Revenue</div>
                                        <div className="h-7 rounded-md bg-white/5 border border-white/8 px-2 flex items-center text-[10px] text-white/50">$2.4M</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] text-white/30 uppercase tracking-wider mb-1">SDE / EBITDA</div>
                                        <div className="h-7 rounded-md bg-white/5 border border-white/8 px-2 flex items-center text-[10px] text-white/50">$680K</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[9px] text-white/30 uppercase tracking-wider mb-1">Growth Rate (YoY)</div>
                                    <div className="h-7 rounded-md bg-white/5 border border-white/8 px-2 flex items-center gap-1 text-[10px] text-green-400/80">
                                        <TrendingUp size={10} /> +22%
                                    </div>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="space-y-3">
                                <div className="text-center">
                                    <div className="text-[9px] uppercase tracking-wider text-white/25 mb-1">Preliminary Range</div>
                                    <div className="text-xl font-bold" style={{ color: ACCENT }}>$1.8M – $2.4M</div>
                                    <div className="text-[9px] text-white/35 mt-0.5">Based on 2.6x – 3.5x SDE Multiple</div>
                                </div>
                                <div className="flex gap-2">
                                    {[
                                        { label: 'SDE Multiple', value: '3.0x', icon: DollarSign },
                                        { label: 'Revenue', value: '$2.4M', icon: BarChart3 },
                                    ].map(m => (
                                        <div key={m.label} className="flex-1 p-2 rounded-lg border border-white/5 text-center" style={{ background: 'rgba(255,221,89,0.03)' }}>
                                            <m.icon size={12} className="mx-auto mb-1" style={{ color: ACCENT }} />
                                            <div className="text-[10px] font-semibold text-white/70">{m.value}</div>
                                            <div className="text-[8px] text-white/30">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ─── 03: Buyer Qualification Engine ─── */
const BuyerQualMockup = () => {
    const buyers = [
        { name: 'J. Morrison', score: 92, status: 'Qualified', pof: true, exp: 'Veteran', budget: '$2-5M' },
        { name: 'S. Chen', score: 67, status: 'Review', pof: true, exp: '1st Time', budget: '$500K-1M' },
        { name: 'R. Patel', score: 34, status: 'Filtered', pof: false, exp: 'Unknown', budget: 'Undisclosed' },
    ];

    return (
        <div className="space-y-2">
            {buyers.map((b, i) => (
                <motion.div
                    key={b.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="p-3 rounded-xl border transition-all"
                    style={{
                        background: CARD,
                        borderColor: b.status === 'Qualified' ? `${ACCENT}30` : b.status === 'Review' ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.05)',
                    }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/8 flex items-center justify-center text-[9px] font-bold text-white/50">
                                {b.name.charAt(0)}
                            </div>
                            <span className="text-[11px] text-white/70 font-medium">{b.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {/* Score */}
                            <div
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                style={{
                                    background: b.score >= 80 ? `${ACCENT}20` : b.score >= 50 ? 'rgba(251,191,36,0.12)' : 'rgba(239,68,68,0.12)',
                                    color: b.score >= 80 ? ACCENT : b.score >= 50 ? '#fbbf24' : '#ef4444',
                                }}
                            >
                                {b.score}
                            </div>
                            {/* Status badge */}
                            <div className="flex items-center gap-1">
                                {b.status === 'Qualified' ? <CheckCircle2 size={10} className="text-green-400" /> :
                                    b.status === 'Review' ? <AlertTriangle size={10} className="text-yellow-400" /> :
                                        <AlertTriangle size={10} className="text-red-400/60" />}
                                <span className={`text-[9px] font-medium ${b.status === 'Qualified' ? 'text-green-400' : b.status === 'Review' ? 'text-yellow-400' : 'text-red-400/60'}`}>
                                    {b.status}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 text-[9px]">
                        <div className="flex items-center gap-1">
                            <UserCheck size={8} className={b.pof ? 'text-green-400' : 'text-red-400/50'} />
                            <span className="text-white/35">POF: {b.pof ? 'Verified' : 'Missing'}</span>
                        </div>
                        <div className="text-white/35">Exp: {b.exp}</div>
                        <div className="text-white/35">{b.budget}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

/* ─── 04: Listings Infrastructure ─── */
const ListingsMockup = () => {
    const listings = [
        { name: 'SaaS Platform — Pacific NW', asking: '$2.8M', inquiries: 14, ndas: 8, status: 'Active' },
        { name: 'E-Commerce Brand — Southeast', asking: '$1.2M', inquiries: 7, ndas: 3, status: 'Active' },
    ];

    return (
        <div className="space-y-2.5">
            {listings.map((l, i) => (
                <div key={i} className="rounded-xl border border-white/8 p-3" style={{ background: CARD }}>
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <div className="text-[11px] text-white/70 font-medium mb-0.5">{l.name}</div>
                            <div className="text-[10px] text-white/30">Asking: {l.asking}</div>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full border" style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}10` }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            <span className="text-[8px] font-bold" style={{ color: ACCENT }}>{l.status}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: 'Inquiries', value: l.inquiries, icon: Eye },
                            { label: 'NDAs Signed', value: l.ndas, icon: FileText },
                            { label: 'CIM Access', value: l.ndas, icon: Lock },
                        ].map(m => (
                            <div key={m.label} className="text-center p-2 rounded-lg border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <m.icon size={10} className="mx-auto mb-1 text-white/25" />
                                <div className="text-[11px] font-bold text-white/60">{m.value}</div>
                                <div className="text-[7px] text-white/25 uppercase tracking-wider">{m.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

/* ─── 05: Advisor Routing Engine ─── */
const RoutingMockup = () => {
    const [activeRule, setActiveRule] = useState(0);
    const rules = [
        { type: 'Deal Size', condition: '> $2M', advisor: 'Senior Team', icon: DollarSign },
        { type: 'Industry', condition: 'SaaS / Tech', advisor: 'Tech Group', icon: GitBranch },
        { type: 'Overflow', condition: 'Round Robin', advisor: 'Available', icon: RotateCcw },
    ];

    useEffect(() => {
        const timer = setInterval(() => setActiveRule(r => (r + 1) % 3), 2500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="space-y-3">
            {/* Flow visualization */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex-1 p-2.5 rounded-lg border border-white/8 text-center" style={{ background: CARD }}>
                    <Zap size={12} className="mx-auto mb-1" style={{ color: ACCENT }} />
                    <div className="text-[9px] text-white/50">Inbound Lead</div>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                    <motion.div
                        className="w-8 h-px"
                        style={{ background: ACCENT }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <div className="text-[7px] text-white/20">ROUTE</div>
                </div>
                <div className="flex-1 p-2.5 rounded-lg border text-center" style={{ background: CARD, borderColor: `${ACCENT}25` }}>
                    <Network size={12} className="mx-auto mb-1" style={{ color: ACCENT }} />
                    <div className="text-[9px] text-white/50">Rules Engine</div>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                    <motion.div
                        className="w-8 h-px"
                        style={{ background: ACCENT }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                    <div className="text-[7px] text-white/20">ASSIGN</div>
                </div>
                <div className="flex-1 p-2.5 rounded-lg border border-white/8 text-center" style={{ background: CARD }}>
                    <UserCheck size={12} className="mx-auto mb-1 text-green-400" />
                    <div className="text-[9px] text-white/50">Advisor</div>
                </div>
            </div>

            {/* Rules */}
            <div className="space-y-1.5">
                {rules.map((r, i) => (
                    <motion.div
                        key={r.type}
                        className="flex items-center justify-between p-2.5 rounded-lg border transition-all duration-500 cursor-pointer"
                        style={{
                            background: i === activeRule ? `${ACCENT}08` : CARD,
                            borderColor: i === activeRule ? `${ACCENT}30` : 'rgba(255,255,255,0.05)',
                        }}
                        onClick={() => setActiveRule(i)}
                    >
                        <div className="flex items-center gap-2">
                            <r.icon size={11} style={{ color: i === activeRule ? ACCENT : 'rgba(255,255,255,0.25)' }} />
                            <span className="text-[10px] text-white/60">{r.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/40">{r.condition}</span>
                            <span className="text-[9px]" style={{ color: i === activeRule ? ACCENT : 'rgba(255,255,255,0.3)' }}>→ {r.advisor}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

/* ─── 06: Document & NDA Management ─── */
const NDAMockup = () => {
    const docs = [
        { name: 'NDA — SaaS Platform Listing', status: 'Signed', date: '2h ago', icon: Shield },
        { name: 'CIM — Auto Delivered', status: 'Sent', date: 'Just now', icon: Send },
        { name: 'Engagement Letter', status: 'Pending', date: '1d ago', icon: PenTool },
    ];

    return (
        <div className="space-y-2">
            {docs.map((d, i) => (
                <motion.div
                    key={d.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/5"
                    style={{ background: CARD }}
                >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                            background: d.status === 'Signed' ? `${ACCENT}12` : d.status === 'Sent' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.04)',
                        }}
                    >
                        <d.icon size={13} style={{ color: d.status === 'Signed' ? ACCENT : d.status === 'Sent' ? '#60a5fa' : 'rgba(255,255,255,0.3)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-white/60 font-medium truncate">{d.name}</div>
                        <div className="text-[8px] text-white/25">{d.date}</div>
                    </div>
                    <div
                        className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                            background: d.status === 'Signed' ? `${ACCENT}15` : d.status === 'Sent' ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.06)',
                            color: d.status === 'Signed' ? ACCENT : d.status === 'Sent' ? '#60a5fa' : 'rgba(255,255,255,0.4)',
                        }}
                    >
                        {d.status}
                    </div>
                </motion.div>
            ))}
            {/* Audit trail */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/5" style={{ background: 'rgba(255,221,89,0.03)' }}>
                <Shield size={10} style={{ color: ACCENT }} />
                <span className="text-[9px] text-white/40">Full audit trail active — 24 events logged</span>
            </div>
        </div>
    );
};

/* ─── 07: AI Website Assistant ─── */
const AIMockup = () => {
    const [msgIndex, setMsgIndex] = useState(0);
    const conversation = [
        { role: 'user', text: "What is the asking price for the SaaS listing?" },
        { role: 'ai', text: "The SaaS Platform listing is priced at $2.8M with an SDE of $680K. Would you like to request a CIM?" },
        { role: 'user', text: "Yes, what information do you need?" },
        { role: 'ai', text: "I will capture your details now. Please provide your name, proof of funds, and acquisition timeline." },
    ];

    useEffect(() => {
        const timer = setInterval(() => setMsgIndex(i => Math.min(i + 1, conversation.length - 1)), 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="rounded-xl border border-white/8 overflow-hidden" style={{ background: CARD }}>
            {/* Chat header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${ACCENT}20` }}>
                    <Bot size={10} style={{ color: ACCENT }} />
                </div>
                <div>
                    <div className="text-[10px] text-white/60 font-medium">BrokerageOS Assistant</div>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="text-[8px] text-green-400/70">Online 24/7</span>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <Clock size={9} className="text-white/20" />
                    <span className="text-[8px] text-white/20">&lt;2s response</span>
                </div>
            </div>

            {/* Messages */}
            <div className="p-3 space-y-2 min-h-[120px]">
                {conversation.slice(0, msgIndex + 1).map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className="max-w-[85%] px-3 py-2 rounded-xl text-[10px] leading-relaxed"
                            style={{
                                background: msg.role === 'user' ? 'rgba(255,255,255,0.08)' : `${ACCENT}10`,
                                color: msg.role === 'user' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.65)',
                                borderBottomRightRadius: msg.role === 'user' ? 4 : 12,
                                borderBottomLeftRadius: msg.role === 'ai' ? 4 : 12,
                            }}
                        >
                            {msg.role === 'ai' && <Sparkles size={8} className="inline mr-1 mb-0.5" style={{ color: ACCENT }} />}
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
                {msgIndex < conversation.length - 1 && (
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="flex gap-1 pl-2"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

/* ─── 08: Broker Recruiting Infrastructure ─── */
const RecruitingMockup = () => {
    const candidates = [
        { name: 'Alex Rivera', exp: '12 years', deals: '45 closed', specialty: 'Tech/SaaS', score: 'Strong' },
        { name: 'Maria Santos', exp: '8 years', deals: '28 closed', specialty: 'Healthcare', score: 'Good' },
        { name: 'David Kim', exp: '3 years', deals: '9 closed', specialty: 'E-Commerce', score: 'Review' },
    ];

    return (
        <div className="space-y-2">
            {candidates.map((c, i) => (
                <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/5"
                    style={{ background: CARD }}
                >
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/40 shrink-0">
                        {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[11px] text-white/70 font-medium">{c.name}</span>
                            <span
                                className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                                style={{
                                    background: c.score === 'Strong' ? `${ACCENT}15` : c.score === 'Good' ? 'rgba(74,222,128,0.12)' : 'rgba(251,191,36,0.12)',
                                    color: c.score === 'Strong' ? ACCENT : c.score === 'Good' ? '#4ade80' : '#fbbf24',
                                }}
                            >
                                {c.score}
                            </span>
                        </div>
                        <div className="flex gap-3 text-[9px] text-white/30">
                            <span className="flex items-center gap-1"><Briefcase size={8} />{c.exp}</span>
                            <span className="flex items-center gap-1"><Star size={8} />{c.deals}</span>
                            <span className="flex items-center gap-1"><Target size={8} />{c.specialty}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

/* ═══════════════════════════════════════════ */
/*          MOCKUP MAP BY MODULE ID           */
/* ═══════════════════════════════════════════ */

const MOCKUP_MAP: Record<string, React.FC> = {
    website: WebsiteMockup,
    valuation: ValuationMockup,
    buyer: BuyerQualMockup,
    listings: ListingsMockup,
    routing: RoutingMockup,
    nda: NDAMockup,
    ai: AIMockup,
    recruiting: RecruitingMockup,
};

/* ═══════════════════════════════════════════ */
/*            MODULE DATA & SECTION           */
/* ═══════════════════════════════════════════ */

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
    const MockupComponent = MOCKUP_MAP[activeId];

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
                                <p className="text-soft-text leading-relaxed mb-6">{active.desc}</p>

                                {/* ── Interactive Mockup ── */}
                                <div className="mb-8">
                                    <MockupComponent />
                                </div>

                                <div className="border-t border-white/5 pt-6 mt-auto">
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
