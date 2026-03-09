import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background group',

                    /* Primary Variant - $100k Look */
                    variant === 'primary' && 'bg-brand-accent text-[#030303] hover:bg-interactive-hover shadow-[0_0_20px_rgba(226,201,104,0.2)] hover:shadow-[0_0_40px_rgba(226,201,104,0.4)] border-none font-semibold',

                    /* Secondary Variant */
                    variant === 'secondary' && 'bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg',

                    /* Outline Variant */
                    variant === 'outline' && 'border border-border-divider bg-transparent hover:bg-white/5 text-soft-text',

                    /* Ghost Variant */
                    variant === 'ghost' && 'hover:bg-white/5 hover:text-white text-muted-text',

                    /* Sizes */
                    size === 'sm' && 'h-9 px-4 text-sm',
                    size === 'md' && 'h-11 px-6 text-base',
                    size === 'lg' && 'h-14 px-8 text-lg',

                    className
                )}
                {...props}
            >
                {/* Advanced Shimmer and Border effect for primary button */}
                {variant === 'primary' && (
                    <>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none mix-blend-overlay" />
                        <div className="absolute inset-0 rounded-lg border border-white/40 opacity-50 mix-blend-overlay pointer-events-none" />
                    </>
                )}
                <span className="relative z-10 flex items-center transition-transform duration-300 group-hover:scale-[1.02]">{props.children}</span>
            </button>
        );
    }
);
Button.displayName = 'Button';
