import { StatusTimeline } from "./status-timeline";
import { PrimaryActionCard } from "./primary-action-card";
import { ContextSnapshot } from "./context-snapshot";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div>
                <h2 className="text-3xl font-sans font-bold text-white mb-2 tracking-tight">My Deal Room</h2>
                <p className="text-white/50">Track your deal progress and manage documents.</p>
            </div>

            {/* Status Timeline */}
            <StatusTimeline currentStageId="nda" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    <PrimaryActionCard
                        title="Complete Your Buyer Profile"
                        description="To access the data room and confidential financials, please complete your accredited investor qualification and buyer profile."
                        ctaText="Start Qualification"
                        onAction={() => console.log('Action clicked')}
                    />

                    {/* Recent Activity */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium text-white">Recent Activity</h3>
                            <Button variant="ghost" size="sm" className="h-8 text-xs text-brand-gold">View All</Button>
                        </div>
                        <ul className="space-y-6">
                            <li className="flex gap-4 relative pl-2">
                                <div className="absolute left-0 top-2 h-full w-px bg-white/5 last:hidden" />
                                <div className="h-2 w-2 mt-2 rounded-full bg-accent shadow-[0_0_8px_#10B981]" />
                                <div>
                                    <p className="text-sm text-white font-medium">NDA Signed</p>
                                    <p className="text-xs text-white/40 mt-1">2 hours ago</p>
                                </div>
                            </li>
                            <li className="flex gap-4 relative pl-2">
                                <div className="h-2 w-2 mt-2 rounded-full bg-white/20" />
                                <div>
                                    <p className="text-sm text-white">Inquiry Received</p>
                                    <p className="text-xs text-white/40 mt-1">Yesterday</p>
                                </div>
                            </li>
                        </ul>
                    </Card>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    <ContextSnapshot />

                    {/* Quick Contacts */}
                    <Card className="p-6">
                        <h4 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">Your Broker Team</h4>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-12 w-12 rounded-full bg-surface-highlight border border-white/10 flex items-center justify-center text-white/50">
                                SJ
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Sarah Jenkins</p>
                                <p className="text-xs text-brand-gold">Senior Broker</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">Schedule Call</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
