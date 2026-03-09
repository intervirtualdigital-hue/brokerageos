import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Section } from '../ui/Section';

/* ─── Brand Tokens ─── */
const GLOW = '#FFDD59';
const BG = '#1D1D1D';
const SURFACE = '#141414';
const CARD_BG = '#1A1A1A';

/* ─── Flow View Types ─── */
type FlowView = 'buyer' | 'seller' | 'advisor';

/* ─── Architecture Modules ─── */
interface ArchModule {
    id: string;
    order: number;
    label: string;
    title: string;
    description: string;
    details: string[];
    // which flow views this module appears in
    flows: FlowView[];
    // unique label per flow (optional override)
    flowLabels?: Partial<Record<FlowView, string>>;
}

const MODULES: ArchModule[] = [
    {
        id: 'traffic',
        order: 1,
        label: 'Traffic Sources',
        title: 'Inbound Opportunity Capture',
        description:
            'Captures buyer, seller, and partner inquiries from multiple sources and routes them into a structured intake process.',
        details: [
            'Website inquiries',
            'Listing inquiries',
            'Valuation requests',
            'Referral introductions',
            'Advisor recruiting interest',
        ],
        flows: ['buyer', 'seller', 'advisor'],
        flowLabels: {
            buyer: 'Traffic Sources',
            seller: 'Valuation Request',
            advisor: 'Inbound Channels',
        },
    },
    {
        id: 'intake',
        order: 2,
        label: 'Structured Intake',
        title: 'Structured Data Capture',
        description:
            'Standardized intake forms collect deal-relevant information before the conversation even begins. Every inquiry enters the system with clean, structured data.',
        details: [
            'Preliminary business valuation requests',
            'Buyer acquisition criteria',
            'Seller business details',
            'Listing inquiry qualification',
        ],
        flows: ['buyer', 'seller', 'advisor'],
        flowLabels: {
            buyer: 'Buyer Intake',
            seller: 'Seller Intake',
            advisor: 'Lead Intake',
        },
    },
    {
        id: 'qualification',
        order: 3,
        label: 'AI Qualification',
        title: 'AI-Assisted Screening',
        description:
            'An AI assistant handles first-line interaction with inbound inquiries, reducing manual intake work and ensuring faster response times.',
        details: [
            'Answers questions about listings',
            'Gathers buyer requirements',
            'Collects seller information',
            'Schedules advisor meetings',
        ],
        flows: ['buyer', 'seller', 'advisor'],
        flowLabels: {
            buyer: 'Qualification',
            seller: 'AI Screening',
            advisor: 'AI Pre-Qualification',
        },
    },
    {
        id: 'routing',
        order: 4,
        label: 'Advisor Routing',
        title: 'Deal Flow Assignment Logic',
        description:
            'The system intelligently routes opportunities to the correct advisor. High-value opportunities automatically route to senior partners first.',
        details: [
            'Deal size matching',
            'Industry expertise alignment',
            'Geography-based routing',
            'Advisor seniority rules',
        ],
        flows: ['buyer', 'seller', 'advisor'],
        flowLabels: {
            buyer: 'Advisor Routing',
            seller: 'Advisor Assignment',
            advisor: 'Smart Assignment',
        },
    },
    {
        id: 'execution',
        order: 5,
        label: 'Deal Execution',
        title: 'Transaction Infrastructure',
        description:
            'Advisors manage deal activity through a structured workflow. This ensures no opportunity is lost in communication gaps.',
        details: [
            'NDA dispatch',
            'Engagement letter workflows',
            'Listing inquiries management',
            'Buyer tracking',
            'Advisor task management',
        ],
        flows: ['buyer', 'seller', 'advisor'],
        flowLabels: {
            buyer: 'Deal Process',
            seller: 'Listing Process',
            advisor: 'Deal Management',
        },
    },
    {
        id: 'visibility',
        order: 6,
        label: 'Leadership Visibility',
        title: 'Leadership Oversight',
        description:
            'Brokerage leadership gains full visibility into deal activity with real-time insight into the brokerage operation.',
        details: [
            'Pipeline oversight',
            'Advisor performance tracking',
            'Response time monitoring',
            'Deal progress visibility',
        ],
        flows: ['buyer', 'advisor'],
        flowLabels: {
            buyer: 'Visibility & Reporting',
            advisor: 'Performance Dashboard',
        },
    },
];

