import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-serif text-[22px] font-bold text-white flex items-center gap-3">
          <div className="h-8 w-8 rounded overflow-hidden flex items-center justify-center bg-brand-gold">
            <Briefcase className="h-[18px] w-[18px] text-black" fill="currentColor" />
          </div>
          BrokerageOS
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors">Services</Link>
          <Link to="/listings" className="text-sm text-white/60 hover:text-white transition-colors">Listings</Link>
          <Link to="/sell" className="text-sm text-white/60 hover:text-white transition-colors">Sell</Link>
          <Link to="/resources" className="text-sm text-white/60 hover:text-white transition-colors">Resources</Link>
          <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link>
          <Link to="/portal" className="text-sm font-bold text-black bg-brand-gold hover:bg-brand-gold/90 px-5 py-2.5 rounded-xl transition-colors">Portal</Link>
        </nav>
      </div>
    </header>
  );
}
