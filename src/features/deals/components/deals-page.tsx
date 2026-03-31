import React, { useState, useEffect } from 'react';
import { useDeals } from '@/hooks/useGHL';
import { createOpportunity, updateOpportunity } from '@/services/api';
import { PIPELINES } from '@/config/ghl-config';
import { motion, AnimatePresence } from 'framer-motion';

import { Loader2, ChevronRight, Plus, LayoutList, Columns, GripVertical, FileText, MessageSquare, User2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/modal';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
    useDroppable,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const STAGES = [
    { id: PIPELINES.general.stages.new_contact, title: 'New Lead' },
    { id: PIPELINES.general.stages.review, title: 'In Review' },
    { id: PIPELINES.general.stages.scheduled, title: 'Meeting Scheduled' },
    { id: PIPELINES.general.stages.closed, title: 'Showed / Sold' }
];

// ─── Droppable Column Wrapper ──────────────────────────────
function DroppableColumn({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
        <div className="flex flex-col h-full min-w-[280px] bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-xl shadow-black/20">
            <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#161616]/50">
                <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">{title}</h3>
                <div className="h-4 w-4 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/30">
                    {React.Children.count(children)}
                </div>
            </div>
            <div ref={setNodeRef} className={`flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-3 p-3 transition-all duration-300 ${isOver ? 'bg-brand-gold/[0.03] ring-1 ring-brand-gold/20' : ''}`}>
                <AnimatePresence mode="popLayout">
                    {children}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── Sortable Deal Card ────────────────────────────────────
function SortableCard({ deal, isOverlay = false, onClickDeal }: { deal: any, isOverlay?: boolean, onClickDeal?: (d: any) => void }) {
    const {
        attributes, listeners, setNodeRef, transform, transition, isDragging,
    } = useSortable({ id: deal.id, data: { type: 'Deal', deal } });

    const style = { transform: CSS.Transform.toString(transform), transition };

    if (isDragging && !isOverlay) {
        return <div ref={setNodeRef} style={style} className="h-[90px] w-full bg-[#161616] border-2 border-dashed border-brand-gold/30 rounded-xl opacity-50" />;
    }

    return (
        <motion.div 
            ref={setNodeRef} style={style}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`bg-[#1A1A1A] border-[#2A2A2A] border hover:border-brand-gold/40 transition-all p-4 rounded-xl group relative select-none ${isOverlay ? 'shadow-2xl shadow-black/80 ring-2 ring-brand-gold scale-105 z-50 cursor-grabbing bg-[#222]' : 'cursor-grab active:cursor-grabbing hover:bg-[#1C1C1C]'}`}
        >
            <div className={`absolute left-0 top-3 bottom-3 w-1 bg-brand-gold/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-full ${isOverlay ? 'opacity-100' : ''}`} />
            {/* Drag handle area */}
            <div {...attributes} {...listeners} className="flex items-start justify-between mb-2">
                <p className={`text-[13px] font-bold transition-colors truncate max-w-[200px] leading-tight ${isOverlay ? 'text-brand-gold' : 'text-white/90 group-hover:text-white'}`}>{deal.title}</p>
                <div className="p-1 opacity-20 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="h-3.5 w-3.5 text-white/50" />
                </div>
            </div>
            {/* Clickable info area */}
            <div onClick={(e) => { e.stopPropagation(); onClickDeal?.(deal); }} className="cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] text-white/30 font-mono flex items-center gap-1.5 uppercase tracking-wider">
                        <FileText className="h-2.5 w-2.5" /> ID:{deal.id.slice(-4)}
                    </p>
                    <div className="flex items-center -space-x-1">
                        <div className="h-4 w-4 rounded-full border border-[#111] bg-[#333] flex items-center justify-center text-[8px] font-bold">JD</div>
                    </div>
                </div>
                <div className="flex items-end justify-between border-t border-white/[0.03] pt-3">
                    <div>
                        <p className="text-[9px] text-white/20 uppercase tracking-[0.1em] mb-0.5 font-bold">Pipeline Value</p>
                        <p className="text-[14px] font-black text-white/90 font-mono tracking-tight">${(deal.valuation || 0).toLocaleString()}</p>
                    </div>
                    <motion.div 
                        whileHover={{ x: 2 }}
                        className={`rounded-full p-1.5 transition-colors ${isOverlay ? 'bg-brand-gold text-black' : 'bg-white/5 text-white/30 group-hover:bg-brand-gold group-hover:text-black group-hover:shadow-[0_0_10px_rgba(197,157,95,0.4)]'}`}
                    >
                        <ChevronRight className="h-3 w-3" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default function DealsPage() {
    const { data: dealsData, isLoading, refetch } = useDeals();
    const [viewMode, setViewMode] = useState<'kanban'|'list'>('kanban');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<any>(null);
    const [dealNote, setDealNote] = useState('');
    const [dealNotes, setDealNotes] = useState<Record<string, string[]>>({});
    const [columns, setColumns] = useState<Record<string, any[]>>({});
    const [activeDeal, setActiveDeal] = useState<any>(null);

    // Initialize columns from API data
    useEffect(() => {
        if (dealsData) {
            const initialCols: Record<string, any[]> = {};
            STAGES.forEach(s => initialCols[s.id] = []);
            dealsData.forEach(deal => {
                const stageId = deal.stage || STAGES[0].id;
                if (initialCols[stageId]) {
                    initialCols[stageId].push(deal);
                } else {
                    // If stage doesn't match any column, put in first column
                    initialCols[STAGES[0].id].push(deal);
                }
            });
            setColumns(initialCols);
        }
    }, [dealsData]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Find which column a deal belongs to
    const findColumn = (dealId: string | number): string | undefined => {
        return Object.keys(columns).find(key => columns[key].some(d => d.id === dealId));
    };

    const handleDragStart = (event: DragStartEvent) => {
        const deal = event.active.data.current?.deal;
        if (deal) setActiveDeal(deal);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;
        if (active.id === over.id) return;

        const activeColumnId = findColumn(active.id);
        if (!activeColumnId) return;

        // Determine target column: either the column header's droppable id,
        // or the column containing the deal being hovered over
        let overColumnId: string | undefined;
        
        // Check if over is a column droppable
        if (STAGES.some(s => s.id === over.id)) {
            overColumnId = over.id as string;
        } else {
            // over is a deal card — find its column
            overColumnId = findColumn(over.id);
        }

        if (!overColumnId || activeColumnId === overColumnId) return;

        // Move deal between columns
        setColumns(prev => {
            const activeItems = [...prev[activeColumnId]];
            const overItems = [...prev[overColumnId!]];
            const activeIndex = activeItems.findIndex(d => d.id === active.id);
            if (activeIndex === -1) return prev;

            const [movedDeal] = activeItems.splice(activeIndex, 1);
            movedDeal.stage = overColumnId;

            // Insert at position if hovering over a deal, otherwise append
            const isOverADeal = over.data.current?.type === 'Deal';
            const overIndex = isOverADeal ? overItems.findIndex(d => d.id === over.id) : overItems.length;
            overItems.splice(overIndex >= 0 ? overIndex : overItems.length, 0, movedDeal);

            return { ...prev, [activeColumnId]: activeItems, [overColumnId!]: overItems };
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveDeal(null);
        if (!over) return;

        const activeColumnId = findColumn(active.id);
        
        // Determine the target column
        let overColumnId: string | undefined;
        if (STAGES.some(s => s.id === over.id)) {
            overColumnId = over.id as string;
        } else {
            overColumnId = findColumn(over.id);
        }

        if (!activeColumnId || !overColumnId) return;

        // Same column: reorder
        if (activeColumnId === overColumnId) {
            const items = columns[activeColumnId];
            const activeIndex = items.findIndex(d => d.id === active.id);
            const overIndex = items.findIndex(d => d.id === over.id);
            if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
                setColumns(prev => ({ ...prev, [activeColumnId]: arrayMove(items, activeIndex, overIndex) }));
            }
            return;
        }

        // Different column: sync to GHL
        const stageName = STAGES.find(s => s.id === overColumnId)?.title || 'Unknown';
        toast.promise(
            updateOpportunity(active.id as string, { pipelineStageId: overColumnId }),
            {
                loading: `Moving deal to ${stageName}...`,
                success: `Deal moved to ${stageName}. CRM synced.`,
                error: "Failed to update stage in CRM."
            }
        );
    };

    const handleCreateDeal = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = new FormData(e.currentTarget);
        const stageId = (form.get('stage') as string) || STAGES[0].id;
        try {
            await createOpportunity({
                name: form.get('name') as string,
                monetaryValue: Number(form.get('value')),
                pipelineId: import.meta.env.VITE_GHL_PIPELINE_ID || PIPELINES.general.id,
                pipelineStageId: stageId,
                contactId: '',
            });
            toast.success("Deal created in pipeline.");
            setIsAddModalOpen(false);
            refetch();
        } catch (error) {
            console.error("Deal creation failed:", error);
            toast.error("Failed to create opportunity.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const addDealNote = () => {
        if (!dealNote.trim() || !selectedDeal) return;
        setDealNotes(prev => ({
            ...prev,
            [selectedDeal.id]: [...(prev[selectedDeal.id] || []), dealNote]
        }));
        setDealNote('');
        toast.success('Note added to deal.');
    };

    const dropAnimation = { sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }) };

    return (
        <div className="h-[calc(100vh-120px)] w-full flex flex-col max-w-[1600px] animate-fade-in text-white/80 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
                <div>
                    <h2 className="text-[28px] font-serif font-bold text-white mb-1 tracking-tight">Active Pipeline</h2>
                    <p className="text-white/50 text-[13px]">Drag-and-drop board synced to CRM. Click a deal to view details.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-[#161616] border border-[#2A2A2A] rounded-xl p-1 hidden sm:flex">
                        <button onClick={() => setViewMode('kanban')} className={`px-3 py-1.5 flex items-center gap-1.5 text-[12px] font-semibold rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-[#222] text-white shadow' : 'text-white/40 hover:text-white'}`}>
                            <Columns className="h-3.5 w-3.5" /> Kanban
                        </button>
                        <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 flex items-center gap-1.5 text-[12px] font-semibold rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#222] text-white shadow' : 'text-white/40 hover:text-white'}`}>
                            <LayoutList className="h-3.5 w-3.5" /> List
                        </button>
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} className="h-9 px-4 flex items-center gap-2 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-black font-bold shadow-lg transition-all text-[12px]">
                        <Plus className="h-3.5 w-3.5"/> New Deal
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex-1 flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin text-brand-gold" /></div>
            ) : viewMode === 'kanban' ? (
                <DndContext 
                    sensors={sensors} 
                    collisionDetection={closestCorners} 
                    onDragStart={handleDragStart} 
                    onDragOver={handleDragOver} 
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex-1 flex gap-5 overflow-x-auto pb-4 hide-scrollbar relative items-stretch">
                        {STAGES.map(stage => {
                            const colDeals = columns[stage.id] || [];
                            return (
                                <DroppableColumn key={stage.id} id={stage.id} title={stage.title}>
                                    <SortableContext id={stage.id} items={colDeals.map(d => d.id)} strategy={verticalListSortingStrategy}>
                                        {colDeals.map(deal => (
                                            <SortableCard key={deal.id} deal={deal} onClickDeal={setSelectedDeal} />
                                        ))}
                                        {colDeals.length === 0 && (
                                            <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-xl opacity-20 p-8 min-h-[120px]">
                                                <Plus className="h-5 w-5 mb-2" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Drop Here</span>
                                            </div>
                                        )}
                                    </SortableContext>
                                </DroppableColumn>
                            );
                        })}
                    </div>
                    <DragOverlay dropAnimation={dropAnimation}>
                        {activeDeal ? (
                            <div className="w-[300px] cursor-grabbing rotate-2 scale-105 transition-transform">
                                <SortableCard deal={activeDeal} isOverlay />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            ) : (
                <div className="flex-1 overflow-y-auto bg-[#161616] border border-[#2A2A2A] rounded-2xl p-0">
                    <table className="w-full text-left">
                        <thead className="bg-[#111111] border-b border-[#2A2A2A] sticky top-0 z-10">
                            <tr>
                                <th className="p-4 pl-6 text-[11px] font-bold text-white/40 uppercase tracking-widest">Name</th>
                                <th className="p-4 text-[11px] font-bold text-white/40 uppercase tracking-widest">Stage</th>
                                <th className="p-4 text-[11px] font-bold text-white/40 uppercase tracking-widest text-right pr-6">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2A2A2A]">
                            {dealsData?.map(deal => (
                                <tr key={deal.id} className="hover:bg-[#1A1A1A] transition-colors cursor-pointer group" onClick={() => setSelectedDeal(deal)}>
                                    <td className="p-4 pl-6 font-semibold text-[14px] text-white group-hover:text-brand-gold transition-colors">{deal.title}</td>
                                    <td className="p-4"><span className="bg-[#222] text-white/80 border border-[#333] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">{STAGES.find(s => s.id === (deal.stage as string))?.title || deal.stage}</span></td>
                                    <td className="p-4 pr-6 text-right font-mono text-[13px]">${(deal.valuation || 0).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create Deal Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Opportunity">
                <form onSubmit={handleCreateDeal} className="space-y-4">
                    <div>
                        <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest mb-1.5 block">Deal Name</label>
                        <input name="name" required type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[13px] text-white focus:outline-none focus:border-brand-gold/50 transition-colors" placeholder="Acme Corp Mandate" />
                    </div>
                    <div>
                        <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest mb-1.5 block">Estimated Value ($)</label>
                        <input name="value" required type="number" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[13px] text-white focus:outline-none focus:border-brand-gold/50 transition-colors" placeholder="5000000" />
                    </div>
                    <div>
                        <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest mb-1.5 block">Initial Stage</label>
                        <select name="stage" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[13px] text-white focus:outline-none focus:border-brand-gold/50 appearance-none">
                            {STAGES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                        </select>
                    </div>
                    <div className="pt-3 flex gap-3 justify-end border-t border-[#2A2A2A] mt-4">
                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-[12px] font-bold text-white/60 hover:text-white">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="bg-brand-gold text-black px-5 py-2 rounded-xl font-bold text-[12px] hover:bg-brand-gold/90 flex items-center justify-center min-w-[100px]">
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Deal"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Deal Detail Modal */}
            <Modal isOpen={!!selectedDeal} onClose={() => setSelectedDeal(null)} title={selectedDeal?.title || 'Deal Details'} maxWidth="max-w-lg">
                {selectedDeal && (
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#1A1A1A] p-3 rounded-xl border border-[#2A2A2A]">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Value</p>
                                <p className="text-[16px] font-serif font-bold text-white">${(selectedDeal.valuation || 0).toLocaleString()}</p>
                            </div>
                            <div className="bg-[#1A1A1A] p-3 rounded-xl border border-[#2A2A2A]">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Stage</p>
                                <p className="text-[14px] font-bold text-brand-gold capitalize">{STAGES.find(s => s.id === selectedDeal.stage)?.title || selectedDeal.stage?.replace(/_/g, ' ') || 'New'}</p>
                            </div>
                            <div className="bg-[#1A1A1A] p-3 rounded-xl border border-[#2A2A2A]">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Deal ID</p>
                                <p className="text-[12px] text-white/60 font-mono">{selectedDeal.id.slice(-12)}</p>
                            </div>
                            <div className="bg-[#1A1A1A] p-3 rounded-xl border border-[#2A2A2A]">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Assigned</p>
                                <p className="text-[12px] text-brand-gold font-bold flex items-center gap-1.5"><User2 className="h-3 w-3" /> Olivia Martin</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5 block">Move to Stage</label>
                            <div className="flex gap-2">
                                {STAGES.map(s => (
                                    <button key={s.id} onClick={() => {
                                        toast.promise(updateOpportunity(selectedDeal.id, { pipelineStageId: s.id }), {
                                            loading: `Moving to ${s.title}...`,
                                            success: `Moved to ${s.title}`,
                                            error: 'Failed to update'
                                        });
                                    }} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${selectedDeal.stage === s.id ? 'bg-brand-gold/20 border-brand-gold text-brand-gold border' : 'bg-[#1A1A1A] border border-[#2A2A2A] hover:border-brand-gold/50 text-white/60 hover:text-brand-gold'}`}>
                                        {s.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><MessageSquare className="h-3 w-3" /> Notes</label>
                            <div className="space-y-2 mb-3 max-h-[120px] overflow-y-auto hide-scrollbar">
                                {(dealNotes[selectedDeal.id] || []).map((n, i) => (
                                    <div key={i} className="bg-[#1A1A1A] border border-[#2A2A2A] p-2.5 rounded-lg text-[12px] text-white/70">{n}</div>
                                ))}
                                {!(dealNotes[selectedDeal.id]?.length) && <p className="text-[11px] text-white/30 italic">No notes yet.</p>}
                            </div>
                            <div className="flex gap-2">
                                <input type="text" value={dealNote} onChange={e => setDealNote(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addDealNote(); }} placeholder="Add a note..." className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] p-2.5 rounded-xl text-[12px] text-white focus:outline-none focus:border-brand-gold/50" />
                                <button onClick={addDealNote} className="px-4 py-2.5 bg-brand-gold text-black rounded-xl font-bold text-[11px]">Add</button>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><FileText className="h-3 w-3" /> Attachments</label>
                            <button onClick={() => toast.success('File upload initiated.')} className="w-full py-3 border-2 border-dashed border-[#2A2A2A] hover:border-brand-gold/50 rounded-xl flex items-center justify-center gap-2 text-[12px] text-white/40 hover:text-brand-gold transition-colors">
                                <Upload className="h-4 w-4" /> Drop files or click to upload
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
