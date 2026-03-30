import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, FileText, TrendingUp, Shield, Users, Lightbulb, Scale } from 'lucide-react';

const GUIDES = [
  { icon: TrendingUp, title: 'How to Value Your Business', desc: 'Understanding multiples, SDE vs EBITDA, and what drives premium valuations.', tag: 'Sellers', href: '/sell' },
  { icon: Shield, title: 'The NDA Process Explained', desc: 'Why confidentiality matters and what buyers should expect during the inquiry process.', tag: 'Buyers', href: '/listings' },
  { icon: Users, title: 'Finding the Right Broker', desc: 'What to look for in a business broker and how the relationship should work.', tag: 'Both', href: '/services' },
  { icon: FileText, title: 'Due Diligence Checklist', desc: 'A comprehensive list of documents and steps required during the due diligence phase.', tag: 'Both', href: '/services' },
  { icon: Lightbulb, title: 'Preparing Your Business for Sale', desc: 'Key steps to maximize value before going to market — from financials to operations.', tag: 'Sellers', href: '/sell' },
  { icon: Scale, title: 'Understanding Deal Structures', desc: 'Asset vs stock sales, earnouts, seller financing, and how deals get structured.', tag: 'Both', href: '/services' },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <p className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-4">Resources</p>
        <h1 className="text-4xl font-serif font-bold text-white mb-4">Knowledge Center</h1>
        <p className="text-white/50 leading-relaxed">Guides, frameworks, and insights to help you navigate the business sale or acquisition process with confidence.</p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {GUIDES.map(guide => (
          <Link key={guide.title} to={guide.href} className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-gold/20 hover:bg-white/[0.04] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="h-11 w-11 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold/20 transition-colors">
                <guide.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold bg-white/5 px-2 py-1 rounded">{guide.tag}</span>
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-gold transition-colors">{guide.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{guide.desc}</p>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center p-10 rounded-2xl border border-white/5 bg-white/[0.02]">
        <BookOpen className="h-10 w-10 text-brand-gold/30 mx-auto mb-4" />
        <h2 className="text-2xl font-serif font-bold text-white mb-3">Have a Specific Question?</h2>
        <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">Our team is available to discuss your situation confidentially. No pressure, no obligations.</p>
        <Link to="/book" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm shadow-[0_0_20px_rgba(197,157,95,0.3)] transition-all">
          Book a Free Consultation <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
