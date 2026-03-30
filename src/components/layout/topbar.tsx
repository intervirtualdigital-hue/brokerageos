import { Bell, Menu, Search, Briefcase, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
    onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <header className="fixed md:left-[260px] left-0 top-0 z-30 flex h-[72px] w-full md:w-[calc(100%-260px)] items-center justify-between border-b border-[#1F1F1F] bg-[#111111]/90 backdrop-blur-xl px-8 transition-all duration-300">
            <div className="flex items-center gap-8 flex-1">
                <Button variant="ghost" size="icon" className="md:hidden text-white/70" onClick={onMenuClick}>
                    <Menu className="h-6 w-6" />
                </Button>

                {/* Search Bar matching mockup */}
                <div className="hidden lg:flex items-center relative max-w-[420px] w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search deals, clients, or listings (Press '/' to focus)"
                        className="w-full h-10 pl-11 pr-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-[13px] text-white focus:outline-none focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all placeholder:text-white/30"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Quick Actions */}
                <div className="flex items-center gap-2 relative" ref={notifRef}>
                    <Button onClick={() => setShowNotifications(!showNotifications)} variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/5 rounded-full relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_#C59D5F] animate-pulse"></span>
                    </Button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div className="absolute top-full right-0 mt-3 w-[340px] bg-[#161616] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden animate-fade-in z-50">
                            <div className="px-4 py-3 border-b border-[#2A2A2A] flex justify-between items-center bg-[#1A1A1A]">
                                <h4 className="text-[13px] font-bold text-white uppercase tracking-widest">Notifications</h4>
                                <span className="text-[11px] font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">3 New</span>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                <div onClick={() => { navigate('/portal/deals'); setShowNotifications(false); }} className="px-4 py-4 border-b border-[#2A2A2A]/50 hover:bg-[#222] cursor-pointer transition-colors flex gap-3">
                                    <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                                        <Briefcase className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-white mb-0.5">Deal Moved: Project Titan</p>
                                        <p className="text-[12px] text-white/50 leading-tight">Sarah moved the deal to Due Diligence.</p>
                                        <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">10 mins ago</p>
                                    </div>
                                </div>
                                <div onClick={() => { navigate('/portal/clients'); setShowNotifications(false); }} className="px-4 py-4 border-b border-[#2A2A2A]/50 hover:bg-[#222] cursor-pointer transition-colors flex gap-3">
                                    <div className="h-8 w-8 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-white mb-0.5">New Lead: John Smith</p>
                                        <p className="text-[12px] text-white/50 leading-tight">Submitted valuation request form.</p>
                                        <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">1 hour ago</p>
                                    </div>
                                </div>
                                <div onClick={() => { navigate('/portal/tasks'); setShowNotifications(false); }} className="px-4 py-4 hover:bg-[#222] cursor-pointer transition-colors flex gap-3">
                                    <div className="h-8 w-8 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                                        <Bell className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-white mb-0.5">Task Assigned</p>
                                        <p className="text-[12px] text-white/50 leading-tight">System identified 4 stalled deals in your pipeline.</p>
                                        <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">2 hours ago</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-[#1A1A1A] border-t border-[#2A2A2A] text-center">
                                <button className="text-[12px] font-bold text-white/40 hover:text-white transition-colors">Mark all as read</button>
                            </div>
                        </div>
                    )}
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
