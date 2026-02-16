import { cn } from "@/lib/utils";

type StatusType = "success" | "warning" | "error" | "neutral" | "pending";

interface StatusBadgeProps {
    status: StatusType;
    children: React.ReactNode;
    className?: string;
    pulsating?: boolean;
}

const statusConfig: Record<StatusType, { dot: string; bg: string; text: string }> = {
    success: { dot: "bg-emerald-400", bg: "bg-emerald-900/30 border-emerald-800", text: "text-emerald-400" },
    warning: { dot: "bg-amber-400", bg: "bg-amber-900/30 border-amber-800", text: "text-amber-400" },
    error: { dot: "bg-red-400", bg: "bg-red-900/30 border-red-800", text: "text-red-400" },
    neutral: { dot: "bg-gray-400", bg: "bg-white/5 border-white/10", text: "text-gray-400" },
    pending: { dot: "bg-accent", bg: "bg-accent/10 border-accent/20", text: "text-accent" },
};

export function StatusBadge({ status, children, className, pulsating = false }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <div className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium", config.bg, config.text, className)}>
            <span className="relative flex h-2 w-2">
                {pulsating && (
                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", config.dot)}></span>
                )}
                <span className={cn("relative inline-flex rounded-full h-2 w-2", config.dot)}></span>
            </span>
            {children}
        </div>
    );
}