/* ─── Flow definitions for highlighting ─── */
const FLOW_CONFIGS: Record<FlowView, { label: string; path: string[] }> = {
    buyer: {
        label: 'Buyer Flow',
        path: ['traffic', 'intake', 'qualification', 'routing', 'execution', 'visibility'],
    },
    seller: {
        label: 'Seller Flow',
        path: ['traffic', 'intake', 'qualification', 'routing', 'execution'],
    },
    advisor: {
        label: 'Advisor Flow',
        path: ['traffic', 'intake', 'qualification', 'routing', 'execution', 'visibility'],
    },
};

/* ══════════════════════════════════════════════════════
             SUB-COMPONENTS
   ══════════════════════════════════════════════════════ */

/* ── Flow Toggle ── */
const FlowToggle = ({
    active,
    onChange,
}: {
    active: FlowView;
    onChange: (v: FlowView) => void;
}) => {
    const views: FlowView[] = ['buyer', 'seller', 'advisor'];
    return (
        <div className="flex items-center justify-center mb-12 md:mb-16 relative z-10">
            <div
                className="inline-flex rounded-full p-1 border"
                style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                }}
            >
                {views.map((v) => {
                    const isActive = v === active;
                    return (
                        <button
                            key={v}
                            onClick={() => onChange(v)}
                            className="relative px-5 md:px-7 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer"
                            style={{
                                color: isActive ? '#111' : 'rgba(255,255,255,0.5)',
                            }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="flow-toggle-bg"
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: GLOW }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 35,
                                    }}
                                />
                            )}
                            <span className="relative z-10 capitalize">
                                {FLOW_CONFIGS[v].label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

/* ── Animated data pulse on connector lines ── */
const DataPulse = ({ delay = 0, vertical = false }: { delay?: number; vertical?: boolean }) => (
    <motion.div
        className="absolute"
        style={{
            ...(vertical
                ? { left: '50%', transform: 'translateX(-50%)', width: 4, height: 12, borderRadius: 2 }
                : { top: '50%', transform: 'translateY(-50%)', width: 12, height: 4, borderRadius: 2 }),
            background: `linear-gradient(${vertical ? '180deg' : '90deg'}, transparent, ${GLOW}, transparent)`,
        }}
        initial={vertical ? { top: '-10%' } : { left: '-10%' }}
        animate={vertical ? { top: '110%' } : { left: '110%' }}
        transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'linear',
            delay,
        }}
    />
);

/* ── Desktop Connector Line ── */
const ConnectorLine = ({ delay, isHighlighted }: { delay: number; isHighlighted: boolean }) => (
    <div className="hidden lg:flex items-center justify-center" style={{ width: 36 }}>
        <div className="relative w-full h-[2px] overflow-hidden">
            <div
                className="absolute inset-0 transition-colors duration-500"
                style={{
                    backgroundColor: isHighlighted
                        ? `${GLOW}40`
                        : 'rgba(255,255,255,0.06)',
                }}
            />
            {isHighlighted && <DataPulse delay={delay} />}
        </div>
    </div>
);

/* ── Vertical Connector (mobile + tablet) ── */
const VerticalConnector = ({
    delay,
    isHighlighted,
}: {
    delay: number;
    isHighlighted: boolean;
}) => (
    <div className="lg:hidden flex justify-center" style={{ height: 40 }}>
        <div className="relative w-[2px] h-full overflow-hidden">
            <div
                className="absolute inset-0 transition-colors duration-500"
                style={{
                    backgroundColor: isHighlighted
                        ? `${GLOW}40`
                        : 'rgba(255,255,255,0.06)',
                }}
            />
            {isHighlighted && <DataPulse delay={delay} vertical />}
        </div>
    </div>
);

