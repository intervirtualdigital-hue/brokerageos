import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

const stages = [
    { id: 'inquiry', label: 'Inquiry Received' },
    { id: 'nda', label: 'NDA & Qualification' },
    { id: 'access', label: 'Data Room Access' },
    { id: 'review', label: 'Review & Calls' },
    { id: 'offer', label: 'Offer Stage' },
    { id: 'diligence', label: 'Due Diligence' },
    { id: 'closing', label: 'Closing' },
];

interface StatusTimelineProps {
    currentStageId: string;
}

export function StatusTimeline({ currentStageId }: StatusTimelineProps) {
    const currentIndex = stages.findIndex(s => s.id === currentStageId);

    return (
        <Card className="w-full overflow-hidden border-brand-gold/10 bg-gradient-to-r from-brand-gold/5 via-transparent to-brand-gold/5">
            <div className="p-6">
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-8">Deal Progress</h3>

                <div className="relative flex items-center justify-between">
                    {/* Progress Bar Background */}
                    <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-white/5 z-0 rounded-full" />

                    {/* Progress Bar Active with Glow */}
                    <div
                        className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-brand-gold z-0 transition-all duration-700 ease-in-out shadow-[0_0_10px_#C59D5F]"
                        style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
                    />

                    {stages.map((stage, index) => {
                        const isCompleted = index < currentIndex;
                        const isCurrent = index === currentIndex;

                        return (
                            <div key={stage.id} className="relative z-10 flex flex-col items-center group">
                                <div
                                    className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500",
                                        isCompleted ? "bg-brand-gold border-brand-gold text-brand-dark shadow-[0_0_15px_rgba(197,157,95,0.4)]" :
                                            isCurrent ? "bg-background border-brand-gold text-brand-gold shadow-[0_0_20px_rgba(197,157,95,0.6)] scale-110" :
                                                "bg-background border-white/10 text-white/20 group-hover:border-white/30"
                                    )}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : isCurrent ? (
                                        <div className="relative h-3 w-3">
                                            <div className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-75" />
                                            <div className="relative h-3 w-3 rounded-full bg-brand-gold" />
                                        </div>
                                    ) : (
                                        <div className="h-2 w-2 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors" />
                                    )}
                                </div>

                                <div className="absolute top-10 flex flex-col items-center w-32">
                                    <span className={cn(
                                        "text-xs font-medium text-center transition-all duration-300",
                                        isCompleted ? "text-brand-gold" :
                                            isCurrent ? "text-white scale-105" :
                                                "text-white/30 group-hover:text-white/60"
                                    )}>
                                        {stage.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="h-8" /> {/* Spacer for labels */}
            </div>
        </Card>
    );
}
