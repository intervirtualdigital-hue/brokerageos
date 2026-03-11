
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
const pageVariants = {
    initial: { opacity: 0, filter: 'blur(4px)', scale: 0.98 },
    animate: {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }
    },
    exit: {
        opacity: 0,
        filter: 'blur(4px)',
        scale: 0.98,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
};

const preloaderVariants = {
    initial: { top: '0%' },
    animate: {
        top: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.15 }
    },
    exit: {
        top: '0%',
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    }
};

export const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen relative text-soft-text overflow-hidden bg-[#0A0A0A]">
            <div className="bg-grid" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <ScrollToTop />
                <Header />
                <main className="flex-grow">
                    <AnimatePresence mode="sync">
                        {/* The Page Preloader Wipe */}
                        <motion.div
                            key={`preloader-${location.pathname}`}
                            className="fixed inset-0 z-[100] bg-brand-accent flex items-center justify-center transform-gpu"
                            variants={preloaderVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {/* Inner dark block that trails slightly behind for a layered effect */}
                            <motion.div
                                className="absolute inset-x-0 bottom-0 top-1 bg-[#111111]"
                            />
                            <motion.div
                                className="relative z-10 flex items-center justify-center"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0, transition: { duration: 0.2, delay: 0.2 } }}
                                exit={{ opacity: 1, transition: { duration: 0.2, delay: 0.3 } }}
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center relative">
                                        <div className="absolute inset-0 border-2 border-brand-accent/20 rounded-xl" />
                                        <div className="absolute inset-0 border-2 border-brand-accent rounded-xl border-t-transparent animate-spin" />
                                        <div className="w-3 h-3 bg-brand-accent rounded-sm animate-pulse" />
                                    </div>
                                    <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">
                                        Loading System...
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* The Page Content Fade */}
                        <motion.div
                            key={location.pathname}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full h-full transform-gpu"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
                <Footer />
            </div>
        </div>
    );
};
