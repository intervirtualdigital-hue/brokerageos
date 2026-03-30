import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Building2, MapPin, ArrowRight, Folder, FolderLock, Upload, Plus, FileText, ChevronLeft, ChevronRight, Eye, X, Edit2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/modal';
import { triggerWebhook } from '@/services/api';
import { useDeals } from '@/hooks/useGHL';

export default function PortalListingsPage() {
    const { data: dealsData, isLoading } = useDeals();
    const [modalMode, setModalMode] = useState<'create' | 'edit' | false>(false);
    const [selectedListing, setSelectedListing] = useState<any>(null);
    const [activeListings, setActiveListings] = useState<any[]>([]);
    const [activeDataRoom, setActiveDataRoom] = useState<any>(null);

    useEffect(() => {
        if (dealsData) {
            setActiveListings(dealsData.map(deal => ({
                id: deal.id,
                title: deal.title || "Unnamed Deal",
                industry: "N/A", // From custom fields in a real setup
                location: "N/A",
                revenue: 0,
                earnings: 0,
                cashflow: 0,
                askingPrice: deal.valuation || 0,
                description: "Imported from CRM",
                highlights: [],
                status: "active",
                ndaRequired: true,
                imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
            })));
        }
    }, [dealsData]);
    
    // VDR States
    const [activeFolder, setActiveFolder] = useState<string | null>(null);
    const [viewingDocument, setViewingDocument] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleListingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        toast.loading(modalMode === 'edit' ? "Updating mandate..." : "Publishing listing...", { id: "listing" });

        try {
            if (modalMode === 'edit' && selectedListing) {
                const updatedListing = {
                    ...selectedListing,
                    title: form.get('title') as string,
                    industry: form.get('industry') as string,
                    location: form.get('location') as string,
                    askingPrice: Number(form.get('askingPrice')),
                    imageUrl: (form.get('imageUrl') as string) || selectedListing.imageUrl
                };
                await triggerWebhook("LISTING_UPDATED", updatedListing);
                setActiveListings(activeListings.map(l => l.id === selectedListing.id ? updatedListing : l));
                toast.success("Listing updated successfully.", { id: "listing" });
            } else {
                const newListing = {
                    id: `LST-${Math.floor(Math.random() * 10000)}`,
                    title: form.get('title') as string,
                    industry: form.get('industry') as string,
                    location: form.get('location') as string,
                    revenue: 0,
                    earnings: 0,
                    cashflow: 0,
                    askingPrice: Number(form.get('askingPrice')),
                    description: "Newly published mandate.",
                    highlights: ["New active mandate"],
                    status: "active",
                    ndaRequired: true,
                    imageUrl: (form.get('imageUrl') as string) || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                };
                await triggerWebhook("LISTING_CREATED", newListing);
                setActiveListings([newListing, ...activeListings]);
                toast.success(`New mandate "${newListing.title}" published.`, { id: "listing" });
            }
            setModalMode(false);
        } catch (error) {
            toast.error("Operation failed.", { id: "listing" });
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            toast.loading("Uploading documents...", { id: 'upload' });
            try {
                await triggerWebhook("VDR_DOCUMENT_UPLOADED", { 
                    listingId: activeDataRoom?.id,
                    folder: activeFolder,
                    filesCount: e.target.files.length 
                });
                toast.success(`Securely uploaded ${e.target.files.length} document(s) to ${activeFolder || 'the Data Room'}.`, { id: 'upload' });
            } catch (err) {
                toast.error("Upload failed.", { id: 'upload' });
            }
        }
    };

    const closeDataRoom = () => {
        setActiveDataRoom(null);
        setActiveFolder(null);
        setViewingDocument(null);
    };

    // Mock Documents for the VDR
    const getDocsForFolder = (folderName: string) => {
        if (folderName.includes('Financial')) return ['2023_Audited_Financials.pdf', '2024_Q1_Q3_Interim.pdf', 'Trailing_12_Months_P&L.pdf'];
        if (folderName.includes('Legal')) return ['Articles_of_Incorporation.pdf', 'Active_Client_Contracts.pdf'];
        return ['General_Overview.pdf', 'Executive_Summary.pdf'];
    };

    return (
        <div className="space-y-8 max-w-[1400px] animate-fade-in text-white pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-[32px] font-serif font-bold text-white mb-2 tracking-tight">Active Listings</h2>
                    <p className="text-white/50 text-[15px]">Manage and monitor your firm's current sell-side mandates.</p>
                </div>
                <button 
                    onClick={() => { setModalMode('create'); setSelectedListing(null); }}
                    className="h-10 px-5 flex items-center justify-center gap-2 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-black font-semibold shadow-[0_0_15px_rgba(255,221,89,0.2)] transition-all text-[14px]"
                >
                    <Plus className="h-4 w-4" /> Create New Listing
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
                </div>
            ) : activeListings.length === 0 ? (
                <div className="text-center py-20 text-white/40">
                    No active listings found in the CRM pipeline.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeListings.map((listing) => (
                    <Card key={listing.id} className="bg-[#1A1A1A] border-[#2A2A2A] rounded-3xl overflow-hidden hover:border-brand-gold/30 transition-all duration-300 hover:-translate-y-1 group flex flex-col">
                        <div className="relative h-48 bg-[#1A1A1A]">
                            <img 
                                src={listing.imageUrl} 
                                alt={listing.title} 
                                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' }}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                            />
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedListing(listing); setModalMode('edit'); }}
                                    className="bg-black/60 hover:bg-black/80 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Edit2 className="h-3.5 w-3.5 text-white/80" />
                                </button>
                                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                    <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">{listing.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-[18px] font-bold text-white mb-2 line-clamp-1">{listing.title}</h3>
                            <div className="flex items-center gap-2 text-white/40 text-[13px] mb-6">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">{listing.location}</span>
                                <span className="mx-1">•</span>
                                <Building2 className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">{listing.industry}</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
                                <div>
                                    <p className="text-[11px] text-white/40 uppercase mb-1">Asking Price</p>
                                    <p className="text-[15px] font-bold text-white">${listing.askingPrice.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-white/40 uppercase mb-1">Cash Flow</p>
                                    <p className="text-[15px] font-bold text-brand-gold">${listing.cashflow.toLocaleString()}</p>
                                </div>
                            </div>

                            <button 
                                onClick={() => setActiveDataRoom(listing)}
                                className="w-full flex items-center justify-center gap-2 bg-[#222222] border border-white/5 hover:border-brand-gold/20 hover:bg-[#333333] text-white font-medium py-3 rounded-xl transition-colors text-[13px] mt-auto"
                            >
                                <Folder className="h-4 w-4 text-brand-gold/70" /> View Data Room
                                <ArrowRight className="h-3.5 w-3.5 text-white/40 group-hover:text-brand-gold transition-colors ml-1" />
                            </button>
                        </div>
                    </Card>
                ))}
                </div>
            )}

            {/* Create/Edit Listing Modal */}
            <Modal isOpen={modalMode !== false} onClose={() => setModalMode(false)} title={modalMode === 'edit' ? "Edit Listing" : "Create New Listing"}>
                <form onSubmit={handleListingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                            <label className="text-[13px] text-white/60">Listing Title *</label>
                            <input name="title" required defaultValue={modalMode === 'edit' && selectedListing ? selectedListing.title : ''} type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand-gold/50" placeholder="e.g. Apex Manufacturing" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[13px] text-white/60">Industry *</label>
                            <input name="industry" required defaultValue={modalMode === 'edit' && selectedListing ? selectedListing.industry : ''} type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand-gold/50" placeholder="e.g. Technology" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[13px] text-white/60">Location</label>
                            <input name="location" type="text" defaultValue={modalMode === 'edit' && selectedListing ? selectedListing.location : ''} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand-gold/50" placeholder="e.g. New York, NY" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[13px] text-white/60">Asking Price ($) *</label>
                            <input name="askingPrice" required defaultValue={modalMode === 'edit' && selectedListing ? selectedListing.askingPrice : ''} type="number" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand-gold/50" placeholder="0.00" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-[13px] text-white/60">Listing Photo URL</label>
                            <input name="imageUrl" type="url" defaultValue={modalMode === 'edit' && selectedListing ? selectedListing.imageUrl : ''} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand-gold/50" placeholder="https://images.unsplash.com/photo-..." />
                        </div>
                    </div>
                    
                    <div className="pt-4 flex items-center gap-3">
                        <button type="button" onClick={() => setModalMode(false)} className="flex-1 py-3 rounded-xl border border-[#2A2A2A] text-white/60 hover:text-white transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 py-3 rounded-xl bg-brand-gold text-black font-semibold hover:bg-brand-gold/90 transition-colors">
                            {modalMode === 'edit' ? "Save Changes" : "Publish Listing"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* In-Platform Document Viewer Overlay */}
            {viewingDocument && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col animate-fade-in">
                    <div className="h-16 border-b border-[#2A2A2A] bg-[#111] flex items-center justify-between px-6 shrink-0">
                        <div className="flex items-center gap-4">
                            <FolderLock className="h-5 w-5 text-brand-gold" />
                            <div>
                                <h3 className="text-[15px] font-bold text-white">{viewingDocument}</h3>
                                <p className="text-[12px] text-white/40">Secure View Only Mode (Downloads Disabled)</p>
                            </div>
                        </div>
                        <button onClick={() => setViewingDocument(null)} className="h-10 w-10 bg-[#222] hover:bg-brand-gold hover:text-black text-white/60 rounded-full flex items-center justify-center transition-all">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    
                    {/* Simulated PDF Viewer Frame */}
                    <div className="flex-1 bg-[#1A1A1A] m-6 rounded-2xl border border-[#2A2A2A] flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 blur-3xl pointer-events-none" />
                        
                        <div className="bg-white px-8 py-12 rounded shadow-2xl w-[90%] max-w-[800px] h-[90%] overflow-y-auto mt-4 text-black relative z-10 border border-white/10">
                            {/* Watermark */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
                                <p className="text-8xl font-black rotate-[-45deg] tracking-tighter">CONFIDENTIAL</p>
                            </div>
                            
                            <h1 className="text-3xl font-serif font-bold mb-6 text-[#111] border-b pb-4">Virtual Data Room Document</h1>
                            <h2 className="text-xl font-bold mb-4 text-[#333]">{viewingDocument.replace(/_/g, ' ')}</h2>
                            
                            <div className="space-y-4 text-[#444] leading-relaxed">
                                <p>This document is securely hosted within the Brokerage OS environment. It contains privileged operational and financial data pertaining to the mandate.</p>
                                <p>As part of our commitment to maintaining strict confidentiality for our M&A clients, native downloading and printing capabilities have been explicitly disabled.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <div className="h-px bg-gray-200 my-8" />
                                <div className="bg-gray-50 p-6 border-l-4 border-gray-400">
                                    <h4 className="font-bold text-gray-700 mb-2">Notice of Confidentiality</h4>
                                    <p className="text-sm">By viewing this document, you acknowledge that its contents are protected under the active Non-Disclosure Agreement (NDA) signed and filed on record.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Standard Data Room Overlay */}
            <Modal isOpen={!!activeDataRoom && !viewingDocument} onClose={closeDataRoom} title="Data Room Access">
                {activeDataRoom && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-[#1A1A1A] border border-[#2A2A2A] p-4 rounded-xl">
                            <div className="h-10 w-10 bg-[#222] border border-brand-gold/20 rounded-xl flex items-center justify-center shrink-0">
                                <FolderLock className="h-5 w-5 text-brand-gold" />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-white line-clamp-1">{activeDataRoom.title}</h4>
                                <p className="text-[13px] text-brand-gold mt-0.5">Secure Virtual Data Room (VDR)</p>
                            </div>
                        </div>

                        {!activeFolder ? (
                            <div className="space-y-3">
                                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest pl-1">VDR Directories</p>
                                {['Financial Statements 2021-2025', 'Legal & Corporate Governance', 'Operations & Employee Census', 'Marketing & Sales Due Diligence'].map((folder, i) => (
                                    <div key={i} onClick={() => setActiveFolder(folder)} className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-brand-gold/30 hover:bg-white/[0.02] cursor-pointer transition-all rounded-xl group">
                                        <div className="flex items-center gap-3">
                                            <Folder className="h-4 w-4 text-white/40 group-hover:text-brand-gold transition-colors" />
                                            <span className="text-[14px] font-medium text-white group-hover:text-brand-gold transition-colors">{folder}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-right">
                                            <span className="text-[12px] font-bold text-white/20 bg-white/5 px-2 py-0.5 rounded">{getDocsForFolder(folder).length} files</span>
                                            <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-brand-gold transition-colors block md:hidden lg:block hidden lg:block" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-3 animate-fade-in">
                                <div className="flex items-center gap-3 mb-4 border-b border-[#2A2A2A] pb-3">
                                    <button onClick={() => setActiveFolder(null)} className="h-7 w-7 bg-[#222] hover:bg-[#333] rounded-full flex items-center justify-center transition-colors">
                                        <ChevronLeft className="h-4 w-4 text-white" />
                                    </button>
                                    <p className="text-[14px] font-bold text-brand-gold truncate">{activeFolder}</p>
                                </div>
                                
                                {getDocsForFolder(activeFolder).map((doc, i) => (
                                    <div key={i} onClick={() => setViewingDocument(doc)} className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-brand-gold/50 cursor-pointer transition-all rounded-xl group relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex items-center gap-3 w-[70%]">
                                            <FileText className="h-5 w-5 text-indigo-400 group-hover:text-brand-gold transition-colors shrink-0" />
                                            <span className="text-[13px] font-medium text-white group-hover:text-brand-gold transition-colors truncate">{doc}</span>
                                        </div>
                                        <button className="flex items-center gap-1.5 bg-[#222] hover:bg-brand-gold hover:text-black text-white/60 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors">
                                            <Eye className="h-3.5 w-3.5" /> View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="pt-4 border-t border-[#2A2A2A] mt-8">
                            <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileUpload} />
                            <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-dashed border-[#2A2A2A] hover:border-brand-gold/50 hover:bg-brand-gold/5 text-white/60 hover:text-brand-gold transition-all group font-medium">
                                <Upload className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                                Upload Files to {activeFolder ? 'Folder' : 'VDR Root'}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
