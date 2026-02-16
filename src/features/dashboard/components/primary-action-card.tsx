import { ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PrimaryActionCardProps {
    title: string;
    description: string;
    ctaText: string;
    onAction: () => void;
}

export function PrimaryActionCard({ title, description, ctaText, onAction }: PrimaryActionCardProps) {
    return (
        <Card className="relative overflow-hidden border-brand-gold/20 bg-gradient-to-br from-brand-gold/10 via-background to-background group">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-gold/10 blur-[100px] transition-all duration-700 group-hover:bg-brand-gold/20" />

            <CardHeader className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold shadow-[0_0_10px_rgba(197,157,95,0.3)]">
                        <Sparkles className="h-3 w-3" />
                    </div>
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">Recommended Action</span>
                </div>
                <CardTitle className="text-3xl text-white font-sans tracking-tight">{title}</CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
                <p className="text-base text-white/60 max-w-lg leading-relaxed">
                    {description}
                </p>
            </CardContent>

            <CardFooter className="relative z-10 pt-4">
                <Button size="lg" onClick={onAction} className="group text-base px-8 h-12 shadow-[0_0_20px_rgba(197,157,95,0.25)] hover:shadow-[0_0_30px_rgba(197,157,95,0.4)] bg-brand-gold text-brand-dark hover:bg-brand-gold/90 border-none">
                    {ctaText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </CardFooter>
        </Card>
    );
}
