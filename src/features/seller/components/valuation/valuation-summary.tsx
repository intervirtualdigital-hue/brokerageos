import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ValuationSummary() {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-2xl font-serif text-white">Preliminary Valuation Range</h3>
                    <p className="text-gray-400">Based on your submitted financials and industry comparables.</p>
                </div>
                <Button>
                    Schedule Verification Call <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Value Range Card */}
                <Card className="border-accent/20 bg-gradient-to-br from-white/5 to-accent/5">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-accent uppercase tracking-wider">Estimated Enterprise Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-white mb-2">$3,800,000 - $4,500,000</div>
                        <p className="text-sm text-gray-400">
                            Represents a <strong>3.2x - 3.8x</strong> multiple on your SDE of $1.2M.
                        </p>
                    </CardContent>
                </Card>

                {/* Factors Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-400 uppercase tracking-wider">Key Value Drivers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white">Recurring Revenue</span>
                            <span className="text-green-400 font-medium">+ High Impact</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white">Customer Concentration</span>
                            <span className="text-yellow-400 font-medium">• Moderate Risk</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white">Market Growth</span>
                            <span className="text-green-400 font-medium">+ High Impact</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Alert className="bg-accent/10 border-accent/20 text-accent">
                <TrendingUp className="h-4 w-4" />
                <AlertTitle>Strategic Premium Potential</AlertTitle>
                <AlertDescription>
                    Strategic buyers in your sector (EdTech) are currently paying premiums of 15-20% for platforms with proprietary content. This could push your valuation above $5M.
                </AlertDescription>
            </Alert>
        </div>
    );
}