/* ── Floating Detail Panel (portalled to body) ── */
const FloatingDetailPanel = ({
    mod,
    anchorRef,
}: {
    mod: ArchModule;
    anchorRef: React.RefObject<HTMLDivElement>;
}) => {
    const [pos, setPos] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setPos({
                top: rect.bottom + 12,
                left: rect.left + rect.width / 2,
            });
        }
    }, [anchorRef]);

    return createPortal(
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl overflow-hidden border pointer-events-none"
            style={{
                position: 'fixed',
                zIndex: 9999,
                width: 280,
                top: pos.top,
                left: pos.left,
                transform: 'translateX(-50%)',
                backgroundColor: '#111',
                borderColor: `${GLOW}20`,
                boxShadow: `0 24px 64px rgba(0,0,0,0.8), 0 0 40px ${GLOW}06`,
            }}
        >
            {/* Arrow */}
            <div
                className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                style={{
                    backgroundColor: '#111',
                    borderLeft: `1px solid ${GLOW}20`,
                    borderTop: `1px solid ${GLOW}20`,
                }}
            />

            <div className="p-5 relative z-10">
                <p className="text-[13px] text-white/70 leading-relaxed mb-4">
                    {mod.description}
                </p>
                <div className="space-y-2">
                    {mod.details.map((d, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-2.5"
                        >
                            <div
                                className="w-1 h-1 rounded-full mt-[7px] shrink-0"
                                style={{ backgroundColor: `${GLOW}88` }}
                            />
                            <span className="text-[12px] text-white/50 leading-relaxed">
                                {d}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>,
        document.body
    );
};

/* ── Module Node Card ── */
const ModuleNode = ({
    mod,
    isHighlighted,
    isExpanded,
    onToggle,
    onLeave,
    index,
    isInView,
    activeFlow,
}: {
    mod: ArchModule;
    isHighlighted: boolean;
    isExpanded: boolean;
    onToggle: () => void;
    onLeave: () => void;
    index: number;
    isInView: boolean;
    activeFlow: FlowView;
}) => {
    const displayLabel = mod.flowLabels?.[activeFlow] ?? mod.label;
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            className="relative flex"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            style={{ width: 170 }}
        >
            {/* The Node */}
            <motion.div
                ref={cardRef}
                className="relative cursor-pointer rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col w-full"
                style={{
                    backgroundColor: isExpanded ? CARD_BG : SURFACE,
                    borderColor: isExpanded
                        ? `${GLOW}66`
                        : isHighlighted
                            ? `${GLOW}30`
                            : 'rgba(255,255,255,0.06)',
                    boxShadow: isExpanded
                        ? `0 0 40px ${GLOW}15, 0 0 80px ${GLOW}06, 0 20px 60px rgba(0,0,0,0.5)`
                        : isHighlighted
                            ? `0 0 20px ${GLOW}08, 0 8px 32px rgba(0,0,0,0.4)`
                            : '0 4px 24px rgba(0,0,0,0.3)',
                    minHeight: 160,
                }}
                onMouseEnter={onToggle}
                onMouseLeave={onLeave}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                {/* Glow overlay when highlighted */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(ellipse at top, ${GLOW}12, transparent 70%)`,
                        opacity: isHighlighted || isExpanded ? 1 : 0,
                    }}
                />

                {/* Node content */}
                <div className="relative z-10 p-4 lg:p-5 flex flex-col flex-1">
                    {/* Order badge */}
                    <div
                        className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 transition-colors duration-300"
                        style={{
                            color: isHighlighted || isExpanded ? GLOW : 'rgba(255,255,255,0.25)',
                        }}
                    >
                        0{mod.order}
                    </div>

                    {/* Label */}
                    <h4
                        className="text-[13px] lg:text-sm font-semibold tracking-wide transition-colors duration-300"
                        style={{
                            color: isExpanded ? '#fff' : isHighlighted ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
                        }}
                    >
                        {displayLabel}
                    </h4>

                    {/* Subtitle */}
                    <p
                        className="text-[11px] mt-1.5 transition-colors duration-300"
                        style={{ color: isHighlighted ? `${GLOW}99` : 'rgba(255,255,255,0.3)' }}
                    >
                        {mod.title}
                    </p>

                    {/* Spacer to push indicator to bottom */}
                    <div className="flex-1" />

                    {/* Pulse indicator */}
                    <div className="flex items-center gap-2 mt-4">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                                backgroundColor: isHighlighted || isExpanded ? GLOW : 'rgba(255,255,255,0.15)',
                            }}
                            animate={
                                isHighlighted || isExpanded
                                    ? { scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }
                                    : {}
                            }
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span
                            className="text-[10px] tracking-wider uppercase font-medium"
                            style={{
                                color: isHighlighted || isExpanded ? `${GLOW}88` : 'rgba(255,255,255,0.2)',
                            }}
                        >
                            {isExpanded ? 'Active' : 'Module'}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Expanded Detail Panel — portalled to body */}
            <AnimatePresence>
                {isExpanded && (
                    <FloatingDetailPanel mod={mod} anchorRef={cardRef as React.RefObject<HTMLDivElement>} />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ── Mobile Module Card ── */
const MobileModuleCard = ({
    mod,
    isHighlighted,
    isExpanded,
    onToggle,
    index,
    isInView,
    activeFlow,
}: {
    mod: ArchModule;
    isHighlighted: boolean;
    isExpanded: boolean;
    onToggle: () => void;
    index: number;
    isInView: boolean;
    activeFlow: FlowView;
}) => {
    const displayLabel = mod.flowLabels?.[activeFlow] ?? mod.label;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
        >
            <motion.div
                className="rounded-xl overflow-hidden border cursor-pointer transition-all duration-400"
                style={{
                    backgroundColor: isExpanded ? CARD_BG : SURFACE,
                    borderColor: isExpanded
                        ? `${GLOW}50`
                        : isHighlighted
                            ? `${GLOW}25`
                            : 'rgba(255,255,255,0.06)',
                    boxShadow: isExpanded
                        ? `0 0 30px ${GLOW}10, 0 12px 40px rgba(0,0,0,0.5)`
                        : '0 2px 16px rgba(0,0,0,0.3)',
                }}
                onClick={onToggle}
                whileTap={{ scale: 0.98 }}
            >
                {/* glow */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-400"
                    style={{
                        background: `radial-gradient(ellipse at top, ${GLOW}10, transparent 70%)`,
                        opacity: isHighlighted || isExpanded ? 1 : 0,
                    }}
                />

                <div className="relative z-10 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span
                                className="text-[10px] font-bold tracking-[0.15em]"
                                style={{
                                    color: isHighlighted || isExpanded ? GLOW : 'rgba(255,255,255,0.25)',
                                }}
                            >
                                0{mod.order}
                            </span>
                            <span
                                className="text-sm font-semibold"
                                style={{
                                    color: isExpanded ? '#fff' : isHighlighted ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
                                }}
                            >
                                {displayLabel}
                            </span>
                        </div>
                        <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: isHighlighted || isExpanded ? GLOW : 'rgba(255,255,255,0.15)',
                            }}
                            animate={
                                isHighlighted || isExpanded
                                    ? { scale: [1, 1.4, 1] }
                                    : {}
                            }
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div
                                    className="mt-3 pt-3 border-t"
                                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                                >
                                    <p className="text-[12px] text-white/50 leading-relaxed mb-2">
                                        {mod.title}
                                    </p>
                                    <p className="text-[13px] text-white/65 leading-relaxed mb-3">
                                        {mod.description}
                                    </p>
                                    <div className="space-y-1.5">
                                        {mod.details.map((d, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <div
                                                    className="w-1 h-1 rounded-full mt-[6px] shrink-0"
                                                    style={{ backgroundColor: `${GLOW}88` }}
                                                />
                                                <span className="text-[11px] text-white/40 leading-relaxed">
                                                    {d}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ══════════════════════════════════════════════════════
             MAIN SECTION COMPONENT
   ══════════════════════════════════════════════════════ */

export const InfrastructureMapSection = () => {
    const [activeFlow, setActiveFlow] = useState<FlowView>('buyer');
    const [expandedNode, setExpandedNode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-60px' });

    const currentPath = FLOW_CONFIGS[activeFlow].path;
    const visibleModules = MODULES.filter((m) => currentPath.includes(m.id));

    /* Close expanded node when clicking outside */
    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setExpandedNode(null);
            }
        },
        []
    );

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [handleOutsideClick]);

    /* Reset expanded node on flow switch */
    useEffect(() => {
        setExpandedNode(null);
    }, [activeFlow]);

    return (
        <Section
            container={false}
            className="relative overflow-x-hidden border-y py-20 md:py-28 lg:py-36"
            style={{ backgroundColor: BG, borderColor: 'rgba(255,255,255,0.05)' }}
        >
            {/* ── Ambient Background ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Grid overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundSize: '48px 48px',
                        backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
                        `,
                        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                    }}
                />
                {/* Glow orbs */}
                <div
                    className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[160px]"
                    style={{ backgroundColor: GLOW, opacity: 0.04 }}
                />
                <div
                    className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[120px]"
                    style={{ backgroundColor: GLOW, opacity: 0.03 }}
                />
            </div>

            {/* ── Header ── */}
            <div className="relative z-10 text-center px-4 mb-10 md:mb-14">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                    style={{
                        borderColor: `${GLOW}30`,
                        backgroundColor: `${GLOW}0A`,
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: GLOW }}
                    />
                    <span
                        className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]"
                        style={{ color: GLOW }}
                    >
                        System Architecture
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl lg:text-[56px] font-display font-semibold text-white mb-5 tracking-tight leading-[1.15]"
                >
                    The Operating System Behind
                    <br className="hidden md:block" />
                    <span className="md:hidden"> </span>
                    <span style={{ color: GLOW }}>Modern Brokerages</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-white/45 max-w-2xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed"
                >
                    A unified infrastructure that captures, qualifies, routes, and manages deal
                    flow from first inquiry to closing.
                </motion.p>
            </div>

            {/* ── Flow Toggle ── */}
            <FlowToggle active={activeFlow} onChange={setActiveFlow} />

            {/* ── Architecture Diagram ── */}
            <div ref={containerRef} className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8">
                {/* ═══ DESKTOP (lg+) — Horizontal Flow ═══ */}
                <div className="hidden lg:flex items-stretch justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFlow}
                            className="flex items-stretch justify-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {visibleModules.map((mod, i) => {
                                const isInPath = currentPath.includes(mod.id);
                                return (
                                    <div key={mod.id} className="flex items-stretch">
                                        <ModuleNode
                                            mod={mod}
                                            isHighlighted={isInPath}
                                            isExpanded={expandedNode === mod.id}
                                            onToggle={() =>
                                                setExpandedNode(
                                                    expandedNode === mod.id ? null : mod.id
                                                )
                                            }
                                            onLeave={() => setExpandedNode(null)}
                                            index={i}
                                            isInView={isInView}
                                            activeFlow={activeFlow}
                                        />
                                        {i < visibleModules.length - 1 && (
                                            <ConnectorLine
                                                delay={i * 0.3}
                                                isHighlighted={isInPath}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ═══ MOBILE/TABLET (< lg) — Vertical Flow ═══ */}
                <div className="lg:hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFlow}
                            className="flex flex-col items-center max-w-sm mx-auto"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {visibleModules.map((mod, i) => {
                                const isInPath = currentPath.includes(mod.id);
                                return (
                                    <div key={mod.id} className="w-full">
                                        <MobileModuleCard
                                            mod={mod}
                                            isHighlighted={isInPath}
                                            isExpanded={expandedNode === mod.id}
                                            onToggle={() =>
                                                setExpandedNode(
                                                    expandedNode === mod.id
                                                        ? null
                                                        : mod.id
                                                )
                                            }
                                            index={i}
                                            isInView={isInView}
                                            activeFlow={activeFlow}
                                        />
                                        {i < visibleModules.length - 1 && (
                                            <VerticalConnector
                                                delay={i * 0.3}
                                                isHighlighted={isInPath}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ── Flow Legend ── */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="relative z-10 mt-16 md:mt-20 flex items-center justify-center gap-6 text-[11px] text-white/30"
            >
                <div className="flex items-center gap-2">
                    <div
                        className="w-6 h-[2px] rounded-full"
                        style={{ backgroundColor: `${GLOW}50` }}
                    />
                    <span>Active path</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-[2px] rounded-full bg-white/10" />
                    <span>System connector</span>
                </div>
                <div className="flex items-center gap-2">
                    <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: GLOW }}
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span>Active module</span>
                </div>
            </motion.div>

            {/* ── Custom styles ── */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </Section>
    );
};
