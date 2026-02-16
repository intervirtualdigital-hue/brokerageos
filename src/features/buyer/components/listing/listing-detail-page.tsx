import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // Assuming Tabs component structure
import { Lock, FileText, DollarSign, MapPin } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';

export default function ListingDetailPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <StatusBadge status="warning">Under LOI</StatusBadge>
                        <span className="text-sm font-mono text-gray-500">ID: L-2023-884</span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Project AURA: Returns Management SaaS</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Austin, TX (Remote)</div>
                        <div className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> Asking: $4.2M</div>
                    </div>
                </div>
                <Button size="lg" onClick={() => navigate('/nda')} className="shadow-[0_0_20px_rgba(197,157,95,0.3)]">
                    Unlock Full Details <Lock className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-white/5 border border-white/10 w-full justify-start h-auto p-1">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="financials">Financials <Lock className="ml-1.5 h-3 w-3 opacity-50" /></TabsTrigger>
                    <TabsTrigger value="documents">Documents <Lock className="ml-1.5 h-3 w-3 opacity-50" /></TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Investment Highlights</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-gray-300">
                            <p>
                                Project AURA is a leading Returns Management System (RMS) specifically designed for D2C e-commerce brands on Shopify Plus.
                                The platform automates returns, exchanges, and warranties, recovering up to 35% of revenue that would otherwise be lost to refunds.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Strong Recurring Revenue:</strong> 92% of revenue is ARR.</li>
                                <li><strong>Low Churn:</strong> &lt;2% monthly churn due to deep integration.</li>
                                <li><strong>Scalable Tech:</strong> Built on React/Node.js, fully cloud-native.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="financials" className="mt-6 relative">
                    {/* Blurred Content Placeholder */}
                    <div className="filter blur-sm select-none pointer-events-none opacity-50">
                        <Card>
                            <CardHeader><CardTitle>Financial Summary</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-2 gap-8">
                                <div className="h-24 bg-white/10 rounded-lg" />
                                <div className="h-24 bg-white/10 rounded-lg" />
                                <div className="h-64 col-span-2 bg-white/10 rounded-lg" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Lock Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="text-center p-8 rounded-xl bg-black/80 border border-accent/30 backdrop-blur-md shadow-2xl max-w-md mx-auto">
                            <div className="h-16 w-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-4 text-accent">
                                <Lock className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Financials Restricted</h3>
                            <p className="text-gray-400 mb-6">Confidentiality Agreement required to view detailed P&L, Balance Sheets, and Cashflow analysis.</p>
                            <Button onClick={() => navigate('/nda')} className="w-full">
                                Execute Agreement to Unlock
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-6 relative">
                    {/* Same Lock Pattern */}
                    <div className="filter blur-sm select-none pointer-events-none opacity-50">
                        <div className="grid gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-16 bg-white/5 border border-white/10 rounded-lg flex items-center p-4">
                                    <FileText className="h-6 w-6 text-gray-600 mr-4" />
                                    <div className="h-4 w-48 bg-gray-700 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="text-center p-8 rounded-xl bg-black/80 border border-accent/30 backdrop-blur-md shadow-2xl max-w-md mx-auto">
                            <div className="h-16 w-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-4 text-accent">
                                <Lock className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Data Room Restricted</h3>
                            <p className="text-gray-400 mb-6">Access to contracts, tax returns, and IP documents requires an executed NDA.</p>
                            <Button onClick={() => navigate('/nda')} className="w-full">
                                Execute Agreement to Unlock
                            </Button>
                        </div>
                    </div>
                </TabsContent>

            </Tabs>
        </div>
    );
}
