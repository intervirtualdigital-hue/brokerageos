
import { useState } from 'react';
import { Section } from '../components/ui/Section';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Layers, ArrowRight, Building2 } from 'lucide-react';

const trustSignals = [
  { label: '45 Minutes', sub: 'No sales pressure' },
  { label: 'No Commitment', sub: 'Exploratory only' },
  { label: 'Confidential', sub: 'NDA available' },
  { label: 'Roadmap Delivered', sub: 'After call' },
];

const valueProps = [
  { icon: Clock, title: '45-Minute Strategic Session', desc: 'No high-pressure sales. A technical walkthrough of architecture matched to your current operational setup.' },
  { icon: Layers, title: 'Custom Migration Plan', desc: 'Detailed roadmap for migrating off your disjointed legacy tools—specific to your firm size and deal volume.' },
  { icon: ShieldCheck, title: 'Strict Confidentiality', desc: 'All discussions and current operational metrics remain strictly private. NDA available on request.' },
  { icon: Building2, title: 'Infrastructure Roadmap Delivered', desc: 'You leave the call with a documented infrastructure plan for your brokerage, regardless of whether you proceed.' },
];

export const BookReview = () => {
  const [formData, setFormData] = useState({ name: '', firm: '', volume: '', tools: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section className="pt-32 pb-32 relative overflow-hidden" container={false}>
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-success-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">

          {/* Left Column */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-accent/20 bg-brand-accent/5 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-sm font-medium text-brand-accent">Exclusive Access</span>
              </div>
              <h1 className="text-5xl md:text-[60px] font-display font-semibold text-white mb-6 leading-tight tracking-tight">
                Schedule your<br />Infrastructure Review
              </h1>
              <p className="text-xl text-muted-text max-w-xl leading-relaxed">
                We'll analyze your current technology stack, identify deal flow bottlenecks, and map out exactly how BrokerageOS fits inside your operations.
              </p>
            </motion.div>

            <div className="space-y-6 mb-10">
              {valueProps.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-start gap-5">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <item.icon className="text-brand-accent" size={22} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-text leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust signals */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {trustSignals.map(ts => (
                <div key={ts.label} className="bg-[#141414] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-sm font-semibold text-white mb-0.5">{ts.label}</div>
                  <div className="text-[11px] text-muted-text">{ts.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/8 blur-[80px] rounded-full pointer-events-none" />

              {submitted ? (
                <div className="relative z-10 text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-success-accent/10 border border-success-accent/30 flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="text-success-accent w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Application Received</h3>
                  <p className="text-muted-text leading-relaxed max-w-sm mx-auto">Our team will review your application and reach out within 1 business day to schedule your session.</p>
                </div>
              ) : (
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-white mb-2">Request Deployment Access</h3>
                  <p className="text-sm text-muted-text mb-8">We onboard a limited number of brokerages each month. Please complete the form below.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { id: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text' },
                      { id: 'firm', label: 'Firm Name', placeholder: 'Your brokerage or firm', type: 'text' },
                    ].map(field => (
                      <div key={field.id}>
                        <label htmlFor={field.id} className="block text-xs font-semibold text-soft-text uppercase tracking-wider mb-1.5">{field.label}</label>
                        <input id={field.id} type={field.type} placeholder={field.placeholder} required
                          value={formData[field.id as keyof typeof formData]}
                          onChange={e => setFormData(p => ({ ...p, [field.id]: e.target.value }))}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors" />
                      </div>
                    ))}

                    <div>
                      <label htmlFor="volume" className="block text-xs font-semibold text-soft-text uppercase tracking-wider mb-1.5">Annual Deal Volume</label>
                      <select id="volume" required value={formData.volume} onChange={e => setFormData(p => ({ ...p, volume: e.target.value }))}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-accent/50 transition-colors appearance-none">
                        <option value="" disabled>Select range...</option>
                        <option value="under5m">Under $5M</option>
                        <option value="5m-25m">$5M – $25M</option>
                        <option value="25m-100m">$25M – $100M</option>
                        <option value="over100m">$100M+</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="tools" className="block text-xs font-semibold text-soft-text uppercase tracking-wider mb-1.5">Current Tools in Use</label>
                      <input id="tools" type="text" placeholder="e.g. HubSpot, Docusign, custom forms..."
                        value={formData.tools} onChange={e => setFormData(p => ({ ...p, tools: e.target.value }))}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-soft-text uppercase tracking-wider mb-1.5">Primary Challenge (Optional)</label>
                      <textarea id="message" rows={3} placeholder="Describe the biggest bottleneck in your current deal flow..."
                        value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors resize-none" />
                    </div>

                    <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-6 py-4 rounded-xl text-base hover:brightness-110 transition-all group mt-2">
                      Submit Application
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[11px] text-muted-text text-center">By submitting, you agree to our privacy policy. All information is confidential.</p>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
