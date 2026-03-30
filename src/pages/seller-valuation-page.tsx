import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, BarChart2, CheckCircle, TrendingUp, Loader2, Calculator } from 'lucide-react';
import { createContact, createOpportunity, triggerWebhook } from '@/services/api';
import { FIELDS, TAGS, buildCustomFields, PIPELINES } from '@/config/ghl-config';
import { INDUSTRIES } from '@/data/listings';
import { assignAdvisor } from '@/services/routing';

/* simple valuation logic */
const MULTIPLES: Record<string, [number, number]> = {
  'Technology / SaaS': [3.5, 6.0],
  'Healthcare': [3.0, 5.0],
  'Manufacturing': [2.5, 4.5],
  'E-Commerce': [2.0, 4.0],
  'Professional Services': [2.0, 3.5],
  'Food & Beverage': [2.0, 3.5],
  'Construction': [2.0, 3.5],
  'Logistics': [2.5, 4.0],
  'Real Estate Services': [2.5, 4.0],
  'Other': [2.0, 3.5],
};

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  company: string; industry: string; revenue: string; earnings: string;
  earningsType: string; timeline: string;
}

const INITIAL: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  company: '', industry: '', revenue: '', earnings: '',
  earningsType: 'SDE', timeline: '',
};

export default function SellerValuationPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [valuation, setValuation] = useState<{ low: number; high: number } | null>(null);

  const set = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  const calculateValuation = () => {
    const earnings = parseFloat(form.earnings) || 0;
    const [lo, hi] = MULTIPLES[form.industry] ?? [2, 3.5];
    return { low: Math.round(earnings * lo), high: Math.round(earnings * hi) };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const val = calculateValuation();
    setValuation(val);

    try {
      const revenue = parseFloat(form.revenue) || 0;
      const earnings = parseFloat(form.earnings) || 0;
      const margin = revenue > 0 ? Math.round((earnings / revenue) * 100) : 0;
      const [mLo, mHi] = MULTIPLES[form.industry] ?? [2, 3.5];

      const advisor = assignAdvisor({
        industry: form.industry,
        source: 'seller_valuation_page',
      });

      const contact = await createContact({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        tags: [TAGS.SELLER, TAGS.VALUATION_SUBMITTED],
        customFields: buildCustomFields({
          [FIELDS.valuation_industry]: form.industry,
          [FIELDS.valuation_revenue_ltm]: String(revenue),
          [FIELDS.valuation_earnings]: String(earnings),
          [FIELDS.valuation_earnings_type]: form.earningsType,
          [FIELDS.valuation_margin_percent]: String(margin),
          [FIELDS.valuation_multiple_low]: String(mLo),
          [FIELDS.valuation_multiple_high]: String(mHi),
          [FIELDS.valuation_estimated_low]: String(val.low),
          [FIELDS.valuation_estimated_high]: String(val.high),
          [FIELDS.exit_timeline]: form.timeline,
          [FIELDS.internal_assigned_broker]: advisor.id,
          [FIELDS.lead_source]: 'seller_valuation_page',
          [FIELDS.raw_form_type]: 'seller_valuation',
          [FIELDS.submission_timestamp]: new Date().toISOString(),
        }),
      });

      if (PIPELINES.seller.id && contact?.id) {
        await createOpportunity({
          name: `Valuation — ${form.firstName} ${form.lastName} (${form.company})`,
          pipelineId: PIPELINES.seller.id,
          pipelineStageId: PIPELINES.seller.stages.valuation_submitted,
          contactId: contact.id,
          monetaryValue: val.high,
          status: 'open',
        });
      }

      await triggerWebhook('seller_valuation_submitted', {
        contactId: contact?.id, ...form, valuationLow: val.low, valuationHigh: val.high,
      });
    } catch (err) {
      console.error('[Valuation] Submit failed:', err);
    } finally {
      setIsSubmitting(false);
      setStep(4);
    }
  };

  const fmt = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${(n / 1_000).toFixed(0)}K`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-brand-gold/10 text-brand-gold mb-6">
          <Calculator className="h-7 w-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">Preliminary Business Valuation</h1>
        <p className="text-white/40 max-w-lg mx-auto">Takes about 5 minutes. Get a multi-scenario pricing estimate based on current market multiples.</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10 max-w-xs mx-auto">
        {[1, 2, 3].map(s => (
          <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step >= s ? 'bg-brand-gold' : 'bg-white/10'}`} />
        ))}
      </div>

      {/* Step 1: Contact Info */}
      {step === 1 && (
        <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] space-y-6 animate-fade-in">
          <div><h2 className="text-lg font-bold text-white mb-1">Your Contact Information</h2><p className="text-sm text-white/40">All information is kept strictly confidential.</p></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input required placeholder="First Name" value={form.firstName} onChange={e => set('firstName', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
            <input required placeholder="Last Name" value={form.lastName} onChange={e => set('lastName', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
          </div>
          <input required type="email" placeholder="Email Address" value={form.email} onChange={e => set('email', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
          <input placeholder="Phone Number" value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
          <button onClick={() => setStep(2)} disabled={!form.firstName || !form.email} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm disabled:opacity-40 hover:shadow-[0_0_20px_rgba(197,157,95,0.3)] transition-all">
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Step 2: Business Info */}
      {step === 2 && (
        <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] space-y-6 animate-fade-in">
          <div><h2 className="text-lg font-bold text-white mb-1">Business Information</h2><p className="text-sm text-white/40">Tell us about your company.</p></div>
          <input required placeholder="Company Name" value={form.company} onChange={e => set('company', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
          <select value={form.industry} onChange={e => set('industry', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 appearance-none">
            <option value="" className="bg-background">Select Industry...</option>
            {INDUSTRIES.map(i => <option key={i} value={i} className="bg-background">{i}</option>)}
          </select>
          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button onClick={() => setStep(3)} disabled={!form.company || !form.industry} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm disabled:opacity-40 hover:shadow-[0_0_20px_rgba(197,157,95,0.3)] transition-all">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Financials */}
      {step === 3 && (
        <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] space-y-6 animate-fade-in">
          <div><h2 className="text-lg font-bold text-white mb-1">Financial Overview</h2><p className="text-sm text-white/40">Approximate figures are acceptable. All data is confidential.</p></div>
          <div>
            <label className="text-xs text-white/40 uppercase tracking-wider font-bold mb-2 block">Annual Revenue (LTM)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">$</span>
              <input required type="number" placeholder="e.g. 3000000" value={form.revenue} onChange={e => set('revenue', e.target.value)} className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider font-bold mb-2 block">Owner Earnings / SDE / EBITDA</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">$</span>
                <input required type="number" placeholder="e.g. 800000" value={form.earnings} onChange={e => set('earnings', e.target.value)} className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider font-bold mb-2 block">Earnings Type</label>
              <select value={form.earningsType} onChange={e => set('earningsType', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 appearance-none">
                <option value="SDE" className="bg-background">SDE (Seller Discretionary Earnings)</option>
                <option value="EBITDA" className="bg-background">EBITDA</option>
                <option value="Net Income" className="bg-background">Net Income</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 uppercase tracking-wider font-bold mb-2 block">Exit Timeline</label>
            <select value={form.timeline} onChange={e => set('timeline', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 appearance-none">
              <option value="" className="bg-background">Select Timeline...</option>
              <option value="immediately" className="bg-background">Immediately (0-3 months)</option>
              <option value="short" className="bg-background">Short Term (3-6 months)</option>
              <option value="planning" className="bg-background">Planning Ahead (6-12 months)</option>
              <option value="exploring" className="bg-background">Just Exploring</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setStep(2)} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button onClick={handleSubmit} disabled={!form.revenue || !form.earnings || isSubmitting} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm disabled:opacity-40 hover:shadow-[0_0_20px_rgba(197,157,95,0.3)] transition-all">
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Calculating...</> : <>Get My Valuation <BarChart2 className="h-4 w-4" /></>}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 4 && valuation && (
        <div className="space-y-8 animate-fade-in">
          <div className="p-8 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 text-center">
            <TrendingUp className="h-10 w-10 text-brand-gold mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-white mb-2">Preliminary Valuation Range</h2>
            <p className="text-white/40 text-sm mb-6">{form.company} · {form.industry}</p>
            <div className="flex items-center justify-center gap-4">
              <div className="text-right">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-1">Low</p>
                <p className="text-3xl font-bold text-white">{fmt(valuation.low)}</p>
              </div>
              <div className="text-brand-gold text-3xl font-light">—</div>
              <div className="text-left">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-1">High</p>
                <p className="text-3xl font-bold text-brand-gold">{fmt(valuation.high)}</p>
              </div>
            </div>
            <p className="text-xs text-white/30 mt-4">Based on market multiples for {form.industry.toLowerCase()} businesses.</p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-lg font-bold text-white mb-3">What Happens Next?</h3>
            <ul className="space-y-3">
              {[
                'Our team reviews your preliminary valuation within 1 business day.',
                'We schedule a confidential verification call to discuss your business.',
                'A detailed, broker-grade valuation is prepared if there\'s mutual fit.',
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-gold mt-0.5 shrink-0" />
                  <span className="text-white/60 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <Link to="/book" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold shadow-[0_0_20px_rgba(197,157,95,0.3)] hover:shadow-[0_0_30px_rgba(197,157,95,0.5)] transition-all">
              Book Your Verification Call <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
