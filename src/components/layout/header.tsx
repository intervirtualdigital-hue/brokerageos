import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Listings', path: '/listings' },
  { label: 'Sell', path: '/sell' },
  { label: 'Buy', path: '/buy' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-gold to-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(197,157,95,0.3)] group-hover:shadow-[0_0_30px_rgba(197,157,95,0.5)] transition-shadow">
              <span className="text-black font-black text-sm tracking-tighter">B</span>
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight">Brokerage</span>
              <span className="text-brand-gold font-bold text-lg">OS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === item.path
                    ? 'text-brand-gold bg-brand-gold/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm shadow-[0_0_20px_rgba(197,157,95,0.3)] hover:shadow-[0_0_30px_rgba(197,157,95,0.5)] hover:scale-[1.02] transition-all duration-200"
            >
              <Phone className="h-4 w-4" />
              Book a Call
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? 'text-brand-gold bg-brand-gold/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/5">
              <Link
                to="/book"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
