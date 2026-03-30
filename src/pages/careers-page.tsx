import { useState } from 'react';
import { CheckCircle, Loader2, Briefcase } from 'lucide-react';
import { createContact, createOpportunity, triggerWebhook } from '@/services/api';
import { FIELDS, TAGS, buildCustomFields, PIPELINES } from '@/config/ghl-config';

const ROLES = [
  'Business Broker / Advisor',
  'M&A Analyst',
  'Deal Coordinator',
  'Marketing / Content',
  'Operations / Admin',
  'Other',
];

export default function CareersPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    role: '', experience: '', dealVolume: '',
    linkedinUrl: '', resumeUrl: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const inputCls = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const contact = await createContact({
        firstName: form.firstName, lastName: form.lastName,
        email: form.email, phone: form.phone,
        tags: [TAGS.CAREERS_APPLICANT, TAGS.APPLICANT_NEW],
        customFields: buildCustomFields({
          [FIELDS.careers_role_applied]: form.role,
          [FIELDS.careers_years_experience]: form.experience,
          [FIELDS.careers_deal_volume]: form.dealVolume,
          [FIELDS.careers_linkedin_url]: form.linkedinUrl,
          [FIELDS.careers_resume_url]: form.resumeUrl,
          [FIELDS.lead_source]: 'careers_page',
          [FIELDS.raw_form_type]: 'careers_application',
          [FIELDS.submission_timestamp]: new Date().toISOString(),
        }),
      });
      if (PIPELINES.careers.id && contact?.id) {
        await createOpportunity({
          name: `Applicant — ${form.firstName} ${form.lastName} (${form.role})`,
          pipelineId: PIPELINES.careers.id,
          pipelineStageId: PIPELINES.careers.stages.new_applicant,
          contactId: contact.id, status: 'open',
        });
      }
      await triggerWebhook('careers_application', { contactId: contact?.id, ...form });
    } catch (err) { console.error('[Careers] Failed:', err); }
    finally { setIsSubmitting(false); setSubmitted(true); }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in">
        <CheckCircle className="h-16 w-16 text-brand-gold mx-auto mb-6" />
        <h2 className="text-3xl font-serif font-bold text-white mb-3">Application Received</h2>
        <p className="text-white/40 max-w-md mx-auto">Thank you for your interest. Our team will review your application and respond within 5 business days.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Info */}
        <div>
          <p className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-4">Careers</p>
          <h1 className="text-4xl font-serif font-bold text-white mb-6">Join Our Advisory Team</h1>
          <p className="text-white/50 leading-relaxed mb-8">We're building the infrastructure behind modern brokerages. If you're a deal-maker, operator, or systems thinker — we want to hear from you.</p>

          <div className="space-y-4">
            {['Performance-based compensation', 'Access to proprietary deal flow', 'Modern tooling and systems', 'Remote-first culture', 'Growth path into leadership'].map(perk => (
              <div key={perk} className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-brand-gold shrink-0" />
                <span className="text-white/60 text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <input required placeholder="First Name" value={form.firstName} onChange={e => set('firstName', e.target.value)} className={inputCls} />
            <input required placeholder="Last Name" value={form.lastName} onChange={e => set('lastName', e.target.value)} className={inputCls} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input required type="email" placeholder="Email" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls} />
            <input placeholder="Phone" value={form.phone} onChange={e => set('phone', e.target.value)} className={inputCls} />
          </div>
          <select required value={form.role} onChange={e => set('role', e.target.value)} className={`${inputCls} appearance-none`}>
            <option value="" className="bg-background">Select Role...</option>
            {ROLES.map(r => <option key={r} value={r} className="bg-background">{r}</option>)}
          </select>
          <div className="grid sm:grid-cols-2 gap-4">
            <select value={form.experience} onChange={e => set('experience', e.target.value)} className={`${inputCls} appearance-none`}>
              <option value="" className="bg-background">Years of Experience...</option>
              <option value="0-2" className="bg-background">0-2 years</option>
              <option value="3-5" className="bg-background">3-5 years</option>
              <option value="5-10" className="bg-background">5-10 years</option>
              <option value="10+" className="bg-background">10+ years</option>
            </select>
            <input placeholder="Deal Volume (optional)" value={form.dealVolume} onChange={e => set('dealVolume', e.target.value)} className={inputCls} />
          </div>
          <input placeholder="LinkedIn URL" value={form.linkedinUrl} onChange={e => set('linkedinUrl', e.target.value)} className={inputCls} />
          <input placeholder="Resume URL (Google Drive, Dropbox, etc.)" value={form.resumeUrl} onChange={e => set('resumeUrl', e.target.value)} className={inputCls} />
          <textarea rows={4} placeholder="Why are you a good fit?" value={form.message} onChange={e => set('message', e.target.value)} className={`${inputCls} resize-none`} />

          <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm disabled:opacity-50 hover:shadow-[0_0_20px_rgba(197,157,95,0.3)] transition-all">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Briefcase className="h-4 w-4" />}
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
