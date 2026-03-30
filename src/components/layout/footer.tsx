import { Link } from 'react-router-dom';

const FOOTER_NAV = {
  'Company': [
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/services' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ],
  'For Sellers': [
    { label: 'Free Valuation', path: '/sell' },
    { label: 'Our Process', path: '/services' },
    { label: 'Resources', path: '/resources' },
    { label: 'Book a Call', path: '/book' },
  ],
  'For Buyers': [
    { label: 'Browse Listings', path: '/listings' },
    { label: 'Buyer Inquiry', path: '/buy' },
    { label: 'Resources', path: '/resources' },
    { label: 'Book a Call', path: '/book' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-gold to-amber-600 flex items-center justify-center">
                <span className="text-black font-black text-sm tracking-tighter">B</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg tracking-tight">Brokerage</span>
                <span className="text-brand-gold font-bold text-lg">OS</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              The infrastructure behind modern brokerages. We install the systems that make business sales seamless, structured, and scalable.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold/30 transition-all">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold/30 transition-all">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(FOOTER_NAV).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/40 text-sm hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} BrokerageOS. All rights reserved.
          </p>
          <div className="flex gap-6 items-center">
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">Disclaimer</a>
            <div className="w-px h-3 bg-white/10" />
            <Link to="/portal" className="text-brand-gold/60 text-xs hover:text-brand-gold transition-colors font-medium">
              Team Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
