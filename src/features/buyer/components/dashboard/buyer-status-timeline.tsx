import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const stages = [
    { id: 'inquiry', label: 'Inbound Logged' },
    { id: 'nda', label: 'NDA Issued' },
    { id: 'access', label: 'Data Room Open' },
    { id: 'diligence', label: 'Under Diligence' },
    { id: 'offer', label: 'Offer Received' },
    { id: 'closing', label: 'Closing' },
    { id: 'complete', label: 'Mandate Complete' },
];

interface BuyerStatusTimelineProps {
    currentStageId: string;
}

export function BuyerStatusTimeline({ currentStageId }: BuyerStatusTimelineProps) {
    const currentIndex = stages.findIndex(s => s.id === currentStageId);
    const currentStage = stages[currentIndex]; // Use currentStage for the badge

    return (
        <Card className="w-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-20" />

            <CardHeader className="flex flex-row items-center justify-between pb-6">
                <CardTitle>Acquisition Progress</CardTitle>
                <Badge variant="outline" className="border-accent/20 bg-accent/10 text-accent gap-2 px-3 py-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-semibold">Current: {currentStage?.label}</span>
                </Badge>
            </CardHeader>
            <CardContent className="pb-8">
                {/* Mobile: Vertical Timeline */}
                <div className="md:hidden space-y-0 relative border-l-2 border-white/10 ml-3 pl-6 py-2">
                    {stages.map((stage, index) => {
                        const isCompleted = index < currentIndex;
                        const isCurrent = index === currentIndex;

                        return (
                            <div key={stage.id} className="relative mb-8 last:mb-0">
                                <div className={cn(
                                    "absolute -left-[31px] top-0 h-6 w-6 rounded-full border-2 flex items-center justify-center bg-background transition-colors",
                                    isCompleted ? "border-accent bg-accent text-background" :
                                        isCurrent ? "border-accent text-accent shadow-[0_0_10px_rgba(197,157,95,0.4)]" :
                                            "border-white/20 text-white/40"
                                )}>
                                    {isCompleted && <CheckCircle2 className="h-4 w-4" />}
                                    {isCurrent && <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />}
                                </div>

                                <div>
                                    <p className={cn(
                                        "text-sm font-medium transition-colors",
                                        isCompleted ? "text-accent" : isCurrent ? "text-white font-bold" : "text-white/40"
                                    )}>{stage.label}</p>
                                    {isCurrent && <p className="text-xs text-brand-gold mt-1 font-bold uppercase tracking-wider">Current Stage</p>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop: Grid Timeline */}
                <div className="hidden md:block relative mt-2">
                    {/* Progress Bar Container - Positioned to align with icon centers */}
                    <div className="absolute top-4 left-[7.14%] right-[7.14%] h-0.5 bg-white/10 -z-10">
                        <div
                            className="h-full bg-accent transition-all duration-500 ease-out"
                            style={{
                                width: `${(currentIndex / (stages.length - 1)) * 100}%`
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-7 w-full">
                        {stages.map((stage, index) => {
                            const isCompleted = index < currentIndex;
                            const isCurrent = index === currentIndex;
                            const isUpcoming = index > currentIndex;

                            return (
                                <div key={stage.id} className="relative flex flex-col items-center group">
                                    <div
                                        className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 bg-background z-10",
                                            isCompleted ? "border-accent bg-accent text-background" :
                                                isCurrent ? "border-accent text-accent shadow-[0_0_15px_rgba(197,157,95,0.4)] scale-110" :
                                                    "border-white/20 text-white/40"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="h-5 w-5" />
                                        ) : isCurrent ? (
                                            <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                                        ) : (
                                            <Circle className="h-5 w-5 opacity-0" />
                                        )}
                                        {isUpcoming && <div className="absolute inset-0 rounded-full bg-background" />}
                                    </div>

                                    <span className={cn(
                                        "mt-4 text-xs font-medium text-center px-1 transition-colors duration-300 leading-tight w-full",
                                        isCompleted ? "text-accent" :
                                            isCurrent ? "text-white font-bold" :
                                                "text-white/40"
                                    )}>
                                        {stage.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
