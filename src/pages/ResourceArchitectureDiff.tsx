
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleCTA = () => (
    <div className="mt-16 bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/20 rounded-2xl p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">Ready to close the infrastructure gap?</h3>
        <p className="text-muted-text mb-8 max-w-xl mx-auto leading-relaxed">
            BrokerageOS deploys the full institutional infrastructure your firm needs in 14 days. No patchwork. No manual workarounds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-review">
                <button className="inline-flex items-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-7 py-3.5 rounded-xl text-sm hover:brightness-110 transition-all group">
                    Book an Infrastructure Review <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
            <Link to="/system">
                <button className="inline-flex items-center gap-2 border border-white/15 text-soft-text hover:text-white hover:border-white/30 font-medium px-7 py-3.5 rounded-xl text-sm transition-all">
                    Explore the Architecture
                </button>
            </Link>
        </div>
        <p className="text-xs text-muted-text mt-6">30 minutes. We'll show you exactly where your current setup is losing opportunities.</p>
    </div>
);

export const ResourceArchitectureDiff = () => {
    return (
        <Section className="pt-32 pb-20 relative overflow-hidden" container={false}>
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-3xl">

                {/* Back */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
                    <Link to="/resources" className="inline-flex items-center gap-2 text-sm text-muted-text hover:text-white transition-colors group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Resources
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-flex text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border text-brand-accent bg-brand-accent/10 border-brand-accent/20 mb-6">
                        Architecture Notes
                    </span>
                    <h1 className="text-4xl md:text-5xl font-display font-semibold text-white mb-5 leading-tight tracking-tight">
                        The structural difference between a brokerage website and brokerage infrastructure
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-text mb-12 pb-8 border-b border-border-divider/40">
                        <span>Architecture Notes</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>6 min read</span>
                    </div>
                </motion.div>

                {/* Article Body */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="prose-custom">

                    <p className="text-xl text-soft-text leading-relaxed mb-8">
                        Most brokerage firms have a website. Very few have infrastructure. These are not the same thing — and understanding the difference is one of the clearest competitive separators in the independent advisory market.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">What a brokerage website actually does</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        A brokerage website, in its typical form, performs one function: it communicates that your firm exists. It has your logo, a list of your services, some advisor bios, and a contact form. That contact form goes to someone's inbox. What happens next depends entirely on whoever is watching that inbox.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        This is not a criticism of any specific design choice. It is a description of how most brokerage web presences were built — and why they create the same operational problem at every firm: unstructured inbound.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        When a seller submits an inquiry through a contact form, your team receives: a name, an email, and whatever that person chose to write in a free-text box. You receive no financials. No indication of business type, industry, or transaction size. No signal of timeline or motivation. Your advisor then spends the first 30–60 minutes of every seller relationship doing intake — gathering information that a structured system could have captured automatically before the conversation started.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">What infrastructure actually means</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        Brokerage infrastructure is a different category of system. It is the operational layer that sits behind your public presence and handles what happens when someone engages with your firm.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        When a seller expresses interest, infrastructure means: they are immediately routed into a structured intake flow that captures the specific financial and business information your advisors need before any conversation. That information is normalized, benchmarked against your mandate criteria, and surfaced to the right advisor — complete, organized, and ready to evaluate.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        When a buyer inquires about a listing, infrastructure means: they receive an immediate, automated response with a listing-specific NDA. Once signed, they gain gated access to the CIM. Their activity — how many times they've viewed the document, which sections they've focused on — is tracked and surfaced to your advisors.
                    </p>

                    <div className="bg-[#141414] border border-white/5 rounded-xl p-6 my-10">
                        <p className="text-white font-semibold mb-3">The critical distinction:</p>
                        <p className="text-soft-text leading-relaxed">
                            A website creates an impression. Infrastructure creates a process. The firms that operate at institutional levels don't just look different — they function differently. The infrastructure is what allows them to handle 50 listings simultaneously without their advisors being buried in administrative work.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">The operational gap for independent brokerages</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        Independent and boutique brokerages are caught in a difficult position. They are competing for mandates against firms that project institutional credibility — but they are typically running on a technology stack that was never designed for deal flow. Generic CRM tools. Separate e-signature platforms. Document management through email folders. A website that generates unvetted inquiries.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        Each of these tools works, in isolation. The problem is the integration layer — or the absence of one. When a buyer inquiry comes in, someone has to manually pull information from multiple places, track which NDA has been sent, confirm that the right CIM was attached, and ensure the relevant advisor was notified. That coordination overhead compounds as deal volume grows.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-12 mb-4">What closing this gap looks like in practice</h2>
                    <p className="text-soft-text leading-relaxed mb-6">
                        A centralized operational backend for a brokerage replaces the manual coordination layer. It is not simply a better CRM or a more polished website. It is a unified system that connects intake, qualification, document management, listing infrastructure, and advisor routing into a single operational engine.
                    </p>
                    <p className="text-soft-text leading-relaxed mb-6">
                        The visible result is that your firm projects the kind of credibility that institutional operations produce — because the operations are actually institutional. The invisible result is that your advisors spend their time on deals rather than coordination.
                    </p>
                    <p className="text-soft-text leading-relaxed">
                        This is the structural difference between a brokerage website and brokerage infrastructure. One tells people you exist. The other determines how effectively your firm operates once they engage.
                    </p>
                </motion.div>

                <ArticleCTA />

                {/* Next article */}
                <div className="mt-12 pt-8 border-t border-border-divider/30">
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Next Article</p>
                    <Link to="/resources/valuation-funnels" className="group flex items-start gap-4 hover:opacity-80 transition-opacity">
                        <div className="flex-grow">
                            <p className="text-sm text-brand-accent mb-1">Insight</p>
                            <h4 className="text-white font-semibold leading-snug group-hover:text-brand-accent transition-colors">Why preliminary valuation funnels matter for brokers</h4>
                        </div>
                        <ArrowRight size={18} className="text-muted-text group-hover:text-brand-accent group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                    </Link>
                </div>

            </div>
        </Section>
    );
};
