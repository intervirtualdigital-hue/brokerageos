import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';

export function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-white">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
            <main className="pt-20 md:pl-72 min-h-screen transition-all duration-300">
                <div className="container mx-auto px-4 md:px-6 py-4 max-w-[1600px] animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
