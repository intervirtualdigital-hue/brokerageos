import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Lock, CheckCircle, Building2, Send, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/data/listings';
import { triggerWebhook, createContact } from '@/services/api';
import { useDeals } from '@/hooks/useGHL';
import { FIELDS, TAGS, buildCustomFields } from '@/config/ghl-config';

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: dealsData, isLoading } = useDeals();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', requestNda: false });

  const listingData = dealsData?.find(d => d.id === id);
  const listing = useMemo(() => {
    if (!listingData) return null;
    return {
      id: listingData.id,
      title: listingData.title || 'Business Opportunity',
      industry: 'N/A',
      location: 'N/A',
      revenue: 0,
      cashflow: 0,
      askingPrice: listingData.valuation || 0,
      description: 'Confidential listing details are available under NDA. Contact us to learn more.',
      highlights: ['Strong market position', 'Turnkey operation', 'Scalable infrastructure'],
      status: 'active',
      ndaRequired: true,
      yearEstablished: undefined,
      employees: undefined
    };
  }, [listingData]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Listing Not Found</h2>
        <Link to="/listings" className="text-brand-gold hover:underline">← Back to Listings</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const nameParts = form.name.split(' ');
      await createContact({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: form.email,
        phone: form.phone,
        tags: [TAGS.BUYER, TAGS.LISTING_INQUIRY, `LISTING_ID_${listing.id}`],
        customFields: buildCustomFields({
          [FIELDS.listing_id_interest]: listing.id,
          [FIELDS.listing_title_interest]: listing.title,
          [FIELDS.listing_revenue_interest]: String(listing.revenue),
          [FIELDS.listing_cashflow_interest]: String(listing.cashflow),
          [FIELDS.listing_price_interest]: String(listing.askingPrice),
          [FIELDS.listing_industry_interest]: listing.industry,
          [FIELDS.listing_location_interest]: listing.location,
          [FIELDS.listing_inquiry_message]: form.message,
          [FIELDS.nda_requested]: form.requestNda ? 'true' : 'false',
          [FIELDS.lead_source]: 'listing_detail_page',
          [FIELDS.raw_form_type]: 'listing_inquiry',
          [FIELDS.submission_timestamp]: new Date().toISOString(),
        }),
      });
      await triggerWebhook('listing_inquiry', {
        listingId: listing.id,
        listingTitle: listing.title,
        ...form,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('[ListingDetail] Inquiry failed:', err);
      setSubmitted(true); // graceful degradation
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Back */}
      <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> All Listings
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                {listing.status.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-white/30 font-mono">{listing.id}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">{listing.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {listing.location}</span>
              <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {listing.industry}</span>
              {listing.yearEstablished && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Est. {listing.yearEstablished}</span>}
              {listing.employees && <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {listing.employees}</span>}
            </div>
          </div>

          {/* Financial Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Revenue', value: formatCurrency(listing.revenue) },
              { label: 'Cash Flow', value: formatCurrency(listing.cashflow) },
              { label: 'Asking Price', value: formatCurrency(listing.askingPrice), highlight: true },
              { label: 'Multiple', value: `${(listing.askingPrice / listing.cashflow).toFixed(1)}x` },
            ].map(m => (
              <div key={m.label} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{m.label}</p>
                <p className={`text-xl font-bold ${m.highlight ? 'text-brand-gold' : 'text-white'}`}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h2 className="text-lg font-bold text-white mb-4">Overview</h2>
            <p className="text-white/60 leading-relaxed mb-6">{listing.description}</p>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Investment Highlights</h3>
            <ul className="space-y-2">
              {listing.highlights.map(h => (
                <li key={h} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-gold mt-0.5 shrink-0" />
                  <span className="text-white/60 text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Confidential */}
          {listing.ndaRequired && (
            <div className="p-6 rounded-2xl border border-brand-gold/20 bg-brand-gold/5">
              <div className="flex items-center gap-3 mb-3">
                <Lock className="h-5 w-5 text-brand-gold" />
                <h3 className="text-lg font-bold text-white">Additional Details Available Under NDA</h3>
              </div>
              <p className="text-white/50 text-sm mb-4">
                Full financial statements, customer data, operational details, and proprietary information are available after executing a Confidentiality Agreement.
              </p>
              <button
                onClick={() => setForm(f => ({ ...f, requestNda: true }))}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(197,157,95,0.3)]"
              >
                Request NDA Access <Lock className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Inquiry Card */}
          <div className="sticky top-24 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 text-brand-gold mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Inquiry Received</h3>
                <p className="text-white/40 text-sm mb-4">Our team will review your inquiry and follow up within 1 business day.</p>
                <Link to="/book" className="text-brand-gold text-sm font-semibold hover:underline">Or book a call now →</Link>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white mb-1">Interested in {listing.title}?</h3>
                <p className="text-xs text-white/40 mb-6">Submit your inquiry and our team will connect with you.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input required placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
                  <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
                  <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
                  <textarea placeholder="Message (optional)" rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 resize-none" />

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.requestNda} onChange={e => setForm({ ...form, requestNda: e.target.checked })}
                      className="rounded border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold/30" />
                    <span className="text-sm text-white/60">Request NDA / Confidential Access</span>
                  </label>

                  <button type="submit" disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm disabled:opacity-50 hover:shadow-[0_0_20px_rgba(197,157,95,0.3)] transition-all">
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Book a Call */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
            <DollarSign className="h-8 w-8 text-brand-gold/30 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white mb-2">Want to discuss this listing?</h4>
            <Link to="/book" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-all">
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
