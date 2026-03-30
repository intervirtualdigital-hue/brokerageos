import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AiAssistant } from '@/components/ai-assistant/ai-assistant';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-white flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
}
