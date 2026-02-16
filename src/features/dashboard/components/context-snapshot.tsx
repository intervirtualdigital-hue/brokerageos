import { Building, DollarSign, FileText, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

export function ContextSnapshot() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-lg font-medium text-white">Deal Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-brand-gold shadow-inner">
                        <Building className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">Project: AURA</h4>
                        <p className="text-sm text-white/50">Premium SaaS Platform in FinTech</p>
                        <p className="text-xs text-brand-gold/80 mt-1 font-mono">ID: #BOS-2024-001</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                    <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Asking Price</p>
                        <p className="text-xl font-bold text-white flex items-center">
                            <DollarSign className="h-5 w-5 text-brand-gold mr-0.5" />
                            5.2M
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">SDE / Cashflow</p>
                        <p className="text-xl font-bold text-white flex items-center">
                            <DollarSign className="h-5 w-5 text-brand-gold mr-0.5" />
                            1.8M
                        </p>
                    </div>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-6">
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3 text-sm text-white/60 group-hover:text-white transition-colors">
                            <div className="p-1.5 rounded-md bg-white/5">
                                <FileText className="h-4 w-4" />
                            </div>
                            <span>NDA Status</span>
                        </div>
                        <StatusBadge status="success" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Signed</StatusBadge>
                    </div>
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3 text-sm text-white/60 group-hover:text-white transition-colors">
                            <div className="p-1.5 rounded-md bg-white/5">
                                <Lock className="h-4 w-4" />
                            </div>
                            <span>Data Room</span>
                        </div>
                        <StatusBadge status="neutral" className="bg-white/5 text-white/50 border-white/10">Locked</StatusBadge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
