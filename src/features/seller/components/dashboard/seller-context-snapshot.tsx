import { Card } from "@/components/ui/card";
import type { Deal } from "@/types";

interface Props {
    deal?: Deal | null;
}

export function SellerContextSnapshot({ deal }: Props) {
    return (
        <Card className="p-6">
            <h4 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">Mandate Snapshot</h4>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Deal</span>
                    <span className="text-sm font-medium text-white">{deal?.title ?? '—'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Stage</span>
                    <span className="text-sm font-medium text-white capitalize">{deal ? deal.stage.replace(/_/g, ' ') : '—'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Est. Valuation</span>
                    <span className="text-sm font-medium text-accent">
                        {deal?.valuation ? `$${(deal.valuation / 1_000_000).toFixed(1)}M` : '—'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Asking Price</span>
                    <span className="text-sm font-medium text-white">
                        {deal?.askingPrice ? `$${(deal.askingPrice / 1_000_000).toFixed(1)}M` : '—'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Last Activity</span>
                    <span className="text-sm text-white/60">
                        {deal?.updatedAt ? new Date(deal.updatedAt).toLocaleDateString() : '—'}
                    </span>
                </div>
            </div>
        </Card>
    );
}
