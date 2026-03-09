import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
    container?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
    ({ className, container = true, children, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn('py-[64px] md:py-[80px] lg:py-[120px]', className)}
                {...props}
            >
                {container ? (
                    <div className="container mx-auto px-6 lg:px-12">
                        {children}
                    </div>
                ) : (
                    children
                )}
            </section>
        );
    }
);
Section.displayName = 'Section';
