
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';
import { ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <Section className="pt-40 pb-32 relative overflow-hidden min-h-[80vh] flex items-center" container={false}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[400px] bg-brand-accent/6 blur-[150px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-divider bg-white/5 mb-8">
                        <span className="text-sm font-medium text-soft-text">Page Not Found</span>
                    </div>

                    <div className="text-[120px] md:text-[180px] font-display font-semibold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent mb-6 select-none">
                        404
                    </div>

                    <h1 className="text-3xl md:text-4xl font-display font-semibold text-white mb-5 tracking-tight">
                        This page doesn't exist.
                    </h1>
                    <p className="text-xl text-muted-text max-w-lg mx-auto mb-12 leading-relaxed">
                        The page you're looking for may have moved or never existed. Head back to the homepage or explore what BrokerageOS installs inside your firm.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/">
                            <button className="inline-flex items-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-7 py-3.5 rounded-xl text-sm hover:brightness-110 transition-all group">
                                <Home size={16} />
                                Back to Homepage
                            </button>
                        </Link>
                        <Link to="/book-review">
                            <button className="inline-flex items-center gap-2 border border-white/15 text-soft-text hover:text-white hover:border-white/30 font-medium px-7 py-3.5 rounded-xl text-sm transition-all group">
                                Book an Infrastructure Review
                                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </Link>
                    </div>

                </motion.div>
            </div>
        </Section>
    );
};
