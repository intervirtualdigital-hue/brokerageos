import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-accent text-white hover:bg-accent/80",
                secondary:
                    "border-transparent bg-white/10 text-white hover:bg-white/20",
                destructive:
                    "border-transparent bg-red-900/50 text-red-100 hover:bg-red-900/70 border-red-800",
                outline: "text-foreground",
                success: "border-transparent bg-emerald-900/30 text-emerald-400 border-emerald-800",
                warning: "border-transparent bg-amber-900/30 text-amber-400 border-amber-800",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
