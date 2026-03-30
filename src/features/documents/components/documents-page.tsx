import { useState, useEffect } from 'react';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Lock, Search, Filter, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/features/auth/context';
import { getContactNotes, createContactTask } from '@/services/api';

const categories = [
    { id: 'all', label: 'All Files' },
    { id: 'financials', label: 'Financials' },
    { id: 'legal', label: 'Legal & Tax' },
    { id: 'ops', label: 'Operations' },
    { id: 'due_diligence', label: 'Due Diligence' },
];

interface FileItem {
    id: string;
    name: string;
    category: string;
    size: string;
    date: string;
    access: 'granted' | 'restricted';
    url?: string;
}

export default function DocumentsPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [files, setFiles] = useState<FileItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [requesting, setRequesting] = useState(false);

    // Fetch document references from GHL notes (documents stored as notes with document metadata)
    useEffect(() => {
        async function loadDocuments() {
            if (!user?.ghlContactId) {
                // Fallback mock data when no GHL connection
                setFiles([
                    { id: '1', name: 'P&L Statement 2023.pdf', category: 'financials', size: '2.4 MB', date: 'Oct 24, 2023', access: 'granted' },
                    { id: '2', name: 'Balance Sheet Q3 2023.xlsx', category: 'financials', size: '1.1 MB', date: 'Oct 24, 2023', access: 'granted' },
                    { id: '3', name: 'Tax Returns 2022.pdf', category: 'legal', size: '4.5 MB', date: 'Sep 12, 2023', access: 'restricted' },
                    { id: '4', name: 'Employee Handbook.pdf', category: 'ops', size: '3.2 MB', date: 'Aug 05, 2023', access: 'granted' },
                    { id: '5', name: 'Customer Contracts Template.docx', category: 'legal', size: '0.8 MB', date: 'Aug 01, 2023', access: 'restricted' },
                    { id: '6', name: 'Inventory List.xlsx', category: 'ops', size: '1.5 MB', date: 'Nov 10, 2023', access: 'granted' },
                ]);
                setIsLoading(false);
                return;
            }

            try {
                const notes = await getContactNotes(user.ghlContactId);
                // Parse notes that contain document metadata (convention: notes starting with "[DOC]")
                const docNotes = notes
                    .filter(n => n.body?.startsWith('[DOC]'))
                    .map((n, idx) => {
                        const parts = n.body.replace('[DOC]', '').trim().split('|');
                        return {
                            id: n.id || String(idx),
                            name: parts[0]?.trim() || 'Document',
                            category: parts[1]?.trim() || 'other',
                            size: parts[2]?.trim() || '—',
                            date: n.dateAdded ? new Date(n.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—',
                            access: 'granted' as const,
                            url: parts[3]?.trim(),
                        };
                    });

                if (docNotes.length > 0) {
                    setFiles(docNotes);
                } else {
                    // If no doc notes found, use fallback data
                    setFiles([
                        { id: '1', name: 'P&L Statement 2023.pdf', category: 'financials', size: '2.4 MB', date: 'Oct 24, 2023', access: 'granted' },
                        { id: '2', name: 'Balance Sheet Q3 2023.xlsx', category: 'financials', size: '1.1 MB', date: 'Oct 24, 2023', access: 'granted' },
                        { id: '3', name: 'Tax Returns 2022.pdf', category: 'legal', size: '4.5 MB', date: 'Sep 12, 2023', access: 'restricted' },
                        { id: '4', name: 'Employee Handbook.pdf', category: 'ops', size: '3.2 MB', date: 'Aug 05, 2023', access: 'granted' },
                        { id: '5', name: 'Customer Contracts Template.docx', category: 'legal', size: '0.8 MB', date: 'Aug 01, 2023', access: 'restricted' },
                        { id: '6', name: 'Inventory List.xlsx', category: 'ops', size: '1.5 MB', date: 'Nov 10, 2023', access: 'granted' },
                    ]);
                }
            } catch (err) {
                console.error('[Documents] Failed to fetch from GHL:', err);
                setFiles([
                    { id: '1', name: 'P&L Statement 2023.pdf', category: 'financials', size: '2.4 MB', date: 'Oct 24, 2023', access: 'granted' },
                    { id: '2', name: 'Balance Sheet Q3 2023.xlsx', category: 'financials', size: '1.1 MB', date: 'Oct 24, 2023', access: 'granted' },
                    { id: '3', name: 'Tax Returns 2022.pdf', category: 'legal', size: '4.5 MB', date: 'Sep 12, 2023', access: 'restricted' },
                    { id: '4', name: 'Employee Handbook.pdf', category: 'ops', size: '3.2 MB', date: 'Aug 05, 2023', access: 'granted' },
                ]);
            } finally {
                setIsLoading(false);
            }
        }
        loadDocuments();
    }, [user?.ghlContactId]);

    const filteredFiles = files.filter(file => {
        const matchesCategory = activeTab === 'all' || file.category === activeTab;
        const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleRequestDocument = async () => {
        if (!user?.ghlContactId) return;
        setRequesting(true);
        try {
            await createContactTask(user.ghlContactId, {
                title: 'Document Request',
                body: `${user.name} has requested access to additional deal documents.`,
            });
            alert('Document request submitted to your broker.');
        } catch (err) {
            console.error('[Documents] Request failed:', err);
        } finally {
            setRequesting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Data Room</h2>
                    <p className="text-gray-400">Secure access to deal documents and due diligence materials.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button onClick={handleRequestDocument} disabled={requesting}>
                        {requesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Request Document
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-4 border-b border-white/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="mt-8">
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="mb-6">
                                    {categories.map((cat) => (
                                        <TabsTrigger
                                            key={cat.id}
                                            value={cat.id}
                                        >
                                            {cat.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search files..."
                                className="pl-9 bg-white/5 border-white/10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-6 w-6 animate-spin text-accent" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFiles.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    No documents found.
                                </div>
                            ) : (
                                filteredFiles.map(file => (
                                    <div key={file.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded bg-surface flex items-center justify-center text-gray-300 group-hover:text-white transition-colors">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white group-hover:text-accent transition-colors">{file.name}</p>
                                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                                    <span className="capitalize">{file.category}</span>
                                                    <span>•</span>
                                                    <span>{file.size}</span>
                                                    <span>•</span>
                                                    <span>{file.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {file.access === 'restricted' ? (
                                                <Badge variant="secondary" className="gap-1">
                                                    <Lock className="h-3 w-3" /> Restricted
                                                </Badge>
                                            ) : file.url ? (
                                                <a href={file.url} target="_blank" rel="noopener noreferrer">
                                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-accent">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </a>
                                            ) : (
                                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-accent">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
