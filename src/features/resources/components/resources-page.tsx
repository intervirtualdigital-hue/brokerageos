import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function ResourcesPage() {
    const resources = [
        { title: "Buyer's Playbook", description: "Comprehensive guide to acquiring a business through BrokerageOS.", type: "Guide" },
        { title: "Due Diligence Checklist", description: "Standard checklist for verifying financials and operations.", type: "Checklist" },
        { title: "Valuation Methodology", description: "How we calculate SDE and Multiples.", type: "Article" },
        { title: "Closing Process Overview", description: "Step-by-step timeline of what happens after the offer.", type: "Timeline" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-bold text-white mb-2">Resources</h2>
                <p className="text-gray-400">Guides and playbooks to help you navigate the deal process.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((res, idx) => (
                    <Card key={idx} className="group hover:bg-white/10 transition-colors border-white/10">
                        <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                                <div className="p-2 rounded bg-accent/10 text-accent">
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <span className="text-xs font-medium text-gray-500 uppercase">{res.type}</span>
                            </div>
                            <CardTitle className="text-xl text-white group-hover:text-accent transition-colors">{res.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-400 mb-6 min-h-[40px]">{res.description}</p>
                            <Button variant="ghost" className="p-0 h-auto text-accent hover:text-white hover:bg-transparent group-hover:underline">
                                Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
