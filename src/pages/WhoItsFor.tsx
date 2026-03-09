
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';
import { Building, Users, Briefcase, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const audiences = [
  {
    icon: Building,
    num: '01',
    title: 'Mid-Market M&A Firms',
    description: 'Boutique investment banks handling $10M–$100M+ transactions. You need infrastructure that matches the sophistication of your clients and deals.',
    pain: 'Currently losing mandates because your digital presence and technology stack looks like a main street brokerage.',
    metric: '10–100+ deal mandates annually'
  },
  {
    icon: Briefcase,
    num: '02',
    title: 'High-Volume Business Brokerages',
    description: 'Firms processing 50+ listings annually. You need automated workflows to prevent your advisors from drowning in administrative tasks and manual data entry.',
    pain: 'Currently bottlenecked by manual NDAs, fractured buyer communication, and disjointed CRM routing.',
    metric: '50+ active listings managed'
  },
  {
    icon: Users,
    num: '03',
    title: 'Independent M&A Advisors',
    description: 'Solo practitioners or small partnerships competing against larger firms. BrokerageOS acts as your digital back-office, allowing you to operate like a 50-person firm.',
    pain: 'Currently spending 60% of your week on administration instead of deal making and origination.',
    metric: 'Replaces 3–5 software tools'
  }
];

const notForList = [
  'Real estate brokerages or property management firms',
  'Single-advisor practices without recurring deal flow',
  'Lifestyle consultants or business coaches',
  'Firms not focused on business acquisitions or M&A',
];

export const WhoItsFor = () => {
  return (
    <Section className="pt-32 pb-20 relative overflow-hidden" container={false}>
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-divider bg-white/5 mb-8"
          >
            <span className="text-sm font-medium text-soft-text">Exclusive Audience</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-[64px] font-display font-semibold text-white mb-6 tracking-tight leading-tight"
          >
            Who We Serve
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-text max-w-2xl mx-auto leading-relaxed"
          >
            BrokerageOS is exclusively designed for professional business intermediaries who operate in the lower middle market and above.
          </motion.p>
        </div>

        {/* Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {audiences.map((audience, i) => {
            const Icon = audience.icon;
            return (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col bg-[#141414] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/15 transition-all duration-300"
              >
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-brand-accent/60 to-transparent" />

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-accent/30 group-hover:bg-brand-accent/5 transition-colors">
                      <Icon className="text-brand-accent" size={28} />
                    </div>
                    <span className="text-3xl font-display font-semibold text-white/10">{audience.num}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-4">{audience.title}</h3>
                  <p className="text-muted-text leading-relaxed flex-grow mb-6">{audience.description}</p>

                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-brand-accent/80 uppercase tracking-widest mb-1 block">Current Pain</span>
                      <p className="text-sm text-soft-text leading-relaxed">{audience.pain}</p>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[10px] font-bold text-success-accent/80 uppercase tracking-widest mb-1 block">Scope</span>
                      <p className="text-sm text-white font-medium">{audience.metric}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* "Not For" Exclusion Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">Not the right fit</h3>
                <p className="text-muted-text leading-relaxed mb-6">
                  BrokerageOS is a precision infrastructure platform. We are selective about who we deploy to because each installation is bespoke. If you fall into any of the following categories, we are not the right solution.
                </p>
                <ul className="space-y-3">
                  {notForList.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-soft-text text-sm leading-relaxed">
                      <div className="w-5 h-5 shrink-0 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mt-0.5">
                        <X size={11} className="text-red-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-px md:bg-border-divider hidden md:block" />
              <div className="shrink-0 md:w-64 flex flex-col justify-center text-center md:text-left">
                <p className="text-muted-text text-sm mb-6 leading-relaxed">If you're running an active M&A or business brokerage firm, we want to speak with you.</p>
                <Link to="/book-review">
                  <button className="inline-flex items-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-5 py-3 rounded-lg text-sm hover:brightness-110 transition-all group w-full justify-center">
                    Determine Your Fit
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </Section>
  );
};
