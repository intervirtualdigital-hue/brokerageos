
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { GlassCard } from '../ui/GlassCard';
import { ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';

const pains = [
    { old: 'Static brochure websites', new: 'Institutional Website Framework' },
    { old: 'Manual seller intake', new: 'Preliminary Pre-Valuation Funnel' },
    { old: 'Unqualified buyer inquiries', new: 'Buyer Qualification Engine' },
    { old: 'Manual NDA follow-ups', new: 'Automated NDA Processing' },
    { old: 'Disorganized listing communication', new: 'CRM Routing Engine' },
];

export const PainReplacementSection = () => {
    return (
        <Section className="bg-[#141414] border-y border-border-divider relative overflow-hidden">
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-5xl font-display font-semibold text-white mb-4">
                    What BrokerageOS Replaces
                </h2>
                <p className="text-muted-text max-w-2xl mx-auto text-lg">
                    We upgrade your brokerage from manual workflows to a fully systematized infrastructure layer.
                </p>
            </div>

            <div className="max-w-4xl mx-auto flex flex-col gap-4 relative z-10 px-4 md:px-0">
                {pains.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <GlassCard className="!p-5 md:!p-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
                            <div className="flex items-center justify-center md:justify-end gap-3 w-full md:flex-1 text-muted-text">
                                <span className="font-medium line-through decoration-red-500/50 text-center md:text-right">{item.old}</span>
                                <XCircle className="w-5 h-5 text-red-500 shrink-0 hidden md:block" />
                            </div>

                            <div className="shrink-0 flex items-center justify-center py-2 md:py-0 text-border-divider bg-white/5 rounded-full p-2">
                                <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-3 w-full md:flex-1">
                                <CheckCircle2 className="w-5 h-5 text-success-accent shrink-0 hidden md:block" />
                                <span className="font-medium text-white text-center md:text-left select-none">{item.new}</span>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
