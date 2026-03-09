
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Eye, Users, Cpu, Zap, TrendingUp } from 'lucide-react';

const outcomes = [
    {
        icon: Eye,
        title: 'Immediate credibility',
        desc: "Your firm's first impression is a structured, professional platform that signals institutional-grade operations before anyone reads a word of your bio.",
        stat: 'Day 1',
        statLabel: 'From First Contact',
    },
    {
        icon: Cpu,
        title: 'Advisors work on deals',
        desc: 'Intake is automated. Qualification happens before conversations begin. Brokers receive complete, structured information — not fragments to reassemble.',
        stat: '80%',
        statLabel: 'Admin Time Eliminated',
    },
    {
        icon: Zap,
        title: 'Nothing falls through',
        desc: 'Every inquiry, listing interaction, and conversation enters one organized system. Nothing lives in someone\'s inbox.',
        stat: '100%',
        statLabel: 'Inquiry Capture Rate',
    },
    {
        icon: TrendingUp,
        title: 'Deals move faster',
        desc: 'NDAs, engagement letters, and document delivery are handled through the platform. Advisors don\'t chase paperwork — the system does it.',
        stat: '< 3min',
        statLabel: 'Avg. NDA Response',
    },
    {
        icon: Users,
        title: 'Growth doesn\'t break process',
        desc: 'Whether adding listings, advisors, or markets, the infrastructure scales without adding operational complexity.',
        stat: '14 Days',
        statLabel: 'Full Deployment',
    },
];

export const AudienceSection = () => {
    return (
        <Section className="bg-[#050505] border-t border-border-divider overflow-hidden">

            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-divider bg-white/4 mb-6"
                >
                    <span className="text-xs font-semibold text-soft-text uppercase tracking-wider">Outcomes</span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-5xl md:text-[64px] font-display font-semibold text-white mb-5 leading-tight tracking-tight"
                >
                    What changes when your<br />infrastructure is right
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                    className="text-muted-text text-xl max-w-2xl mx-auto leading-relaxed"
                >
                    These aren't incremental improvements. Getting infrastructure right changes how your firm is perceived, how your team operates, and how deals progress.
                </motion.p>
            </div>

            {/* 3+2 card grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {outcomes.slice(0, 3).map((outcome, i) => {
                    const Icon = outcome.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-[#141414] border border-white/5 rounded-2xl p-7 flex flex-col gap-4 hover:border-white/10 hover:bg-[#161616] transition-all duration-300 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-brand-accent/12 border border-brand-accent/20 flex items-center justify-center group-hover:bg-brand-accent/20 transition-colors">
                                <Icon size={18} className="text-brand-accent" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white mb-2 leading-snug">{outcome.title}</h3>
                                <p className="text-muted-text text-sm leading-relaxed">{outcome.desc}</p>
                            </div>
                            <div className="mt-auto pt-4 border-t border-white/5 flex items-baseline gap-2">
                                <span className="text-2xl font-display font-bold text-brand-accent">{outcome.stat}</span>
                                <span className="text-xs text-white/30 uppercase tracking-wider">{outcome.statLabel}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom 2 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outcomes.slice(3).map((outcome, i) => {
                    const Icon = outcome.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-[#141414] border border-white/5 rounded-2xl p-7 flex gap-6 items-start hover:border-white/10 hover:bg-[#161616] transition-all duration-300 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-brand-accent/12 border border-brand-accent/20 flex items-center justify-center shrink-0 group-hover:bg-brand-accent/20 transition-colors">
                                <Icon size={18} className="text-brand-accent" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <h3 className="text-base font-semibold text-white leading-snug">{outcome.title}</h3>
                                    <span className="text-brand-accent font-bold text-sm shrink-0">{outcome.stat}</span>
                                </div>
                                <p className="text-muted-text text-sm leading-relaxed">{outcome.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};
