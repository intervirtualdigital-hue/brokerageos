import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, Handshake, FileSearch, Scale, Briefcase, BarChart2 } from 'lucide-react';

const PROCESS_STEPS = [
  { num: '01', icon: Target, title: 'Discovery & Valuation', desc: 'We evaluate your business using multiples-based analysis, reviewing financials, market position, and growth trajectory.' },
  { num: '02', icon: FileSearch, title: 'Preparation & Positioning', desc: 'Confidential materials are prepared — CIM, data room, and marketing strategy — all designed to attract qualified buyers.' },
  { num: '03', icon: Handshake, title: 'Buyer Outreach & Qualification', desc: 'We identify and vet strategic and financial buyers, managing NDA execution and structured inquiry.' },
  { num: '04', icon: Scale, title: 'Negotiation & Due Diligence', desc: 'From LOI through due diligence, we manage the process to protect your interests and drive toward close.' },
  { num: '05', icon: Briefcase, title: 'Close & Transition', desc: 'We coordinate legal, financial, and operational handoff to ensure a clean, successful transition.' },
];

const CAPABILITIES = [
  'Sell-Side Advisory & Representation',
  'Confidential Business Valuations',
  'Buyer Outreach & Qualification',
  'Confidential Information Memorandum',
  'Virtual Data Room Setup',
  'NDA & Document Management',
  'LOI & Deal Structuring',
  'Due Diligence Coordination',
  'Transition Planning',
  'Post-Close Support',
];

export default function ServicesPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 lg:pt-24 lg:pb-20">
          <div className="max-w-3xl">
            <p className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-4">Advisory Services</p>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight mb-6">
              Institutional-Grade Brokerage for the Lower Middle Market
            </h1>
            <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
              We represent business owners through the sale process with the structure, discretion,
              and operational excellence typically reserved for larger transactions.
            </p>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────── */}
      <section className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Our Process</h2>
            <p className="text-white/40 max-w-lg mx-auto">A proven 5-phase framework that takes your business from valuation to close.</p>
          </div>

          <div className="space-y-6">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="group relative flex gap-6 p-6 lg:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-gold/20 hover:bg-white/[0.04] transition-all duration-300">
                <div className="shrink-0">
                  <div className="h-14 w-14 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold/20 transition-colors">
                    <step.icon className="h-7 w-7" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-brand-gold/60 font-mono font-bold">{step.num}</span>
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ─────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">Full-Scope Capabilities</h2>
              <p className="text-white/40 leading-relaxed mb-8">
                Every engagement is tailored, but every engagement is built on the same operational infrastructure.
                This ensures consistency, confidentiality, and quality — regardless of deal size.
              </p>
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm shadow-[0_0_20px_rgba(197,157,95,0.3)] hover:shadow-[0_0_30px_rgba(197,157,95,0.5)] transition-all"
              >
                Request a Valuation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div>
              <ul className="space-y-4">
                {CAPABILITIES.map(cap => (
                  <li key={cap} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-gold shrink-0" />
                    <span className="text-white/80">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <BarChart2 className="h-10 w-10 text-brand-gold/30 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Find Out What Your Business Is Worth</h2>
          <p className="text-white/40 mb-8 max-w-xl mx-auto">
            Our preliminary valuation takes 5 minutes and gives you multi-scenario pricing based on current market multiples.
          </p>
          <Link
            to="/sell"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold shadow-[0_0_20px_rgba(197,157,95,0.3)] hover:shadow-[0_0_30px_rgba(197,157,95,0.5)] transition-all"
          >
            Start Free Valuation <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
