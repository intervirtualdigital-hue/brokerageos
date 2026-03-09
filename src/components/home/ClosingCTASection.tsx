
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClosingCTASection = () => {
    return (
        <Section className="bg-[#050505] border-t border-border-divider relative overflow-hidden" container={false}>
            {/* Ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[400px] bg-brand-accent/8 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Decorative line */}
                    <div className="flex items-center gap-4 mb-12 justify-center">
                        <div className="h-px flex-grow max-w-24 bg-gradient-to-r from-transparent to-border-divider" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">BrokerageOS</span>
                        <div className="h-px flex-grow max-w-24 bg-gradient-to-l from-transparent to-border-divider" />
                    </div>

                    <h2 className="text-5xl md:text-[64px] font-display font-semibold text-white mb-6 leading-tight tracking-tight text-balance">
                        Your Brokerage Should Operate Like a Firm<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#FFF5C3]">
                            That's Been Doing This for Decades.
                        </span>
                    </h2>

                    <p className="text-xl text-muted-text mb-4 max-w-2xl mx-auto leading-relaxed">
                        BrokerageOS installs the infrastructure that makes that possible — structured intake, qualified deal flow, and a platform that positions your firm as a serious place to do business.
                    </p>

                    <p className="text-lg text-soft-text mb-12 max-w-2xl mx-auto leading-relaxed">
                        Most firms at your level are still running on static websites and manual follow-up. The ones who move first build an operational advantage that compounds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <Link to="/book-review">
                            <button className="inline-flex items-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-8 py-4 rounded-xl text-base hover:brightness-110 transition-all group">
                                Book an Infrastructure Review
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link to="/system">
                            <button className="inline-flex items-center gap-2 border border-white/15 text-soft-text hover:text-white hover:border-white/30 font-medium px-8 py-4 rounded-xl text-base transition-all">
                                Explore Architecture
                            </button>
                        </Link>
                    </div>

                    <p className="text-sm text-muted-text">
                        30 minutes. We'll show you exactly where your current setup is losing opportunities.
                    </p>
                </motion.div>
            </div>
        </Section>
    );
};
