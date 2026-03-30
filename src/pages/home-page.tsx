import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Users, Shield, Zap, TrendingUp, Building2 } from 'lucide-react';
import { getActiveListings, formatCurrency } from '@/data/listings';

const SERVICES = [
  { icon: BarChart3, title: 'Sell-Side Advisory', desc: 'Full-service representation to maximize your exit value.' },
  { icon: Users, title: 'Buyer Matching', desc: 'Qualified buyer sourcing with structured inquiry flow.' },
  { icon: Shield, title: 'Confidential Listings', desc: 'NDA-protected data rooms and blinded marketing.' },
  { icon: Zap, title: 'Process Automation', desc: 'CRM-driven workflows that eliminate manual follow-up.' },
];

const TRUST = [
  { metric: '$120M+', label: 'Deal Volume Advised' },
  { metric: '45+', label: 'Transactions Closed' },
  { metric: '92%', label: 'Close Rate on Mandates' },
  { metric: '< 8 mo', label: 'Average Time to Close' },
];

export default function HomePage() {
  const activeListings = getActiveListings().slice(0, 3);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-gold/[0.03] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-8">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
              Now Accepting Mandates
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
              The Infrastructure Behind
              <span className="block text-brand-gold">Modern Brokerages</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/50 leading-relaxed mb-10 max-w-2xl">
              Stop running your brokerage on spreadsheets and brochure websites.
              BrokerageOS installs the systems that capture, qualify, route, and manage
              every buyer and seller opportunity — seamlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/sell"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-base shadow-[0_0_30px_rgba(197,157,95,0.3)] hover:shadow-[0_0_40px_rgba(197,157,95,0.5)] hover:scale-[1.02] transition-all duration-200"
              >
                Get a Valuation <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/listings"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white font-semibold text-base hover:bg-white/5 hover:border-white/20 transition-all duration-200"
              >
                Browse Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Metrics ────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST.map(t => (
              <div key={t.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-serif font-bold text-brand-gold mb-1">{t.metric}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider font-medium">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">How We Operate</h2>
          <p className="text-white/40 max-w-xl mx-auto">End-to-end brokerage infrastructure — from first inquiry to successful close.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(s => (
            <div key={s.title} className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-gold/20 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-5 group-hover:bg-brand-gold/20 transition-colors">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-white font-bold mb-2">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="text-brand-gold text-sm font-semibold hover:underline inline-flex items-center gap-1">
            Learn more about our advisory process <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Featured Listings ────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">Active Opportunities</h2>
              <p className="text-white/40">Confidential, vetted businesses currently available.</p>
            </div>
            <Link to="/listings" className="text-brand-gold text-sm font-semibold hover:underline inline-flex items-center gap-1 shrink-0">
              View all listings <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeListings.map(listing => (
              <Link
                key={listing.id}
                to={`/listings/${listing.id}`}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-brand-gold/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                    Active
                  </span>
                </div>

                {/* Placeholder Image */}
                <div className="h-40 bg-gradient-to-br from-brand-gold/10 to-transparent flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-white/10" />
                </div>

                <div className="p-6">
                  <p className="text-xs text-brand-gold font-bold uppercase tracking-wider mb-2">{listing.industry}</p>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-gold transition-colors">{listing.title}</h3>
                  <p className="text-sm text-white/40 mb-4">{listing.location}</p>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Revenue</p>
                      <p className="text-sm font-bold text-white">{formatCurrency(listing.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Cash Flow</p>
                      <p className="text-sm font-bold text-white">{formatCurrency(listing.cashflow)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Asking</p>
                      <p className="text-sm font-bold text-brand-gold">{formatCurrency(listing.askingPrice)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ────────────────────────────────── */}
      <section className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              Ready to Move?
            </h2>
            <p className="text-white/40 mb-8">
              Whether you're looking to sell your business or acquire your next one, our team is ready to structure the deal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sell"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold shadow-[0_0_20px_rgba(197,157,95,0.3)] hover:shadow-[0_0_30px_rgba(197,157,95,0.5)] transition-all"
              >
                <TrendingUp className="h-5 w-5" /> I Want to Sell
              </Link>
              <Link
                to="/buy"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-all"
              >
                <Users className="h-5 w-5" /> I Want to Buy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
