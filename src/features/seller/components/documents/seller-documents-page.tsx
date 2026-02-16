import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CloudUpload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
    { id: 'financials', label: 'Financial Records', description: 'P&L, Balance Sheets (Last 3 years)', status: 'action_required' },
    { id: 'tax', label: 'Tax Returns', description: 'Federal Returns (Last 3 years)', status: 'action_required' },
    { id: 'contracts', label: 'Key Contracts', description: 'Top 10 Customer/Vendor agreements', status: 'not_started' },
    { id: 'ops', label: 'Operations', description: 'Org Chart, Employee Handbook', status: 'not_started' },
    { id: 'legal', label: 'Legal & IP', description: 'Formation docs, Trademark filings', status: 'not_started' },
];

export default function SellerDocumentsPage() {
    const navigate = useNavigate();
    const [uploadingId, setUploadingId] = useState<string | null>(null);
    const [completedIds, setCompletedIds] = useState<string[]>([]);

    const handleUpload = (id: string) => {
        setUploadingId(id);
        // Simulate upload
        setTimeout(() => {
            setUploadingId(null);
            setCompletedIds(prev => [...prev, id]);
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Data Room Assets</h2>
                    <p className="text-gray-400">Securely organize and submit verification documents.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline"><CloudUpload className="mr-2 h-4 w-4" /> Bulk Import</Button>
                    <Button onClick={() => navigate('/seller/data-room-ready')}>Preview Data Room</Button>
                </div>
            </div>

            {/* Mobile View: Accordion (Phase 5/11) */}
            <div className="md:hidden space-y-4">
                {categories.map((category) => {
                    const isComplete = completedIds.includes(category.id);
                    const isUploading = uploadingId === category.id;
                    // const isOpen = true; // For now, keep all open or implement state. User asked for Accordion.
                    // Better to use a standard Accordion logic or just stack them as cards with content visible.
                    // "Tabs become stacked sections".
                    // I'll render each category as a stacked card.

                    return (
                        <Card key={category.id} className="overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                                <h3 className="font-medium text-white">{category.label}</h3>
                                {isComplete ? <StatusBadge status="success">Uploaded</StatusBadge> :
                                    category.status === 'action_required' ? <StatusBadge status="warning">Action Required</StatusBadge> :
                                        <span className="text-xs text-gray-500">Optional</span>}
                            </div>
                            <div className="p-4 bg-background/50">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-sm text-gray-400">{category.description}</p>
                                    <div className={`p-2 rounded-lg ${isComplete ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'}`}>
                                        {isComplete ? <CheckCircle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                                    </div>
                                </div>
                                {isComplete ? (
                                    <Button variant="outline" size="sm" disabled className="w-full opacity-50">
                                        <CheckCircle className="mr-2 h-4 w-4" /> Uploaded
                                    </Button>
                                ) : (
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleUpload(category.id)}
                                        isLoading={isUploading}
                                        className="w-full"
                                    >
                                        <CloudUpload className="mr-2 h-4 w-4" />
                                        Upload {category.label}
                                    </Button>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Desktop View: Tabs/Sidebar */}
            <div className="hidden md:flex flex-row gap-6">
                {/* Sidebar / Categories */}
                <div className="w-full md:w-64 space-y-4 shrink-0">
                    <Card>
                        <CardContent className="p-4 space-y-1">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3 px-2">Categories</h3>
                            <Tabs defaultValue="financials" className="w-full">
                                <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
                                    {categories.map(cat => (
                                        <TabsTrigger
                                            key={cat.id}
                                            value={cat.id}
                                            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-white/50 data-[state=active]:bg-brand-gold data-[state=active]:!text-black data-[state=active]:shadow-glow data-[state=active]:font-bold hover:bg-white/5 hover:text-white"
                                        >
                                            {cat.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <Card className="bg-accent/5 border-accent/20">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="h-4 w-4 text-accent" />
                                <h4 className="font-bold text-accent text-sm">Advisor Note</h4>
                            </div>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                "Please prioritize the P&L statements for the last 3 years. These are critical for the valuation report."
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Card className="flex-1 bg-white/5 border-white/5 backdrop-blur-sm min-h-[500px]">
                    <CardContent className="p-6 space-y-6">
                        {/* Upload Area */}
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors">
                                <CloudUpload className="h-6 w-6 text-white/40 group-hover:text-brand-gold" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-1">Submit Asset</h3>
                            <p className="text-sm text-white/40 max-w-sm">
                                Drag and drop files here, or click to browse. Supported formats: PDF, XLSX, DOCX.
                            </p>
                        </div>

                        {/* File List */}
                        <div>
                            <h3 className="text-lg font-medium text-white mb-4">Uploaded Assets</h3>
                            {categories.map((category) => {
                                const isComplete = completedIds.includes(category.id);
                                const isUploading = uploadingId === category.id;

                                return (
                                    <div key={category.id} className="bg-white/5 rounded-xl border border-white/5 mb-4 transition-all hover:bg-white/10 group">
                                        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className={`mt-1 p-2 rounded-lg ${isComplete ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-white/40'}`}>
                                                    {isComplete ? <CheckCircle className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-base font-medium text-white">{category.label}</h3>
                                                        {isComplete ? (
                                                            <div className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Uploaded</div>
                                                        ) : category.status === 'action_required' ? (
                                                            <div className="px-2 py-0.5 rounded text-xs bg-brand-gold/10 text-brand-gold border border-brand-gold/20">Action Required</div>
                                                        ) : (
                                                            <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded">Optional</span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-white/40 mt-1">{category.description}</p>
                                                </div>
                                            </div>

                                            <div>
                                                {isComplete ? (
                                                    <Button variant="outline" size="sm" disabled className="opacity-50 border-white/10 text-white/50">
                                                        <CheckCircle className="mr-2 h-4 w-4" /> Uploaded
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleUpload(category.id)}
                                                        isLoading={isUploading}
                                                        className="bg-white/10 hover:bg-white/20 text-white border-0"
                                                    >
                                                        <CloudUpload className="mr-2 h-4 w-4" />
                                                        Upload Files
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
