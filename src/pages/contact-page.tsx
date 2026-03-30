import { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle, Loader2, Send } from 'lucide-react';
import { createContact, triggerWebhook } from '@/services/api';
import { FIELDS, TAGS, buildCustomFields } from '@/config/ghl-config';
import { assignAdvisor } from '@/services/routing';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const parts = form.name.split(' ');
      const advisor = assignAdvisor({ source: 'contact_page' });

      await createContact({
        firstName: parts[0] || '', lastName: parts.slice(1).join(' ') || '',
        email: form.email, phone: form.phone,
        tags: [TAGS.GENERAL_CONTACT],
        customFields: buildCustomFields({
          [FIELDS.internal_assigned_broker]: advisor.id,
          [FIELDS.lead_source]: 'contact_page',
          [FIELDS.raw_form_type]: 'general_contact',
          [FIELDS.submission_timestamp]: new Date().toISOString(),
        }),
      });
      await triggerWebhook('general_contact', { ...form });
    } catch (err) { console.error('[Contact] Failed:', err); }
    finally { setIsSubmitting(false); setSubmitted(true); }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Info */}
        <div>
          <p className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-4">Get in Touch</p>
          <h1 className="text-4xl font-serif font-bold text-white mb-6">Contact Our Team</h1>
          <p className="text-white/50 leading-relaxed mb-10">Whether you're exploring a sale, seeking an acquisition, or have a partnership inquiry — we're here to help.</p>
          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Email', value: 'hello@brokerageos.com' },
              { icon: Phone, label: 'Phone', value: '(555) 000-0000' },
              { icon: MapPin, label: 'Office', value: 'Austin, TX' },
            ].map(i => (
              <div key={i.label} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold"><i.icon className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider">{i.label}</p>
                  <p className="text-white font-medium">{i.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="h-14 w-14 text-brand-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Message Sent</h3>
              <p className="text-white/40 text-sm">We'll get back to you within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Full Name" value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} />
                <input required type="email" placeholder="Email" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input placeholder="Phone (optional)" value={form.phone} onChange={e => set('phone', e.target.value)} className={inputCls} />
                <select value={form.subject} onChange={e => set('subject', e.target.value)} className={`${inputCls} appearance-none`}>
                  <option value="" className="bg-background">Subject...</option>
                  <option value="sell" className="bg-background">I Want to Sell</option>
                  <option value="buy" className="bg-background">I Want to Buy</option>
                  <option value="partner" className="bg-background">Partnership / Referral</option>
                  <option value="other" className="bg-background">Other</option>
                </select>
              </div>
              <textarea required rows={5} placeholder="Your message..." value={form.message} onChange={e => set('message', e.target.value)} className={`${inputCls} resize-none`} />
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm disabled:opacity-50 hover:shadow-[0_0_20px_rgba(197,157,95,0.3)] transition-all">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
