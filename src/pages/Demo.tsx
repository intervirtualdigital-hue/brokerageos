
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: 'Seller Submits Inquiry',
    description: 'The intake system captures 32 structured data points — business type, revenue, EBITDA, reason for sale — before any advisor is involved.',
    detail: 'No manual emails. No unstructured calls.',
  },
  {
    num: '02',
    title: 'Valuation Engine Activates',
    description: 'Financial data is normalized and run through your proprietary multiple logic. A preliminary valuation range ($X – $Y) is generated automatically.',
    detail: 'Seller sees a branded output. Advisor sees a clean data package.',
  },
  {
    num: '03',
    title: 'NDA Auto-Dispatched to Vetted Buyers',
    description: 'Buyers who match the listing parameters receive a listing-specific NDA via DocuSign. Once signed, the CIM is instantly unlocked in the data room.',
    detail: 'Zero administrative intervention required.',
  },
  {
    num: '04',
    title: 'Advisor Assigned via Routing Engine',
    description: 'Deal size, industry type, and geography trigger automatic assignment rules. The right advisor receives a complete brief — not a raw inquiry.',
    detail: 'No more round-robin chaos or dropped leads.',
  },
];

export const Demo = () => {
  return (
    <Section className="pt-32 pb-20 relative overflow-hidden" container={false}>
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-accent/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-divider bg-white/5 mb-8">
            <span className="text-sm font-medium text-soft-text">Architecture Walkthrough</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-5xl md:text-[64px] font-display font-semibold text-white mb-6 tracking-tight leading-tight">
            How the System Works
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-text max-w-2xl mx-auto leading-relaxed">
            A step-by-step walkthrough of how BrokerageOS handles a deal from first inquiry to signed LOI — without manual intervention at each stage.
          </motion.p>
        </div>

        {/* Step-by-step diagram */}
        <div className="max-w-4xl mx-auto mb-24 relative">
          {/* Vertical line */}
          <div className="absolute left-7 top-8 bottom-8 w-px bg-gradient-to-b from-brand-accent/40 via-brand-accent/15 to-transparent hidden md:block" />

          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 md:gap-10 items-start group"
              >
                {/* Step badge */}
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-white/10 flex flex-col items-center justify-center gap-0.5 group-hover:border-brand-accent/30 transition-colors relative z-10">
                  <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Step</span>
                  <span className="text-lg font-display font-semibold text-brand-accent leading-none">{step.num}</span>
                </div>

                {/* Card */}
                <div className="flex-grow bg-[#141414] border border-white/5 rounded-2xl p-6 md:p-8 group-hover:border-white/15 transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-soft-text leading-relaxed mb-4">{step.description}</p>
                  <div className="flex items-center gap-2 text-sm text-brand-accent/80 border-t border-white/5 pt-4">
                    <CheckCircle size={14} className="shrink-0" />
                    <span>{step.detail}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security note */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto mb-12 bg-[#141414] border border-white/5 rounded-2xl p-6 flex items-start gap-5">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
            <Lock size={18} className="text-brand-accent" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-white mb-1">Bank-Grade Security Throughout</h4>
            <p className="text-sm text-muted-text leading-relaxed">All data exchanged through BrokerageOS is encrypted end-to-end. SOC2-compliant infrastructure, audit trail logging on all NDA and CIM access events.</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/20 rounded-2xl p-10 md:p-14">
          <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">Ready to install this inside your brokerage?</h3>
          <p className="text-muted-text mb-8 max-w-md mx-auto leading-relaxed">Skip the general reading. Book an infrastructure conversation and get a roadmap built specifically for your firm.</p>
          <Link to="/book-review">
            <button className="inline-flex items-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-8 py-4 rounded-xl text-base hover:brightness-110 transition-all group">
              Book an Infrastructure Review
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

      </div>
    </Section>
  );
};
