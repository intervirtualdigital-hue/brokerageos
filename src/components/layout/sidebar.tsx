import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Files,
    ShieldCheck,
    Calendar,
    MessageSquare,
    BookOpen,
    Settings,
    Briefcase,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

// Enhanced Data Structure for Submenus (Phase 6)
const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Briefcase, label: 'Active Mandates', href: '/deal-room' },
    { icon: Files, label: 'Data Room Assets', href: '/documents' },
    { icon: ShieldCheck, label: 'Confidentiality', href: '/nda' },
    {
        icon: BookOpen,
        label: 'Advisory',
        href: '#',
        subItems: [
            { label: 'M&A Advisory', href: '/advisory/m-a' },
            { label: 'Valuation', href: '/advisory/valuation' },
            { label: 'Exit Planning', href: '/advisory/exit' },
        ]
    },
    { icon: Calendar, label: 'Verification Sessions', href: '/appointments' },
    { icon: MessageSquare, label: 'Communications', href: '/messages' },
    { icon: BookOpen, label: 'Resources', href: '/resources' }, // Renamed from Advisory Resources to avoid confusion
    { icon: Settings, label: 'Settings', href: '/settings' },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation();
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(prev => prev === label ? null : label);
    };

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity md:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar: Right on Mobile, Left on Desktop */}
            <aside className={cn(
                "fixed z-40 h-screen w-72 border-r border-white/5 bg-background transition-transform duration-300",
                // Mobile: Right side (fixed right, translate usually positive to hide right)
                "right-0 top-0 border-l md:border-l-0 md:border-r md:left-0 md:right-auto",
                // Desktop: Translate 0 (visible)
                "md:translate-x-0 hidden md:flex flex-col",
                // Mobile Toggle Logic: 
                isOpen ? "translate-x-0 flex" : "translate-x-full md:translate-x-0"
            )}>
                <div className="flex h-20 items-center px-8">
                    <h1 className="font-sans text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-brand-gold/20 border border-brand-gold/50 flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-brand-gold" />
                        </div>
                        Brokerage OS
                    </h1>
                </div>

                <div className="flex-1 px-4 py-6 overflow-y-auto">
                    <div className="mb-6 px-4">
                        <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">Main Menu</p>
                        <nav className="space-y-1">
                            {sidebarItems.slice(0, 4).map((item) => renderNavItem(item, location.pathname, openSubmenu, toggleSubmenu, onClose))}
                        </nav>
                    </div>

                    <div className="px-4">
                        <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">Workspace</p>
                        <nav className="space-y-1">
                            {sidebarItems.slice(4).map((item) => renderNavItem(item, location.pathname, openSubmenu, toggleSubmenu, onClose))}
                        </nav>
                    </div>
                </div>

                <div className="absolute bottom-4 left-0 w-full px-6">
                    <div className="rounded-2xl bg-gradient-to-br from-brand-gold/10 to-transparent p-4 border border-brand-gold/5">
                        <p className="text-xs text-brand-gold mb-1 font-medium">Need Help?</p>
                        <p className="text-xs text-white/50 mb-3">Contact your dedicated broker team.</p>
                        <button className="w-full rounded-xl bg-brand-gold/10 px-2 py-2 text-xs font-medium text-brand-gold hover:bg-brand-gold/20 transition-colors h-9">
                            Contact Support
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

function renderNavItem(item: any, currentPath: string, openSubmenu: string | null, toggleSubmenu: (l: string) => void, onClose: () => void) {
    const isActive = currentPath === item.href;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isSubOpen = openSubmenu === item.label;

    if (hasSubItems) {
        return (
            <div key={item.label} className="space-y-1 relative">
                <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={cn(
                        "w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group",
                        isSubOpen ? "text-white bg-white/5" : "text-white/50 hover:text-white hover:bg-white/5"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <item.icon className={cn("h-4 w-4 transition-colors", isSubOpen ? "text-brand-gold" : "text-white/50 group-hover:text-white")} />
                        {item.label}
                    </div>
                    {isSubOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </button>

                {/* Vertical Line for Submenu */}
                {isSubOpen && <div className="absolute left-6 top-10 bottom-2 w-px bg-white/10" />}

                <div className={cn(
                    "space-y-1 pl-4 overflow-hidden transition-all duration-300 ease-in-out",
                    isSubOpen ? "max-h-48 opacity-100 mt-1" : "max-h-0 opacity-0"
                )}>
                    {item.subItems!.map((sub: any) => (
                        <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={onClose}
                            className="block rounded-lg px-4 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 ml-4"
                        >
                            {sub.label}
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <Link
            key={item.href}
            to={item.href}
            onClick={onClose}
            className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                isActive
                    ? "text-white bg-gradient-to-r from-white/10 to-transparent shadow-inner border border-white/5"
                    : "text-white/50 hover:text-white hover:bg-white/5"
            )}
        >
            {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-brand-gold rounded-r-full shadow-[0_0_10px_#C59D5F]" />}
            <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-brand-gold" : "text-white/50 group-hover:text-white")} />
            {item.label}
        </Link>
    )
}
