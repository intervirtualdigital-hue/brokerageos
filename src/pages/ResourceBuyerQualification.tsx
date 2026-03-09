
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleCTA = () => (
    <div className="mt-16 bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/20 rounded-2xl p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">Deploy a Buyer Qualification Engine in your firm</h3>
        <p className="text-muted-text mb-8 max-w-xl mx-auto leading-relaxed">
            BrokerageOS installs a fully configured qualification engine that filters buyer inquiries before they ever reach your advisors — protecting their time and your deal flow.
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

export const ResourceBuyerQualification = () => {
    return (
        <Section className="pt-32 pb-20 relative overflow-hidden" container={false}>
            <div className="absolute top-[15%] left-[-5%] w-[500px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

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
                        How buyer qualification protects deal flow
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-text mb-12 pb-8 border-b border-border-divider/40">
                        <span>Insight</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>5 min read</span>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>

                    <p className="text-xl text-soft-text leading-relaxed mb-8">
                        Not every inquiry deserves an advisor's attention. In a high-functioning brokerage, the qualification decision happens before the first conversation — not during it.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">The unqualified buyer problem</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        Business brokerages receive a wide range of buyer inquiries. A meaningful percentage of those inquiries come from individuals who are interested in the concept of acquisition — but who lack either the financial capacity, the operational experience, or the timeline commitment to close a transaction.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        Without a qualification layer, those inquiries enter the same pipeline as serious, vetted buyers. Advisors schedule calls. They share information. They invest time in relationships that were never going to result in a closed transaction. This is not a trivial problem — it compounds directly into deal velocity and advisor capacity.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        The most immediately visible cost is the time spent on unqualified conversations. The less visible cost is what doesn't happen during that time: conversations with buyers who are actually positioned to close.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">What systematic qualification looks like</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        A buyer qualification engine captures and evaluates the signals that correlate with deal completion before any advisor interaction occurs. The core inputs are straightforward: verified proof of available capital, acquisition timeline, prior ownership or acquisition experience, industry preference, and target deal size range.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        This information is collected through a structured intake flow that buyers complete when they express interest. The system evaluates their responses against your qualification criteria and produces a score — or a pass/fail determination — that your advisors receive before any conversation is scheduled.
                    </p>

                    <div className="bg-[#141414] border border-white/5 rounded-xl p-6 my-10">
                        <p className="text-white font-semibold mb-3">The advisor experience this creates:</p>
                        <p className="text-soft-text leading-relaxed">
                            Every buyer conversation your advisors have begins with a pre-qualified lead. They know the buyer has the capital to close, the experience to operate, and the timeline to move. That changes the dynamics of every interaction — from exploratory to transactional.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Protecting seller trust</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        There is a second-order effect of buyer qualification that matters significantly in M&A advisory: seller confidence. When your sellers know that the buyers being connected to their listing have been vetted — that their financials, experience, and intent have been evaluated before they receive the CIM — they have a fundamentally different experience of your firm's process.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        The seller who receives feedback that they're being introduced to three qualified buyers feels different about their advisory relationship than the seller who is told "we've had several inquiries." The quality of the qualification process becomes part of the value proposition you offer on the sell-side.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">The volume dimension</h2>
                    <p className="text-soft-text leading-relaxed">
                        At scale, buyer qualification becomes even more critical. A firm managing ten listings simultaneously and receiving 50 or more buyer inquiries per month cannot rely on manual evaluation. The filtering has to be systematic, consistent, and fast — producing qualified leads without the delays and inconsistencies that human review introduces. That speed matters to buyers who are evaluating multiple opportunities and to sellers who are watching how professionally their process is being managed.
                    </p>

                </motion.div>

                <ArticleCTA />

                <div className="mt-12 pt-8 border-t border-border-divider/30">
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Next Article</p>
                    <Link to="/resources/nda-automation" className="group flex items-start gap-4 hover:opacity-80 transition-opacity">
                        <div className="flex-grow">
                            <p className="text-sm text-brand-accent mb-1">Insight</p>
                            <h4 className="text-white font-semibold leading-snug group-hover:text-brand-accent transition-colors">Why NDA automation reduces friction in early conversations</h4>
                        </div>
                        <ArrowRight size={18} className="text-muted-text group-hover:text-brand-accent group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                    </Link>
                </div>

            </div>
        </Section>
    );
};
