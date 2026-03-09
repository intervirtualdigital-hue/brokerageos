
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';
import { Filter, ShieldCheck, FileSignature, Building2, Bot, Network, LayoutTemplate, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const moduleDetails = [
  {
    icon: Filter,
    num: '01',
    title: 'Pre-Valuation Funnel',
    description: 'Stop guessing on introductory calls. This funnel automatically ingests seller financials, applies your proprietary multiples, and generates a dynamic valuation range report before you even speak.',
    features: ['Automated TTM Parsing', 'Dynamic Multiple Logic', 'Branded Output Generation']
  },
  {
    icon: ShieldCheck,
    num: '02',
    title: 'Buyer Qualification',
    description: 'Systematic vetting of buyer liquidity, acquisition experience, and expected timeline to ensure you—and your sellers—only engage with serious inquiries.',
    features: ['Proof of Funds Verification', 'Experience Scoring', 'Automated Rejections']
  },
  {
    icon: FileSignature,
    num: '03',
    title: 'NDA Automation',
    description: 'Zero-touch digital signatures for prospective buyers. When a buyer inquires about a teaser, they are automatically routed an NDA specific to that listing. Once signed, the CIM is instantly unlocked.',
    features: ['One-Click Execution', 'Audit Trails', 'Auto-CIM Delivery']
  },
  {
    icon: Building2,
    num: '04',
    title: 'Listings Infrastructure',
    description: 'A centralized database for all active mandates. Generate beautiful, mobile-optimized blind teasers and manage gated access to confidential information memorandums (CIMs).',
    features: ['Blind Teaser Generation', 'Gated CIM Access', 'Buyer Activity Tracking']
  },
  {
    icon: Bot,
    num: '05',
    title: 'AI Assistant',
    description: '24/7 intelligent routing and Q&A for basic buyer inquiries. Trained on your specific active listings to handle top-of-funnel questions and qualify leads while you sleep.',
    features: ['24/7 Availability', 'Listing-Specific Knowledge', 'Lead Qualification']
  },
  {
    icon: Network,
    num: '06',
    title: 'CRM Routing Engine',
    description: 'Intelligent assignment rules that route qualified buyers and potential sellers to the right advisor on your team based on deal size, industry, or geography.',
    features: ['Rules-Based Assignment', 'Round-Robin Distribution', 'Salesforce/HubSpot Integration']
  },
  {
    icon: LayoutTemplate,
    num: '07',
    title: 'Institutional Website',
    description: 'A premium, high-converting digital storefront designed specifically for M&A and business brokerages. Built for speed, credibility, and conversion.',
    features: ['Premium Dark Aesthetic', 'Lightning Fast Speeds', 'Optimized Conversion Paths']
  }
];

export const Modules = () => {
  return (
    <Section className="pt-32 pb-20 relative overflow-hidden" container={false}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-success-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-divider bg-white/5 mb-8"
          >
            <span className="text-sm font-medium text-soft-text">7 Core Modules</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-[64px] font-display font-semibold text-white mb-6 tracking-tight leading-tight"
          >
            The Operating Modules
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-text max-w-2xl mx-auto leading-relaxed"
          >
            Each module is a precision-built engine. Together they form a complete operating system for your brokerage. No patchwork integrations. No manual workarounds.
          </motion.p>
        </div>

        {/* Module List */}
        <div className="max-w-5xl mx-auto flex flex-col gap-4 mb-20">
          {moduleDetails.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.06 }}
                className="group bg-[#141414] border border-white/5 rounded-2xl p-6 md:p-8 flex gap-6 md:gap-10 items-start hover:border-white/15 transition-all duration-300"
              >
                {/* Number + Icon */}
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-accent/30 group-hover:bg-brand-accent/5 transition-colors">
                    <Icon className="text-brand-accent" size={24} />
                  </div>
                  <span className="text-[11px] font-bold text-white/20 uppercase tracking-widest">{mod.num}</span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-brand-accent transition-colors">{mod.title}</h3>
                  <p className="text-muted-text leading-relaxed mb-5">{mod.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {mod.features.map(feat => (
                      <span key={feat} className="inline-flex items-center gap-1.5 text-xs font-medium text-soft-text bg-white/5 border border-white/5 rounded-full px-3 py-1">
                        <span className="w-1 h-1 rounded-full bg-brand-accent" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex shrink-0 items-center self-center">
                  <ArrowRight className="w-5 h-5 text-white/10 group-hover:text-brand-accent group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/book-review">
            <button className="inline-flex items-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-8 py-4 rounded-xl text-base hover:brightness-110 transition-all group">
              Book an Infrastructure Review
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

      </div>
    </Section>
  );
};
