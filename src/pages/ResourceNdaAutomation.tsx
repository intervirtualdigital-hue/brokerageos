
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleCTA = () => (
    <div className="mt-16 bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/20 rounded-2xl p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">Automate your NDA process entirely</h3>
        <p className="text-muted-text mb-8 max-w-xl mx-auto leading-relaxed">
            BrokerageOS deploys a fully automated NDA workflow — listing-specific, one-click, with instant CIM delivery and complete audit trails built in.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-review">
                <button className="inline-flex items-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-7 py-3.5 rounded-xl text-sm hover:brightness-110 transition-all group">
                    Book an Infrastructure Review <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
            <Link to="/modules">
                <button className="inline-flex items-center gap-2 border border-white/15 text-soft-text hover:text-white hover:border-white/30 font-medium px-7 py-3.5 rounded-xl text-sm transition-all">
                    Explore All Modules
                </button>
            </Link>
        </div>
        <p className="text-xs text-muted-text mt-6">30 minutes. We'll show you exactly where your current setup is losing opportunities.</p>
    </div>
);

export const ResourceNdaAutomation = () => {
    return (
        <Section className="pt-32 pb-20 relative overflow-hidden" container={false}>
            <div className="absolute top-[10%] right-[-5%] w-[500px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-3xl">

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
                    <Link to="/resources" className="inline-flex items-center gap-2 text-sm text-muted-text hover:text-white transition-colors group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Resources
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-flex text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border text-soft-text bg-white/5 border-white/10 mb-6">
                        Insight
                    </span>
                    <h1 className="text-4xl md:text-5xl font-display font-semibold text-white mb-5 leading-tight tracking-tight">
                        Why NDA automation reduces friction in early conversations
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-text mb-12 pb-8 border-b border-border-divider/40">
                        <span>Insight</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>3 min read</span>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>

                    <p className="text-xl text-soft-text leading-relaxed mb-8">
                        Deal momentum is fragile. The window between a buyer expressing genuine interest and that interest cooling is shorter than most brokerages account for. Manual NDA processes are one of the most consistent points where that momentum breaks.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">What happens in a manual NDA process</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        In a typical independent brokerage, the NDA process works like this: a buyer contacts the firm about a listing. An advisor reviews the inquiry and determines it is worth pursuing. They prepare or retrieve the appropriate NDA document — which may or may not be specific to the listing — and send it to the buyer via email or a third-party e-signature platform. The buyer receives it, reviews it, signs it, and returns it. The advisor is notified, retrieves the CIM from wherever it is stored, and sends it to the buyer.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        Each of those steps introduces delay. The review step. The document preparation step. The send. The wait. The notification. The CIM retrieval. A process that could complete in minutes routinely takes hours or days — during which the buyer moves on to other opportunities, the deal conversation stalls, or the seller's confidence in their advisor erodes.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">The automated alternative</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        NDA automation removes the delay between buyer interest and document execution. When a qualified buyer engages with a listing, they receive an automated NDA request — one that is specific to that listing — within seconds. The document is signed with a single click. The CIM is unlocked automatically upon execution. The advisor is notified that a new buyer has signed and gained access, along with a summary of the buyer's qualification profile.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        From the buyer's perspective, the experience is frictionless. From the advisor's perspective, the transaction happened without their involvement — freeing them to manage active deal conversations rather than administering document logistics.
                    </p>

                    <div className="bg-[#141414] border border-white/5 rounded-xl p-6 my-10">
                        <p className="text-white font-semibold mb-3">The compounding effect:</p>
                        <p className="text-soft-text leading-relaxed">
                            When NDA execution takes seconds rather than days, your active buyer pool at any given moment is larger. More buyers have signed and have access to current CIMs. More conversations are live. That translates directly into faster deal velocity — not because the deals themselves have changed, but because the administrative friction that was slowing them down has been removed.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Audit trails as a professional standard</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        Beyond speed, automated NDA management produces something that manual processes rarely do consistently: a complete, organized audit trail. Every execution is timestamped. Every document version is logged. Every CIM access event is recorded.
                    </p>
                    <p className="text-soft-text leading-relaxed">
                        This matters in two ways. It satisfies the compliance and legal documentation requirements that serious transactions increasingly require. And it provides your team with visibility into buyer engagement — who has signed, who has accessed the CIM, and when — that manual tracking never reliably produces at scale. That data is operational intelligence that better-equipped firms are already using to prioritize conversations and close faster.
                    </p>

                </motion.div>

                <ArticleCTA />

                <div className="mt-12 pt-8 border-t border-border-divider/30">
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Start from the beginning</p>
                    <Link to="/resources/architecture-difference" className="group flex items-start gap-4 hover:opacity-80 transition-opacity">
                        <div className="flex-grow">
                            <p className="text-sm text-brand-accent mb-1">Architecture Notes</p>
                            <h4 className="text-white font-semibold leading-snug group-hover:text-brand-accent transition-colors">The structural difference between a brokerage website and brokerage infrastructure</h4>
                        </div>
                        <ArrowRight size={18} className="text-muted-text group-hover:text-brand-accent group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                    </Link>
                </div>

            </div>
        </Section>
    );
};
