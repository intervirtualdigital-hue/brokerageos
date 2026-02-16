import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SellerContextSnapshot() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Mandate Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-white/60">LTM Revenue</p>
                        <p className="text-lg font-bold text-white flex items-center">
                            <DollarSign className="h-4 w-4 text-accent mr-0.5" />
                            3.5M
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-white/60">SDE (LTM)</p>
                        <p className="text-lg font-bold text-white flex items-center">
                            <DollarSign className="h-4 w-4 text-accent mr-0.5" />
                            1.2M
                        </p>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                    <p className="text-xs text-white/60 mb-1">Preliminary Valuation Guide</p>
                    <div className="text-xl font-bold text-accent flex items-center gap-2">
                        $3.8M - $4.5M
                    </div>
                    <p className="text-[10px] text-white/40 mt-1 italic">
                        *Subject to financial verification.
                    </p>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                            <TrendingUp className="h-4 w-4" />
                            <span>Market Readiness</span>
                        </div>
                        <span className="text-sm font-bold text-green-400">85/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                            <Calendar className="h-4 w-4" />
                            <span>Est. Time to Close</span>
                        </div>
                        <span className="text-sm text-white">6 Months</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
