import { SellerStatusTimeline } from './seller-status-timeline';
import { SellerContextSnapshot } from './seller-context-snapshot';
import { PrimaryActionCard } from '@/features/dashboard/components/primary-action-card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context';
import { useDeals, useContactNotes } from '@/hooks/useGHL';
import { Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function SellerDashboardPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: deals } = useDeals(user?.ghlContactId);
    const { data: notes, isLoading: notesLoading } = useContactNotes(user?.ghlContactId);

    const activeDeal = deals?.[0];
    const currentStage = activeDeal?.stage ?? 'valuation';

    return (
        <div className="space-y-4 animate-fade-in">
            {/* Header Section */}
            <div>
                <h2 className="text-3xl font-serif font-bold text-white mb-2">Active Mandate</h2>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">
                        {activeDeal ? `${activeDeal.title} — ${activeDeal.stage.replace(/_/g, ' ')}` : 'Execution in progress'}
                    </p>
                </div>
            </div>

            {/* Status Timeline — live from opportunity */}
            <SellerStatusTimeline currentStageId={currentStage} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    <PrimaryActionCard
                        title={activeDeal ? `Next: ${activeDeal.stage === 'review' ? 'Respond to Buyer Questions' : 'Schedule Verification Session'}` : "Schedule Verification Session"}
                        description={activeDeal
                            ? `Deal "${activeDeal.title}" is in ${activeDeal.stage.replace(/_/g, ' ')} stage. ${activeDeal.valuation ? `Valuation: $${(activeDeal.valuation / 1_000_000).toFixed(1)}M.` : ''}`
                            : "Objective: Confirm financial accuracy. Outcome: Market readiness validation."
                        }
                        ctaText="Begin Verification"
                        onAction={() => navigate('/seller/verification')}
                    />

                    {/* System Alerts — from GHL notes */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <h3 className="text-lg font-medium text-white mb-4">System Alerts</h3>
                        {notesLoading ? (
                            <div className="flex justify-center py-4">
                                <Loader2 className="h-5 w-5 animate-spin text-accent" />
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {(notes && notes.length > 0 ? notes.slice(0, 5) : [
                                    { id: 'default', body: 'Preliminary Valuation Range Generated', dateAdded: new Date().toISOString() },
                                ]).map((note) => (
                                    <li key={note.id} className="flex gap-4">
                                        <div className="h-2 w-2 mt-2 rounded-full bg-accent" />
                                        <div>
                                            <p className="text-sm text-white">{note.body}</p>
                                            <p className="text-xs text-gray-500 font-mono">
                                                {note.dateAdded ? formatDistanceToNow(new Date(note.dateAdded), { addSuffix: true }) : 'Recently'}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    <SellerContextSnapshot deal={activeDeal} />

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
