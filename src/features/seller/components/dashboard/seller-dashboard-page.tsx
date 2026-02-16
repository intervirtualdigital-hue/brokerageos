import { SellerStatusTimeline } from './seller-status-timeline';
import { SellerContextSnapshot } from './seller-context-snapshot';
import { PrimaryActionCard } from '@/features/dashboard/components/primary-action-card'; // Reuse generic card, can refactor specific later
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function SellerDashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-4 animate-fade-in">
            {/* Header Section */}
            <div>
                <h2 className="text-3xl font-serif font-bold text-white mb-2">Active Mandate</h2>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">Execution in progress</p>
                </div>
            </div>

            {/* Status Timeline */}
            <SellerStatusTimeline currentStageId="valuation" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    <PrimaryActionCard
                        title="Schedule Verification Session"
                        description="Objective: Confirm financial accuracy. Outcome: Market readiness validation."
                        ctaText="Begin Verification"
                        onAction={() => navigate('/seller/verification')}
                    />

                    {/* Quick Stats or Messages Preview could go here */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <h3 className="text-lg font-medium text-white mb-4">System Alerts</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="h-2 w-2 mt-2 rounded-full bg-accent" />
                                <div>
                                    <p className="text-sm text-white">Preliminary Valuation Range Generated</p>
                                    <p className="text-xs text-gray-500 font-mono">2 hours ago</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    <SellerContextSnapshot />

                    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <h4 className="text-sm font-medium text-white mb-4">Advisory Team</h4>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-700" />
                            <div>
                                <p className="text-sm font-medium text-white">David Miller</p>
                                <p className="text-xs text-gray-400">Managing Partner</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4">Contact Advisor</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
