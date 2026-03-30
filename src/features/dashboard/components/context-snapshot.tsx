import { Card } from "@/components/ui/card";
import type { Deal } from "@/types";

interface Props {
    deal?: Deal | null;
}

export function ContextSnapshot({ deal }: Props) {
    return (
        <Card className="p-6">
            <h4 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">Deal Snapshot</h4>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Status</span>
                    <span className="text-sm font-medium text-white capitalize">{deal ? deal.stage.replace(/_/g, ' ') : '—'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Deal</span>
                    <span className="text-sm font-medium text-white">{deal?.title ?? '—'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Valuation</span>
                    <span className="text-sm font-medium text-accent">
                        {deal?.valuation ? `$${(deal.valuation / 1_000_000).toFixed(1)}M` : '—'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">NDA Status</span>
                    <span className={`text-sm font-medium ${deal?.ndaSigned ? 'text-emerald-400' : 'text-brand-gold'}`}>
                        {deal?.ndaSigned ? 'Executed' : 'Pending'}
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
