import { DollarSign, MapPin, Hash, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Link } from 'react-router-dom';

export function ListingSnapshot() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Target Listing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-1">
                    <Link to="/listing/L-2023-884" className="hover:underline hover:text-accent transition-colors">
                        <h4 className="text-xl font-bold text-white leading-tight">Project AURA: Returns Management SaaS</h4>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                        <MapPin className="h-4 w-4" />
                        <span>Austin, TX (Remote)</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-4">
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

                <div className="border-t border-white/10 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                            <DollarSign className="h-4 w-4" />
                            <span>Valuation Guidance</span>
                        </div>
                        <span className="text-lg font-bold text-accent">$4,200,000</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                            <Hash className="h-4 w-4" />
                            <span>Mandate ID</span>
                        </div>
                        <span className="text-sm font-mono text-white/80">L-2023-884</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                            <Activity className="h-4 w-4" />
                            <span>Mandate Status</span>
                        </div>
                        <StatusBadge status="warning">Under LOI</StatusBadge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
