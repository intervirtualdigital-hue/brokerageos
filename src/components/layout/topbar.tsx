import { Bell, Menu, Search, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

interface TopbarProps {
    onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
    return (
        <header className="fixed md:left-72 left-0 top-0 z-30 flex h-20 w-full md:w-[calc(100%-18rem)] items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-xl px-8 transition-all duration-300">
            <div className="flex items-center gap-8 flex-1">
                <Button variant="ghost" size="icon" className="md:hidden text-white/70" onClick={onMenuClick}>
                    <Menu className="h-6 w-6" />
                </Button>

                <div className="hidden md:flex flex-col gap-1">
                    <Breadcrumbs />
                </div>

                {/* Search Bar - RevenueX Style */}
                <div className="hidden lg:flex items-center relative max-w-md w-full ml-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search deals, documents..."
                        className="w-full h-11 pl-11 pr-14 bg-white/[0.03] border border-white/10 rounded-full text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all placeholder:text-white/20"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/5">
                        <Command className="h-3 w-3 text-white/40" />
                        <span className="text-[10px] text-white/40 font-medium">K</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/5 rounded-full relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_#C59D5F]"></span>
                    </Button>
                </div>

                {/* Profile Widget */}
                <div className="flex items-center gap-3 pl-6 border-l border-white/5">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-white leading-none mb-1">Alex Morgan</p>
                        <p className="text-xs text-brand-gold/80 font-medium">Founder & CEO</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-surface-highlight flex items-center justify-center text-white font-bold border border-white/10 shadow-inner ring-2 ring-white/5">
                        <span className="text-xs">AM</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
