
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { AlertCircle } from 'lucide-react';

const painPoints = [
    'Seller leads arrive incomplete, forcing brokers to chase missing information',
    'Buyer inquiries aren\'t qualified before reaching your advisors',
    'NDAs, documents, and follow-ups are managed manually across inboxes',
    'Your online presence looks like a brochure, not a professional advisory firm',
];

export const ComparisonSection = () => {
    return (
        <Section className="bg-[#050505] relative z-10">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-5xl md:text-[64px] font-display font-semibold text-white mb-6 leading-tight tracking-tight"
                    >
                        The Gap Between You and the<br />Firms Buyers Trust Most
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-muted-text text-[20px] max-w-3xl mx-auto leading-relaxed mb-8"
                    >
                        Buyers and sellers make decisions based on perception before they ever speak to an advisor. A static website, an unstructured inquiry form, a slow follow-up — these don't just lose deals. They signal that your firm isn't ready for serious business.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                        className="text-soft-text text-lg max-w-3xl mx-auto leading-relaxed"
                    >
                        The difference between an institutional brokerage and an unknown one is rarely the quality of their advisors. It's the infrastructure behind how they operate.
                    </motion.p>
                </div>

                {/* Pain Point List */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden"
                >
                    <div className="px-7 py-5 border-b border-white/5 flex items-center gap-3">
                        <AlertCircle size={16} className="text-red-400/80 shrink-0" />
                        <span className="text-sm font-semibold text-soft-text">Most independent brokerages are running on tools that were never designed for deal flow:</span>
                    </div>
                    <div className="divide-y divide-white/5">
                        {painPoints.map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.05 * i }}
                                className="flex items-start gap-4 px-7 py-5 hover:bg-white/[0.015] transition-colors"
                            >
                                <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center shrink-0 mt-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                                </div>
                                <span className="text-soft-text text-base leading-relaxed">{point}</span>
                            </motion.div>
                        ))}
                    </div>
                    <div className="px-7 py-5 border-t border-brand-accent/15 bg-brand-accent/[0.02]">
                        <p className="text-sm text-soft-text leading-relaxed">
                            BrokerageOS replaces that fragmented foundation with a system built specifically for how business brokerages operate.
                        </p>
                    </div>
                </motion.div>

            </div>
        </Section>
    );
};
