import { BuyerStatusTimeline } from './buyer-status-timeline';
import { ListingSnapshot } from './listing-snapshot';
import { PrimaryActionCard } from '@/features/dashboard/components/primary-action-card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context';
import { useDeals } from '@/hooks/useGHL';

export default function BuyerDashboardPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: deals } = useDeals(user?.ghlContactId);

    const activeDeal = deals?.[0];
    const currentStage = activeDeal?.stage ?? 'inquiry';

    return (
        <div className="space-y-4 animate-fade-in">
            {/* Header Section */}
            <div>
                <h2 className="text-3xl font-serif font-bold text-white mb-2">Acquisition Target</h2>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">
                        {activeDeal ? `${activeDeal.title} — Active` : 'Mandate Active'}
                    </p>
                </div>
            </div>

            {/* Status Timeline — live from opportunity */}
            <BuyerStatusTimeline currentStageId={currentStage} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    <PrimaryActionCard
                        title={activeDeal?.ndaSigned ? "Access Data Room" : "Authorize Access to Data Room"}
                        description={
                            activeDeal?.ndaSigned
                                ? `NDA executed for "${activeDeal.title}". You now have access to the confidential data room and financial records.`
                                : "Execution of Confidentiality Agreement required to view financial records and diligence assets."
                        }
                        ctaText={activeDeal?.ndaSigned ? "Enter Data Room" : "Initiate NDA Process"}
                        onAction={() => navigate(activeDeal?.ndaSigned ? '/buy/data-room' : `/listing/L-2023-884`)}
                    />

                    {/* Recommended Next Step */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <h3 className="text-lg font-medium text-white mb-4">Recommended Next Step</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">1</div>
                                <div>
                                    <p className="text-sm font-bold text-white">
                                        {activeDeal?.ndaSigned ? 'Review Due Diligence Materials' : 'Complete your Buyer Profile'}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {activeDeal?.ndaSigned
                                            ? 'Financial statements and operational data are now available in the Data Room.'
                                            : 'Help us match you with the right deals by updating your investment criteria.'
                                        }
                                    </p>
                                    <Button
                                        variant="link"
                                        className="p-0 h-auto text-accent text-xs mt-1"
                                        onClick={() => navigate(activeDeal?.ndaSigned ? '/buy/data-room' : '/nda')}
                                    >
                                        {activeDeal?.ndaSigned ? 'Open Data Room' : 'Update Profile'}
                                    </Button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    <ListingSnapshot deal={activeDeal} />

                    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <h4 className="text-sm font-medium text-white mb-4">Deal Lead</h4>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-700" />
                            <div>
                                <p className="text-sm font-medium text-white">Sarah Jenkins</p>
                                <p className="text-xs text-gray-400">Associate Broker</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => navigate('/messages')}>Message Broker</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
