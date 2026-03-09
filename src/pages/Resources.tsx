
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const resources = [
  {
    type: 'Architecture Notes',
    title: 'The structural difference between a brokerage website and brokerage infrastructure',
    description: 'Why a basic marketing presence is insufficient for modern M&A, and what a centralized operational backend looks like in practice.',
    readTime: '6 min read',
    featured: true,
    href: '/resources/architecture-difference',
  },
  {
    type: 'Insight',
    title: 'Why preliminary valuation funnels matter for brokers',
    description: 'A breakdown of how automated intake workflows capture seller financials and generate valuation ranges before the first advisor conversation.',
    readTime: '4 min read',
    featured: false,
    href: '/resources/valuation-funnels',
  },
  {
    type: 'Insight',
    title: 'How buyer qualification protects deal flow',
    description: 'An analysis of systematic vetting for buyer liquidity and experience, ensuring advisors only spend time on serious inquiries.',
    readTime: '5 min read',
    featured: false,
    href: '/resources/buyer-qualification',
  },
  {
    type: 'Insight',
    title: 'Why NDA automation reduces friction in early conversations',
    description: 'Examining the impact of zero-touch digital signatures for prospective buyers, directly tied to specific active listings.',
    readTime: '3 min read',
    featured: false,
    href: '/resources/nda-automation',
  },
];

const typeColors: Record<string, string> = {
  'Architecture Notes': 'text-brand-accent bg-brand-accent/10 border-brand-accent/20',
  'Insight': 'text-soft-text bg-white/5 border-white/10',
};

export const Resources = () => {
  const featured = resources.find(r => r.featured);
  const list = resources.filter(r => !r.featured);

  return (
    <Section className="pt-32 pb-32 relative overflow-hidden" container={false}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-divider bg-white/5 mb-8"
          >
            <span className="text-sm font-medium text-soft-text">Published Thinking</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-[64px] font-display font-semibold text-white mb-6 tracking-tight leading-tight"
          >
            Insights &<br />Architecture
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-text max-w-2xl leading-relaxed"
          >
            Brief institutional insights on system architecture and operational friction in modern brokerage firms.
          </motion.p>
        </div>

        {/* Featured Article */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-12"
          >
            <Link to={featured.href} className="group block">
              <div className="bg-[#141414] border border-white/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16 items-start hover:border-white/15 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 blur-[80px] rounded-full pointer-events-none" />
                <div className="flex-grow relative z-10">
                  <span className={`inline-flex text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border mb-5 ${typeColors[featured.type]}`}>
                    {featured.type}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4 leading-snug group-hover:text-brand-accent transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted-text leading-relaxed mb-6">{featured.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-soft-text">{featured.readTime}</span>
                    <span className="text-sm font-medium text-brand-accent flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Read Strategy <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
                <div className="hidden md:flex shrink-0 w-56 h-40 rounded-xl bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/10 items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col justify-center px-5 gap-2">
                    <div className="h-1.5 w-full bg-brand-accent/30 rounded-full" />
                    <div className="h-1.5 w-3/4 bg-white/10 rounded-full" />
                    <div className="h-1.5 w-full bg-white/10 rounded-full" />
                    <div className="h-px w-full bg-white/5 my-2" />
                    <div className="h-1.5 w-2/3 bg-brand-accent/20 rounded-full" />
                    <div className="h-1.5 w-full bg-white/5 rounded-full" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Editorial List */}
        <div className="border-t border-border-divider/30">
          <div className="grid grid-cols-12 gap-4 py-3 px-2">
            <div className="col-span-2 text-[10px] uppercase tracking-widest text-white/30 font-semibold hidden md:block">Format</div>
            <div className="col-span-12 md:col-span-7 text-[10px] uppercase tracking-widest text-white/30 font-semibold">Topic</div>
            <div className="col-span-3 text-[10px] uppercase tracking-widest text-white/30 font-semibold hidden md:block text-right">Read Time</div>
          </div>

          {list.map((resource, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link to={resource.href} className="group border-t border-border-divider/20 grid grid-cols-12 gap-4 py-6 px-2 items-start hover:bg-white/[0.02] rounded-lg transition-colors block">
                <div className="col-span-12 md:col-span-2 mb-2 md:mb-0">
                  <span className={`inline-flex text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${typeColors[resource.type]}`}>
                    {resource.type}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-accent transition-colors leading-snug">{resource.title}</h3>
                  <p className="text-sm text-muted-text leading-relaxed">{resource.description}</p>
                </div>
                <div className="col-span-12 md:col-span-3 flex md:justify-end items-start gap-3 mt-2 md:mt-0">
                  <span className="text-sm text-soft-text">{resource.readTime}</span>
                  <ArrowUpRight size={16} className="text-white/20 group-hover:text-brand-accent transition-colors shrink-0 mt-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </Section>
  );
};
