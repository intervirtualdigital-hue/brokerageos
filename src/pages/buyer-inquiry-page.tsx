import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, CheckCircle, Loader2, Shield } from 'lucide-react';
import { createContact, createOpportunity, triggerWebhook } from '@/services/api';
import { FIELDS, TAGS, buildCustomFields, PIPELINES } from '@/config/ghl-config';
import { INDUSTRIES } from '@/data/listings';
import { assignAdvisor } from '@/services/routing';

interface BuyerForm {
  firstName: string; lastName: string; email: string; phone: string;
  industryPref: string; capitalRange: string; geography: string;
  timeline: string; experience: string; financing: string; buyerType: string;
}

const INITIAL: BuyerForm = {
  firstName: '', lastName: '', email: '', phone: '',
  industryPref: '', capitalRange: '', geography: '',
  timeline: '', experience: '', financing: '', buyerType: '',
};

function scoreBuyer(f: BuyerForm): { tier: string; tag: string } {
  let score = 0;
  if (['1m_5m', '5m_plus'].includes(f.capitalRange)) score += 3;
  else if (f.capitalRange === '500k_1m') score += 2;
  else score += 1;
  if (['immediate', 'short'].includes(f.timeline)) score += 2;
  else score += 1;
  if (['experienced', 'serial'].includes(f.experience)) score += 2;
  if (['pre_approved', 'funded'].includes(f.financing)) score += 2;
  if (score >= 8) return { tier: 'Tier 1', tag: TAGS.BUYER_TIER_1 };
  if (score >= 5) return { tier: 'Tier 2', tag: TAGS.BUYER_TIER_2 };
  return { tier: 'Tier 3', tag: TAGS.BUYER_TIER_3 };
}

