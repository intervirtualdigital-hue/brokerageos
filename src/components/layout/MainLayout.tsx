
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);
    return null;
};
export const MainLayout = () => {
    const location = useLocation();

    useEffect(() => {
        // Load GHL Chat Widget
        const script = document.createElement('script');
        script.src = 'https://widgets.leadconnectorhq.com/loader.js';
        script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
        script.setAttribute('data-widget-id', '69b0fa690eb199cda4ae40b1');
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Optional: document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="min-h-screen relative text-soft-text overflow-hidden bg-[#0A0A0A]">
            <div className="bg-grid" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <ScrollToTop />
                <Header />
                <main className="flex-grow">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            className="relative w-full h-full"
                        >
                            {/* Awesome Page Transition Wipe */}
                            <motion.div
                                className="fixed inset-0 z-[100] bg-brand-accent flex items-center justify-center pointer-events-none transform-gpu"
                                initial={{ y: '0%' }}
                                animate={{ y: '-100%' }}
                                exit={{ y: '0%' }}
                                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.15 }}
                            >
                                <div className="absolute inset-x-0 bottom-0 top-1 bg-[#111111]" />
                                <motion.div
                                    className="relative z-10 flex flex-col items-center gap-4"
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center relative">
                                        <div className="absolute inset-0 border-2 border-brand-accent/20 rounded-xl" />
                                        <div className="absolute inset-0 border-2 border-brand-accent rounded-xl border-t-transparent animate-spin" />
                                        <div className="w-3 h-3 bg-brand-accent rounded-sm animate-pulse" />
                                    </div>
                                    <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">
                                        Loading System...
                                    </span>
                                </motion.div>
                            </motion.div>

                            {/* Page Content */}
                            <motion.div
                                initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
                                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                                exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 }}
                                className="relative z-0"
                            >
                                <Outlet />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </main>
                <Footer />
            </div>
        </div>
    );
};
