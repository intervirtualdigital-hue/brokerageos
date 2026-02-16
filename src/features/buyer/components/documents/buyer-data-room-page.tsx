import { useState } from 'react';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Lock, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const categories = [
    { id: 'financials', label: 'Financials' },
    { id: 'legal', label: 'Legal & Corp' },
    { id: 'ip', label: 'Tech & IP' },
    { id: 'customers', label: 'Customers' },
];

const documents = [
    { id: 1, title: '2023_PnL_Detailed.pdf', category: 'financials', size: '2.4 MB', date: 'Oct 12, 2023', type: 'PDF' },
    { id: 2, title: 'Balance_Sheet_Q3_2023.xlsx', category: 'financials', size: '1.1 MB', date: 'Oct 15, 2023', type: 'XLSX' },
    { id: 3, title: 'Tax_Returns_2022_Filed.pdf', category: 'financials', size: '4.5 MB', date: 'Sep 01, 2023', type: 'PDF' },
    { id: 4, title: 'Incorporation_Articles.pdf', category: 'legal', size: '0.8 MB', date: 'Aug 20, 2019', type: 'PDF' },
    { id: 5, title: 'IP_Assignment_Agreements.pdf', category: 'ip', size: '3.2 MB', date: 'Aug 22, 2019', type: 'PDF' },
    { id: 6, title: 'Customer_Contracts_Template.docx', category: 'customers', size: '0.5 MB', date: 'Jan 10, 2023', type: 'DOCX' },
];

export default function BuyerDataRoomPage() {
    const [activeTab, setActiveTab] = useState('financials');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDocs = documents.filter(doc =>
        (activeTab === 'all' || doc.category === activeTab) &&
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Data Room Assets</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>Project AURA</span>
                        <span className="h-1 w-1 rounded-full bg-gray-600" />
                        <span className="flex items-center gap-1 text-accent"><Lock className="h-3 w-3" /> Confidential</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download All</Button>
                </div>
            </div>

            {/* Mobile View: Accordion (Phase 5/11) */}
            <div className="md:hidden space-y-4">
                {categories.map((cat) => {
                    const catDocs = documents.filter(doc => doc.category === cat.id);
                    if (catDocs.length === 0) return null;

                    return (
                        <Card key={cat.id} className="overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/10">
                                <h3 className="font-medium text-white">{cat.label}</h3>
                            </div>
                            <div className="divide-y divide-white/5">
                                {catDocs.map(doc => (
                                    <div key={doc.id} className="p-4 bg-background/50 flex align-start justify-between gap-3">
                                        <div className="flex items-start gap-3 overflow-hidden">
                                            <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-1">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{doc.title}</p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                    <Badge variant="secondary" className="bg-white/5 text-[10px] h-5 px-1">{doc.type}</Badge>
                                                    <span>{doc.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-gray-400 -mr-2" title="Download">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )
                })}
            </div>

            {/* Desktop View: Sidebar + Main Content */}
            <div className="hidden md:flex flex-row gap-6">
                {/* Sidebar / Filters */}
                <div className="w-full md:w-64 space-y-4 shrink-0">
                    <Card>
                        <CardContent className="p-4 space-y-1">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3 px-2">Categories</h3>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === cat.id ? 'bg-brand-gold text-black font-bold' : 'text-gray-300 hover:bg-white/5'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-accent/10 text-accent' : 'text-gray-300 hover:bg-white/5'
                                    }`}
                            >
                                All Assets
                            </button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-lg border border-white/10">
                        <Search className="h-4 w-4 text-gray-400 ml-2" />
                        <Input
                            placeholder="Search documents..."
                            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-10" // Override strict h-12 for search bar internal input if needed, or keep generic
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {filteredDocs.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                No documents found.
                            </div>
                        ) : (
                            filteredDocs.map(doc => (
                                <Card key={doc.id} className="hover:bg-white/5 transition-colors group cursor-pointer border-white/5">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white group-hover:text-accent transition-colors">{doc.title}</p>
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <span>{doc.size}</span>
                                                    <span>•</span>
                                                    <span>{doc.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary" className="bg-white/5 text-gray-400 hover:bg-white/10">{doc.type}</Badge>
                                            <Button variant="ghost" size="icon" className="group-hover:text-white text-gray-400" title="Access Document">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
