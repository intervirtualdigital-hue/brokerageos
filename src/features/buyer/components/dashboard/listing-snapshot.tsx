import { Card } from "@/components/ui/card";
import type { Deal } from "@/types";

interface Props {
    deal?: Deal | null;
}

export function ListingSnapshot({ deal }: Props) {
    return (
        <Card className="p-6">
            <h4 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">Listing Snapshot</h4>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Project</span>
                    <span className="text-sm font-medium text-white">{deal?.title ?? 'Project AURA'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Stage</span>
                    <span className="text-sm font-medium text-white capitalize">{deal ? deal.stage.replace(/_/g, ' ') : 'Inquiry'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Asking Price</span>
                    <span className="text-sm font-medium text-accent">
                        {deal?.askingPrice ? `$${(deal.askingPrice / 1_000_000).toFixed(1)}M` : '$4.2M'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">NDA</span>
                    <span className={`text-sm font-medium ${deal?.ndaSigned ? 'text-emerald-400' : 'text-brand-gold'}`}>
                        {deal?.ndaSigned ? 'Executed' : 'Required'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Last Updated</span>
                    <span className="text-sm text-white/60">
                        {deal?.updatedAt ? new Date(deal.updatedAt).toLocaleDateString() : '—'}
                    </span>
                </div>
            </div>
        </Card>
    );
}