export default function BuyerInquiryPage() {
  const [form, setForm] = useState<BuyerForm>(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const set = (k: keyof BuyerForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { tier, tag } = scoreBuyer(form);
    
    const advisor = assignAdvisor({
      industry: form.industryPref,
      capitalRange: form.capitalRange,
      source: 'buyer_inquiry_page',
    });

    try {
      const contact = await createContact({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        tags: [TAGS.BUYER, TAGS.BUYER_QUALIFIED, tag],
        customFields: buildCustomFields({
          [FIELDS.buyer_liquid_capital]: form.capitalRange,
          [FIELDS.buyer_financing_status]: form.financing,
          [FIELDS.buyer_experience_level]: form.experience,
          [FIELDS.buyer_type]: form.buyerType,
          [FIELDS.buyer_acquisition_timeline]: form.timeline,
          [FIELDS.buyer_industry_preference]: form.industryPref,
          [FIELDS.internal_buyer_tier]: tier,
          [FIELDS.internal_assigned_broker]: advisor.id,
          [FIELDS.lead_source]: 'buyer_inquiry_page',
          [FIELDS.raw_form_type]: 'buyer_inquiry',
          [FIELDS.submission_timestamp]: new Date().toISOString(),
        }),
      });

      if (PIPELINES.buyer.id && contact?.id) {
        await createOpportunity({
          name: `Buyer — ${form.firstName} ${form.lastName}`,
          pipelineId: PIPELINES.buyer.id,
          pipelineStageId: PIPELINES.buyer.stages.qualified,
          contactId: contact.id,
          status: 'open',
        });
      }

      await triggerWebhook('buyer_inquiry_submitted', {
        contactId: contact?.id, ...form, buyerTier: tier,
      });
    } catch (err) {
      console.error('[BuyerInquiry] Submit failed:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-fade-in">
        <CheckCircle className="h-16 w-16 text-brand-gold mx-auto mb-6" />
        <h2 className="text-3xl font-serif font-bold text-white mb-3">Buyer Profile Submitted</h2>
        <p className="text-white/40 mb-8 max-w-md mx-auto">Our advisory team will review your profile and match you with opportunities that fit your criteria.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/book" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm shadow-[0_0_20px_rgba(197,157,95,0.3)] transition-all">
            Book an Advisory Call <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/listings" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-all">
            Browse Listings
          </Link>
        </div>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30";
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-brand-gold/10 text-brand-gold mb-6">
          <Users className="h-7 w-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">Buyer Qualification</h1>
        <p className="text-white/40 max-w-lg mx-auto">Tell us about your acquisition goals and we'll match you with the right opportunities.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] space-y-6">
        {/* Contact */}
        <div><h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Information</h3></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input required placeholder="First Name" value={form.firstName} onChange={e => set('firstName', e.target.value)} className={inputCls} />
          <input required placeholder="Last Name" value={form.lastName} onChange={e => set('lastName', e.target.value)} className={inputCls} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input required type="email" placeholder="Email Address" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls} />
          <input placeholder="Phone Number" value={form.phone} onChange={e => set('phone', e.target.value)} className={inputCls} />
        </div>

        <hr className="border-white/5" />

        {/* Acquisition Criteria */}
        <div><h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Acquisition Criteria</h3></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <select value={form.industryPref} onChange={e => set('industryPref', e.target.value)} className={selectCls}>
            <option value="" className="bg-background">Preferred Industry...</option>
            {INDUSTRIES.map(i => <option key={i} value={i} className="bg-background">{i}</option>)}
            <option value="open" className="bg-background">Open to All</option>
          </select>
          <input placeholder="Preferred Geography" value={form.geography} onChange={e => set('geography', e.target.value)} className={inputCls} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <select required value={form.capitalRange} onChange={e => set('capitalRange', e.target.value)} className={selectCls}>
            <option value="" className="bg-background">Liquid Capital Available...</option>
            <option value="under_250k" className="bg-background">Under $250K</option>
            <option value="250k_500k" className="bg-background">$250K – $500K</option>
            <option value="500k_1m" className="bg-background">$500K – $1M</option>
            <option value="1m_5m" className="bg-background">$1M – $5M</option>
            <option value="5m_plus" className="bg-background">$5M+</option>
          </select>
          <select value={form.timeline} onChange={e => set('timeline', e.target.value)} className={selectCls}>
            <option value="" className="bg-background">Acquisition Timeline...</option>
            <option value="immediate" className="bg-background">Immediate (0-3 months)</option>
            <option value="short" className="bg-background">Short Term (3-6 months)</option>
            <option value="searching" className="bg-background">Just Starting Search</option>
          </select>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <select value={form.experience} onChange={e => set('experience', e.target.value)} className={selectCls}>
            <option value="" className="bg-background">Experience Level...</option>
            <option value="first_time" className="bg-background">First-Time Buyer</option>
            <option value="experienced" className="bg-background">Experienced Buyer</option>
            <option value="serial" className="bg-background">Serial Acquirer</option>
          </select>
          <select value={form.financing} onChange={e => set('financing', e.target.value)} className={selectCls}>
            <option value="" className="bg-background">Financing Status...</option>
            <option value="exploring" className="bg-background">Exploring Options</option>
            <option value="pre_approved" className="bg-background">Pre-Approved (SBA)</option>
            <option value="funded" className="bg-background">Self-Funded / Cash</option>
          </select>
          <select value={form.buyerType} onChange={e => set('buyerType', e.target.value)} className={selectCls}>
            <option value="" className="bg-background">Buyer Type...</option>
            <option value="individual" className="bg-background">Individual / Search Fund</option>
            <option value="strategic" className="bg-background">Strategic Buyer</option>
            <option value="pe" className="bg-background">PE / Family Office</option>
          </select>
        </div>

        <div className="flex items-start gap-3 pt-2">
          <Shield className="h-5 w-5 text-brand-gold/30 shrink-0 mt-0.5" />
          <p className="text-xs text-white/30">Your information is kept strictly confidential and shared only with our advisory team for matching purposes.</p>
        </div>

        <button type="submit" disabled={isSubmitting || !form.firstName || !form.email || !form.capitalRange}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold disabled:opacity-40 hover:shadow-[0_0_20px_rgba(197,157,95,0.3)] transition-all">
          {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>Submit Buyer Profile <ArrowRight className="h-5 w-5" /></>}
        </button>
      </form>
    </div>
  );
}
