import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, hoverEffect = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'glass-panel rounded-2xl p-6 transition-all duration-500 relative overflow-hidden',
                    hoverEffect && 'hover:-translate-y-1 hover:border-brand-accent/30 hover:shadow-[0_20px_40px_-15px_rgba(226,201,104,0.15)] cursor-pointer group',
                    className
                )}
                {...props}
            >
                {/* Structural highlight lines for 3D depth */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/10 to-transparent"></div>

                {/* Dynamic hover glow overlays */}
                {hoverEffect && (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(226,201,104,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </>
                )}

                {/* Ensure content stays above effects */}
                <div className="relative z-10 h-full">
                    {props.children}
                </div>
            </div>
        );
    }
);
GlassCard.displayName = 'GlassCard';
