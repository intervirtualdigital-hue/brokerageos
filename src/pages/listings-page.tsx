import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building2, SlidersHorizontal, Loader2 } from 'lucide-react';
import { INDUSTRIES, formatCurrency } from '@/data/listings';
import { useDeals } from '@/hooks/useGHL';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  under_loi: { label: 'Under LOI', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  sold: { label: 'Sold', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  coming_soon: { label: 'Coming Soon', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
};

export default function ListingsPage() {
  const { data: dealsData, isLoading } = useDeals();
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const activeListings = useMemo(() => {
    return (dealsData || []).map(d => ({
         id: d.id,
         title: d.title || 'Business Opportunity',
         industry: 'N/A',
         location: 'N/A',
         revenue: 0,
         cashflow: 0,
         askingPrice: d.valuation || 0,
         status: 'active',
         yearEstablished: undefined as number | undefined,
         employees: undefined as string | undefined,
    }));
  }, [dealsData]);

  const filtered = activeListings.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.industry.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = !industryFilter || l.industry === industryFilter;
    const matchesStatus = !statusFilter || l.status === statusFilter;
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 lg:pt-16">
        <div className="max-w-2xl">
          <p className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-4">Opportunities</p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight mb-4">
            Current Listings
          </h1>
          <p className="text-lg text-white/50">
            Confidential, vetted businesses available for acquisition. All listings are represented exclusively by our advisory team.
          </p>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by name, industry, or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold/30 transition-all"
            />
          </div>
          <select
            value={industryFilter}
            onChange={e => setIndustryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 appearance-none cursor-pointer"
          >
            <option value="" className="bg-background">All Industries</option>
            {INDUSTRIES.map(ind => (
              <option key={ind} value={ind} className="bg-background">{ind}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 appearance-none cursor-pointer"
          >
            <option value="" className="bg-background">All Status</option>
            <option value="active" className="bg-background">Active</option>
            <option value="under_loi" className="bg-background">Under LOI</option>
            <option value="coming_soon" className="bg-background">Coming Soon</option>
          </select>
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-white/5 bg-white/[0.02]">
            <SlidersHorizontal className="h-10 w-10 text-white/10 mx-auto mb-4" />
            <p className="text-white/40">No listings match your search criteria.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(listing => {
              const status = STATUS_LABELS[listing.status] ?? STATUS_LABELS.active;
              return (
                <Link
                  key={listing.id}
                  to={`/listings/${listing.id}`}
                  className="group relative rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-brand-gold/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  {/* Status */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Image placeholder */}
                  <div className="h-40 bg-gradient-to-br from-brand-gold/10 to-transparent flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-white/10" />
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-brand-gold font-bold uppercase tracking-wider mb-2">{listing.industry}</p>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-gold transition-colors">{listing.title}</h3>
                    <p className="text-sm text-white/40 mb-1">{listing.location}</p>
                    {listing.yearEstablished && (
                      <p className="text-xs text-white/30">Est. {listing.yearEstablished} · {listing.employees}</p>
                    )}

                    <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-white/5">
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
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16 p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
          <h3 className="text-xl font-serif font-bold text-white mb-2">Looking for something specific?</h3>
          <p className="text-white/40 text-sm mb-6">Tell us your acquisition criteria and we'll match you with off-market opportunities.</p>
          <Link to="/buy" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm shadow-[0_0_20px_rgba(197,157,95,0.3)] transition-all">
            Submit Buyer Profile <SlidersHorizontal className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
