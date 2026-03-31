import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="font-serif text-lg font-bold text-white flex items-center gap-2 mb-4">
              <div className="h-6 w-6 rounded overflow-hidden flex items-center justify-center bg-brand-gold">
                <Briefcase className="h-3.5 w-3.5 text-black" fill="currentColor" />
              </div>
              BrokerageOS
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              The modern operating system for business brokerages. Powered by AI and integrated with GoHighLevel.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Platform</h4>
            <div className="space-y-2">
              <Link to="/services" className="block text-sm text-white/40 hover:text-white transition-colors">Services</Link>
              <Link to="/listings" className="block text-sm text-white/40 hover:text-white transition-colors">Listings</Link>
              <Link to="/sell" className="block text-sm text-white/40 hover:text-white transition-colors">Sell a Business</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Resources</h4>
            <div className="space-y-2">
              <Link to="/resources" className="block text-sm text-white/40 hover:text-white transition-colors">Resources</Link>
              <Link to="/contact" className="block text-sm text-white/40 hover:text-white transition-colors">Contact</Link>
              <Link to="/careers" className="block text-sm text-white/40 hover:text-white transition-colors">Careers</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Portal</h4>
            <div className="space-y-2">
              <Link to="/portal" className="block text-sm text-white/40 hover:text-white transition-colors">Advisor Login</Link>
              <Link to="/buyer" className="block text-sm text-white/40 hover:text-white transition-colors">Buyer Portal</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} BrokerageOS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
