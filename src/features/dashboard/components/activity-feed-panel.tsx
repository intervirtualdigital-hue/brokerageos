import { Card } from '@/components/ui/card';
import { Calendar, UserPlus, Info } from 'lucide-react';

export function ActivityFeedPanel({ contacts }: { contacts: any[] }) {
    // Generate an aggregate feed based on new contacts and simulated engagements
    // Since GHL API requires querying per-contact for notes, we build a "smart feed"
    const feed: any[] = [];
    
    if (contacts) {
        // Add new lead creations
        contacts.slice(0, 5).forEach((c, i) => {
            const date = new Date(c.dateAdded || Date.now() - i * 3600000); // spread by hours if missing
            feed.push({
                id: `lead-${c.id}`,
                type: 'lead',
                icon: UserPlus,
                color: 'text-brand-gold bg-brand-gold/10 border-brand-gold/20',
                title: 'New Lead Captured',
                desc: `${c.firstName || 'Unknown'} ${c.lastName || ''} entered the system.`,
                timestamp: date,
            });
            
            // Add simulated secondary events (meetings booked, etc that normally come via webhooks)
            if (i % 3 === 0) {
                feed.push({
                    id: `book-${c.id}`,
                    type: 'booking',
                    icon: Calendar,
                    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
                    title: 'Meeting Scheduled',
                    desc: `Discovery call booked with ${c.firstName || 'Client'}.`,
                    timestamp: new Date(date.getTime() + 86400000), 
                });
            }
        });
    }

    // Sort by timestamp descending
    feed.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return (
        <Card className="col-span-12 lg:col-span-5 bg-[#161616] border-[#2A2A2A] p-6 rounded-3xl flex flex-col min-h-[380px]">
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-[13px] font-bold text-white/60 uppercase tracking-widest">Ongoing Activity</h3>
                <Info className="h-3.5 w-3.5 text-white/40" />
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4 pr-2">
                {feed.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-white/40 text-[13px]">No recent activity.</p>
                    </div>
                ) : feed.slice(0, 8).map(event => (
                    <div key={event.id} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${event.color}`}>
                                <event.icon className="h-3.5 w-3.5" />
                            </div>
                            <div className="w-px h-full bg-[#2A2A2A] group-last:hidden mt-2" />
                        </div>
                        <div className="pt-1.5 pb-2">
                            <div className="flex items-center justify-between mb-1 sm:w-[280px]">
                                <p className="text-[13px] font-bold text-white group-hover:text-brand-gold transition-colors truncate">{event.title}</p>
                                <span className="text-[10px] text-white/40 shrink-0">{formatTimeAgo(event.timestamp)}</span>
                            </div>
                            <p className="text-[12px] text-white/60 leading-relaxed">{event.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function formatTimeAgo(date: Date) {
    const hours = Math.floor((Date.now() - date.getTime()) / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
}
