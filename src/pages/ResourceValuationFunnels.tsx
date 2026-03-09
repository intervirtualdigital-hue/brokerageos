
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleCTA = () => (
    <div className="mt-16 bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/20 rounded-2xl p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">See the Valuation System in action</h3>
        <p className="text-muted-text mb-8 max-w-xl mx-auto leading-relaxed">
            BrokerageOS deploys a fully customized valuation funnel inside your firm — configured with your specific industry multiples and mandate criteria.
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

export const ResourceValuationFunnels = () => {
    return (
        <Section className="pt-32 pb-20 relative overflow-hidden" container={false}>
            <div className="absolute top-[10%] right-0 w-[500px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

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
                        Why preliminary valuation funnels matter for brokers
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-text mb-12 pb-8 border-b border-border-divider/40">
                        <span>Insight</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>4 min read</span>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>

                    <p className="text-xl text-soft-text leading-relaxed mb-8">
                        The first conversation between a broker and a prospective seller sets the tone for the entire relationship. In most independent brokerages, that conversation starts too early — before the broker has what they need to evaluate whether the opportunity is worth pursuing.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">The cost of unstructured seller intake</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        Without a structured intake system, every seller engagement begins the same way: a conversation designed to gather the information your team should have already captured automatically. Revenue, EBITDA, years in business, reason for selling, seller timing expectations — your advisors spend the first 30 to 60 minutes of every new relationship conducting what is essentially a data collection exercise.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        This is expensive in two ways. First, it consumes advisor time that could be spent on active deal progression. Second, it means your team cannot evaluate deal quality before investing in the relationship. You are flying blind into every initial conversation.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">What a valuation funnel actually does</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        A preliminary valuation funnel captures deal-critical information before the first conversation happens. When a seller expresses interest, they are routed into a structured digital intake flow that collects the financial and business data your advisors need to assess fit: trailing twelve months revenue, EBITDA margins, business age and ownership structure, industry classification, reason for sale, and expected timeline.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        That data is then run against your proprietary multiple logic. The result is a preliminary valuation range — a bracket, not a binding figure — that your advisors receive alongside the seller's complete profile before any call is scheduled.
                    </p>

                    <div className="bg-[#141414] border border-white/5 rounded-xl p-6 my-10">
                        <p className="text-white font-semibold mb-3">The practical impact:</p>
                        <p className="text-soft-text leading-relaxed">
                            Your first conversation with a prospective seller begins with context. You already know the rough valuation range, the business profile, and whether this opportunity fits your mandate criteria. That shifts the conversation from data gathering to deal discussion — which is where your advisors' expertise actually creates value.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">The filter function</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        Beyond accelerating qualified conversations, a valuation funnel performs an equally important function: it filters out opportunities that don't fit your criteria before any advisor time is spent.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        When a seller's financials fall below your minimum mandate thresholds — on deal size, margin quality, or business age — the system flags the submission automatically. Your team receives a notification of the ineligible inquiry without anyone having to schedule and conduct a discovery call to reach the same conclusion.
                    </p>
                    <p className="text-soft-text leading-relaxed">
                        At volume, this filtering function alone recaptures substantial advisor capacity. Firms that receive 20 or more seller inquiries per month can redirect hours of weekly advisor time from unqualified intake conversations to active deal work — simply by installing a structured intake layer in front of every inbound inquiry.
                    </p>

                </motion.div>

                <ArticleCTA />

                <div className="mt-12 pt-8 border-t border-border-divider/30">
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Next Article</p>
                    <Link to="/resources/buyer-qualification" className="group flex items-start gap-4 hover:opacity-80 transition-opacity">
                        <div className="flex-grow">
                            <p className="text-sm text-brand-accent mb-1">Insight</p>
                            <h4 className="text-white font-semibold leading-snug group-hover:text-brand-accent transition-colors">How buyer qualification protects deal flow</h4>
                        </div>
                        <ArrowRight size={18} className="text-muted-text group-hover:text-brand-accent group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                    </Link>
                </div>

            </div>
        </Section>
    );
};
