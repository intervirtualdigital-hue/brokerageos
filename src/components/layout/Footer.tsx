
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const platformLinks = [
    { name: 'System Architecture', path: '/system' },
    { name: 'All Modules', path: '/modules' },
    { name: 'How It Works', path: '/demo' },
];

const companyLinks = [
    { name: 'Who It\'s For', path: '/who-its-for' },
    { name: 'Resources', path: '/resources' },
    { name: 'FAQ', path: '/faq' },
];

const resourceLinks = [
    { name: 'Website vs. Infrastructure', path: '/resources/architecture-difference' },
    { name: 'Valuation Funnels', path: '/resources/valuation-funnels' },
    { name: 'Buyer Qualification', path: '/resources/buyer-qualification' },
    { name: 'NDA Automation', path: '/resources/nda-automation' },
];

export const Footer = () => {
    return (
        <footer className="bg-[#0A0A0A] border-t border-border-divider">

            {/* Pre-footer CTA block */}
            <div className="border-b border-border-divider/50">
                <div className="container mx-auto px-6 lg:px-12 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center mb-6">
                            <img
                                src="/logo.png"
                                alt="BrokerageOS"
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                        <p className="text-muted-text max-w-sm leading-relaxed text-sm">
                            The infrastructure layer behind modern business brokerages. Structured intake, qualified deal flow, and a platform that positions your firm as a serious place to do business.
                        </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                        <p className="text-soft-text text-sm font-medium">Ready to close the infrastructure gap?</p>
                        <Link to="/book-review">
                            <button className="inline-flex items-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-6 py-3 rounded-xl text-sm hover:brightness-110 transition-all group">
                                Book an Infrastructure Review
                                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </Link>
                        <p className="text-xs text-muted-text">30 minutes. No sales pitch — just a technical walkthrough.</p>
                    </div>
                </div>
            </div>

            {/* Main footer links */}
            <div className="container mx-auto px-6 lg:px-12 py-14">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-[11px] uppercase tracking-widest text-white/30 font-bold mb-5">Platform</h4>
                        <ul className="flex flex-col gap-3">
                            {platformLinks.map(l => (
                                <li key={l.name}>
                                    <Link to={l.path} className="text-sm text-muted-text hover:text-white transition-colors">
                                        {l.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[11px] uppercase tracking-widest text-white/30 font-bold mb-5">Company</h4>
                        <ul className="flex flex-col gap-3">
                            {companyLinks.map(l => (
                                <li key={l.name}>
                                    <Link to={l.path} className="text-sm text-muted-text hover:text-white transition-colors">
                                        {l.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-[11px] uppercase tracking-widest text-white/30 font-bold mb-5">Insights</h4>
                        <ul className="flex flex-col gap-3">
                            {resourceLinks.map(l => (
                                <li key={l.name}>
                                    <Link to={l.path} className="text-sm text-muted-text hover:text-white transition-colors">
                                        {l.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[11px] uppercase tracking-widest text-white/30 font-bold mb-5">Get Started</h4>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <Link to="/book-review" className="text-sm text-brand-accent hover:text-white transition-colors font-medium">
                                    Book Infrastructure Review →
                                </Link>
                            </li>
                            <li>
                                <Link to="/demo" className="text-sm text-muted-text hover:text-white transition-colors">
                                    See How It Works
                                </Link>
                            </li>
                            <li>
                                <Link to="/who-its-for" className="text-sm text-muted-text hover:text-white transition-colors">
                                    Check Qualification
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-border-divider/30 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-text text-xs">
                        © {new Date().getFullYear()} BrokerageOS. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-muted-text hover:text-white transition-colors text-xs">Privacy Policy</a>
                        <a href="#" className="text-muted-text hover:text-white transition-colors text-xs">Terms of Service</a>
                        <a href="#" className="text-muted-text hover:text-white transition-colors text-xs">Confidentiality</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
