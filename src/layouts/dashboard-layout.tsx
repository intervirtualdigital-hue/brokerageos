import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { AICommandCenter } from '@/components/ai-assistant/ai-command-center';
import { Toaster } from 'sonner';

export function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-white">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
            <main className="pt-20 md:pl-[260px] min-h-screen transition-all duration-300">
                <div className="container mx-auto px-4 md:px-6 py-6 max-w-[1600px] animate-fade-in">
                    <Outlet />
                </div>
            </main>
            <AICommandCenter />
            <Toaster theme="dark" position="top-right" closeButton richColors toastOptions={{ style: { background: '#161616', border: '1px solid #2A2A2A', color: '#fff' } }} />
        </div>
    );
}

