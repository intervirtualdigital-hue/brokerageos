import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    MessageSquare,
    Calendar,
    List,
    Users,
    Briefcase,
    BarChart2,
    Settings,
    HelpCircle,
    LogOut,
    CheckSquare,
    Globe
} from 'lucide-react';
import { useAuth } from '@/features/auth/context';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const topItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/portal', id: 'tour-dashboard' },
    { icon: MessageSquare, label: 'Messages', href: '/portal/messages', id: 'tour-messages' },
    { icon: Calendar, label: 'Calendar', href: '/portal/calendar', id: 'tour-calendar' },
    { icon: List, label: 'Listings', href: '/portal/listings', id: 'tour-listings' },
    { icon: Users, label: 'Clients', href: '/portal/clients', id: 'tour-clients' },
    { icon: Briefcase, label: 'Deals', href: '/portal/deals', id: 'tour-deals' },
    { icon: CheckSquare, label: 'Tasks', href: '/portal/tasks', id: 'tour-tasks' },
    { icon: BarChart2, label: 'Analytics', href: '/portal/analytics', id: 'tour-analytics' },
    { icon: Globe, label: 'Form Builder', href: '/portal/funnels', id: 'tour-funnels' },
    { icon: Settings, label: 'Settings', href: '/portal/settings', id: 'tour-settings' },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const location = useLocation();
    const { logout } = useAuth();

    const startTour = () => {
        onClose(); // close mobile overlay if open
        const driverObj = driver({
          showProgress: true,
          animate: true,
          popoverClass: 'broker-theme-driver',
          steps: [
            { element: '#tour-dashboard', popover: { title: '📊 Dashboard', description: 'Monitor your firm-wide pipeline metrics, revenue trends (30/60/90 day), and new leads — all synced live with GoHighLevel.' } },
            { element: '#tour-messages', popover: { title: '💬 Unified Inbox', description: 'Chat with clients via SMS and Email. Every conversation syncs with GHL and actions fire live to the CRM.', side: 'right' } },
            { element: '#tour-calendar', popover: { title: '📅 Calendar & Booking', description: 'View upcoming advisory sessions, copy booking links, and manage your firm availability.', side: 'right' } },
            { element: '#tour-listings', popover: { title: '📋 Listings', description: 'Browse and manage your active business listings. Each listing is mapped to a GHL opportunity.', side: 'right' } },
            { element: '#tour-clients', popover: { title: '👥 Live Contacts', description: 'Search and manage your CRM database. Every contact is synced from GHL in real-time.', side: 'right' } },
            { element: '#tour-deals', popover: { title: '🤝 Deal Pipeline', description: 'Drag deals between stages on a visual Kanban board. Each move updates GHL opportunities instantly.', side: 'right' } },
            { element: '#tour-tasks', popover: { title: '✅ Task Intelligence', description: 'AI-generated follow-up tasks detect stalled deals and new leads. Never miss a high-value opportunity.', side: 'right' } },
            { element: '#tour-analytics', popover: { title: '📈 Analytics', description: 'Firm-wide performance analytics with broker leaderboards and individual drilldown modals.', side: 'right' } },
            { element: '#tour-funnels', popover: { title: '🌐 Form Builder', description: 'Build drag-and-drop intake forms with live preview. Map fields to GHL contacts, validate submissions, and generate embeddable snippets.', side: 'right' } },
            { element: '#tour-settings', popover: { title: '⚙️ System Settings', description: 'Configure GHL API tokens, manage team access, billing, security, and update your profile with avatar upload.', side: 'right' } },
          ]
        });
        driverObj.drive();
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

            {/* Sidebar */}
            <aside className={cn(
                "fixed z-40 h-screen w-[260px] border-r border-[#1F1F1F] bg-[#111111] flex flex-col transition-transform duration-300",
                "left-0 top-0",
                !isOpen && "-translate-x-full md:translate-x-0"
            )}>
                {/* Logo Area */}
                <div className="flex h-[72px] shrink-0 items-center px-6 border-b border-[#1F1F1F]">
                    <h1 className="font-serif text-[22px] font-bold text-white flex items-center gap-3">
                        <div className="h-8 w-8 rounded overflow-hidden flex items-center justify-center bg-brand-gold">
                            <Briefcase className="h-[18px] w-[18px] text-black" fill="currentColor" />
                        </div>
                        BrokerageOS
                    </h1>
                </div>

                {/* Primary Nav */}
                <div className="flex-1 py-6 overflow-y-auto hide-scrollbar flex flex-col justify-between">
                    <nav className="space-y-1.5 px-3">
                        {topItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    id={item.id}
                                    onClick={onClose}
                                    className={cn(
                                        "flex items-center gap-3 rounded-xl px-4 py-[11px] text-[15px] font-medium transition-all group relative",
                                        isActive
                                            ? "text-[#FFDD59] bg-[#FFDD59]/[0.08]" 
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-[#FFDD59] rounded-r-full shadow-[0_0_10px_#FFDD59]" />
                                    )}
                                    <item.icon className={cn("h-5 w-5", isActive ? "text-[#FFDD59]" : "text-white/50 group-hover:text-white/80")} />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Bottom Links */}
                    <div className="px-3 border-t border-[#1F1F1F] pt-4 mt-8 space-y-1.5">
                        <button onClick={startTour} className="w-full flex items-center gap-3 rounded-xl px-4 py-[11px] text-[15px] font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
                            <HelpCircle className="h-5 w-5" />
                            Menu Tour
                        </button>
                        <button onClick={logout} className="w-full flex items-center gap-3 rounded-xl px-4 py-[11px] text-[15px] font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
