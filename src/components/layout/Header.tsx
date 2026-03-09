
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const navLinks = [
    { name: 'System', path: '/system' },
    { name: 'Modules', path: '/modules' },
    { name: 'Who It\'s For', path: '/who-its-for' },
    { name: 'Resources', path: '/resources' },
    { name: 'FAQ', path: '/faq' },
];

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled
                    ? 'bg-[#111111]/95 backdrop-blur-lg border-border-divider py-3 shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
                    : 'bg-transparent border-transparent py-5'
            )}
        >
            <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center group shrink-0">
                    <img
                        src="/logo.png"
                        alt="BrokerageOS"
                        className="h-7 md:h-9 w-auto object-contain group-hover:opacity-80 transition-opacity"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const active = isActive(link.path);
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                    active
                                        ? 'text-white bg-white/5'
                                        : 'text-soft-text hover:text-white hover:bg-white/[0.04]'
                                )}
                            >
                                {link.name}
                                {active && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-accent rounded-full"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop CTAs */}
                <div className="hidden lg:flex items-center gap-3">
                    <Link to="/demo">
                        <button className="text-sm font-medium text-soft-text hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
                            How It Works
                        </button>
                    </Link>
                    <Link to="/book-review">
                        <button className="inline-flex items-center gap-2 bg-brand-accent text-[#1D1D1D] font-semibold px-4 py-2 rounded-lg text-sm hover:brightness-110 transition-all">
                            Book a Review
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-soft-text hover:text-white hover:bg-white/5 transition-all"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <AnimatePresence mode="wait">
                        {mobileMenuOpen ? (
                            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                <X size={22} />
                            </motion.div>
                        ) : (
                            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                <Menu size={22} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile Nav Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-[#111111]/98 backdrop-blur-xl border-b border-border-divider shadow-2xl"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
                            {navLinks.map((link, i) => {
                                const active = isActive(link.path);
                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={cn(
                                                'flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all',
                                                active
                                                    ? 'text-white bg-brand-accent/10 border border-brand-accent/20'
                                                    : 'text-soft-text hover:text-white hover:bg-white/5'
                                            )}
                                        >
                                            {link.name}
                                            {active && <span className="w-2 h-2 rounded-full bg-brand-accent" />}
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            <div className="flex flex-col gap-3 mt-5 pt-5 border-t border-border-divider/50">
                                <Link to="/demo" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full text-center px-4 py-3 rounded-xl border border-white/10 text-soft-text hover:text-white hover:border-white/20 text-sm font-medium transition-all">
                                        See How It Works
                                    </button>
                                </Link>
                                <Link to="/book-review" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full text-center px-4 py-3 rounded-xl bg-brand-accent text-[#1D1D1D] font-semibold text-sm hover:brightness-110 transition-all">
                                        Book an Infrastructure Review
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
