
import { useState } from 'react';
import { Section } from '../components/ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  { category: 'Implementation', q: 'How long does deployment take?', a: 'We deploy the entire architecture—including your custom website, pre-valuation engines, and CRM integrations—within 14 business days. This is a complete "done-for-you" installation.' },
  { category: 'Implementation', q: 'Do I need a technical team to manage it?', a: 'No. BrokerageOS is fully managed infrastructure. We handle all hosting, security, and updates. Your team simply logs in and uses the tools to close deals.' },
  { category: 'Product & Features', q: 'Can the valuation funnel handle our specific industry multiples?', a: 'Absolutely. The logic engine is customized during onboarding. You provide your proprietary multiples for specific industries, and the algorithm applies them dynamically based on seller inputs.' },
  { category: 'Product & Features', q: 'Does this replace my CRM?', a: 'BrokerageOS integrates with your CRM. It acts as the routing and data ingestion layer—qualifying buyers and sellers—then pushes clean, actionable data directly into Salesforce, HubSpot, or whichever system you use.' },
  { category: 'Security & Compliance', q: 'How secure is the data room and NDA process?', a: 'Bank-grade. We utilize SOC2-compliant data centers, end-to-end encryption for all seller documents, and legally binding, one-click eSignatures that generate comprehensive audit trails.' }
];

const categories = ['All', 'Implementation', 'Product & Features', 'Security & Compliance'];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <Section className="pt-32 pb-20 relative overflow-hidden" container={false}>
      <div className="absolute top-[10%] right-0 w-[400px] h-[400px] bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-divider bg-white/5 mb-8">
            <span className="text-sm font-medium text-soft-text">Common Questions</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-5xl md:text-[64px] font-display font-semibold text-white mb-6 tracking-tight leading-tight">
            Frequently Asked
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-text max-w-2xl mx-auto leading-relaxed">
            Answers to common questions about deploying institutional infrastructure inside your brokerage.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <div className="md:w-52 shrink-0">
            <div className="sticky top-28 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">Categories</p>
              {categories.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === cat ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20' : 'text-soft-text hover:text-white hover:bg-white/5 border border-transparent'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div className="flex-grow space-y-3">
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-3">
                {filtered.map((faq, i) => {
                  const isOpen = openIndex === i;
                  return (
                    <motion.div key={faq.q} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      className={`rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${isOpen ? 'border-brand-accent/30 bg-white/[0.04]' : 'border-white/5 bg-[#141414] hover:bg-white/[0.03] hover:border-white/10'}`}
                      onClick={() => setOpenIndex(isOpen ? null : i)}>
                      <div className="p-5 md:p-6 flex items-start justify-between gap-6">
                        <div>
                          <span className="text-brand-accent/70 text-[10px] font-bold uppercase tracking-widest mb-2 block">{faq.category}</span>
                          <h3 className={`text-base md:text-lg font-medium transition-colors ${isOpen ? 'text-white' : 'text-soft-text'}`}>{faq.q}</h3>
                        </div>
                        <div className={`mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-brand-accent text-black' : 'bg-white/5 text-muted-text'}`}>
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                            <div className="px-5 md:px-6 pb-5 md:pb-6 text-soft-text leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto mt-20 text-center bg-[#141414] border border-white/5 rounded-2xl p-10 md:p-14">
          <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">Still have questions?</h3>
          <p className="text-muted-text mb-8 max-w-md mx-auto leading-relaxed">Book an infrastructure conversation and speak directly with our deployment team. No sales pitch — just a technical discussion of your firm's needs.</p>
          <Link to="/book-review">
            <button className="inline-flex items-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-7 py-3.5 rounded-xl text-sm hover:brightness-110 transition-all group">
              Book an Infrastructure Conversation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
};
