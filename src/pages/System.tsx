
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';
import { Database, Network, Shield, Workflow, Webhook, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const architectureNodes = [
  {
    step: '01',
    icon: Webhook,
    title: 'Data Ingestion Layer',
    description: 'Captures all inbound seller submissions and buyer inquiries via API connected to your primary web properties.',
    detail: 'Every form submission, email inquiry, and referral is normalized into a consistent data model the moment it enters the system.',
    status: 'Active'
  },
  {
    step: '02',
    icon: Workflow,
    title: 'Processing Engine',
    description: 'Normalizes financial data from submitted trailing twelve months (TTM) statements and automatically flags incomplete submissions.',
    detail: 'Applies your proprietary industry multiples to generate a preliminary valuation range without advisor intervention.',
    status: 'Active'
  },
  {
    step: '03',
    icon: Shield,
    title: 'Security & Auth',
    description: 'Manages one-click NDA execution and secure vault access generation for verified buyers.',
    detail: 'SOC2-compliant, end-to-end encrypted document handling with legally binding eSignature audit trails.',
    status: 'Active'
  },
  {
    step: '04',
    icon: Database,
    title: 'Central Listing DB',
    description: 'The single source of truth for active mandates, CIMs, and preliminary pricing models.',
    detail: 'Gated access tiers ensure buyers only see what they are authorized to see based on NDA status and qualification score.',
    status: 'Active'
  },
];

const dataFlowSteps = [
  'Inbound', 'Ingestion', 'Normalization', 'Routing', 'Advisor', 'Close'
];

const integrations = ['Salesforce', 'HubSpot', 'Stripe', 'DocuSign', 'AWS S3', 'Zapier'];

export const System = () => {
  return (
    <Section className="pt-32 pb-20 overflow-hidden relative" container={false}>
      {/* Background ambient glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-accent/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[400px] h-[400px] bg-success-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-divider bg-white/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-sm font-medium text-soft-text">Architecture Overview</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-[64px] font-display font-semibold text-white mb-6 tracking-tight leading-tight"
          >
            System Architecture
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-text max-w-2xl mx-auto leading-relaxed"
          >
            BrokerageOS is not a disjointed collection of apps. It is a singular, productized engine designed to handle institutional deal flow from first inquiry to signed LOI.
          </motion.p>
        </div>

        {/* Data Flow Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="max-w-4xl mx-auto mb-24 bg-[#141414] border border-white/5 rounded-2xl p-6 md:p-8"
        >
          <div className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-6 text-center">System Data Flow</div>
          <div className="flex items-center justify-between gap-2">
            {dataFlowSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div className="flex-1 text-center">
                  <div className="text-[11px] md:text-sm font-medium text-white/70 mb-2">{step}</div>
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-brand-accent/60 to-brand-accent/20" style={{ opacity: 1 - i * 0.08 }} />
                </div>
                {i < dataFlowSteps.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-white/20 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Architecture Nodes */}
        <div className="max-w-5xl mx-auto mb-24 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[28px] top-8 bottom-8 w-px bg-gradient-to-b from-brand-accent/30 via-brand-accent/10 to-transparent hidden md:block" />

          <div className="flex flex-col gap-8">
            {architectureNodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-6 md:gap-10 items-start group"
                >
                  {/* Step indicator */}
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-white/10 flex flex-col items-center justify-center gap-0.5 group-hover:border-brand-accent/30 transition-colors relative z-10">
                    <span className="text-[10px] font-bold text-brand-accent/60 uppercase tracking-widest">{node.step}</span>
                    <Icon size={18} className="text-brand-accent" />
                  </div>

                  {/* Content */}
                  <div className="flex-grow bg-[#141414] border border-white/5 rounded-2xl p-6 md:p-8 group-hover:border-white/15 transition-colors">
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                      <h3 className="text-xl md:text-2xl font-semibold text-white">{node.title}</h3>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success-accent/10 border border-success-accent/20 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-success-accent animate-pulse" />
                        <span className="text-xs text-success-accent font-medium uppercase tracking-wider">{node.status}</span>
                      </div>
                    </div>
                    <p className="text-soft-text leading-relaxed mb-4">{node.description}</p>
                    <p className="text-muted-text text-sm leading-relaxed border-t border-white/5 pt-4">{node.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Integration Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl border border-border-divider bg-[#141414] backdrop-blur-xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div className="text-center md:text-left flex-1">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 mx-auto md:mx-0">
                <Network className="text-brand-accent w-7 h-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-3">API-First Connectivity</h2>
              <p className="text-muted-text leading-relaxed">
                While BrokerageOS replaces 80% of your stack, it seamlessly pipes data into your existing enterprise tools via secure webhooks and native integrations.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-end shrink-0">
              {integrations.map(tool => (
                <span key={tool} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-soft-text text-sm font-medium hover:border-brand-accent/30 hover:text-white transition-colors">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border-divider/50 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/book-review">
              <button className="inline-flex items-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-6 py-3 rounded-lg text-sm hover:brightness-110 transition-all">
                Book an Architecture Review <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/modules" className="text-sm text-soft-text hover:text-white transition-colors">
              Explore individual modules →
            </Link>
          </div>
        </motion.div>

      </div>
    </Section>
  );
};
