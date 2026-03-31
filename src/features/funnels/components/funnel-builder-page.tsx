import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { 
    DndContext, DragOverlay, closestCorners, useSensor, useSensors, 
    PointerSensor, KeyboardSensor, DragStartEvent, DragEndEvent,
    useDroppable
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Type, Layout, AlignLeft, Send, Settings, Copy, Monitor, Smartphone, Globe, Code, Plus, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createContact, triggerWebhook } from '@/services/api';

// ─── Element Types ─────────────────────────────────────────
const ELEMENT_TYPES = [
    { type: 'heading', label: 'Heading', icon: Type, defaults: { type: 'heading', text: 'Your Title Here', size: 'h1', align: 'left' } },
    { type: 'text', label: 'Paragraph', icon: AlignLeft, defaults: { type: 'text', text: 'Describe your offer or instructions here.', align: 'left' } },
    { type: 'input', label: 'Text Input', icon: Layout, defaults: { type: 'input', label: 'First Name', placeholder: 'Enter your name', required: false, ghlField: 'firstName' } },
    { type: 'email', label: 'Email Input', icon: Layout, defaults: { type: 'email', label: 'Email Address', placeholder: 'name@email.com', required: true, ghlField: 'email' } },
    { type: 'phone', label: 'Phone Input', icon: Layout, defaults: { type: 'phone', label: 'Phone Number', placeholder: '+1 (555) 000-0000', required: true, ghlField: 'phone' } },
    { type: 'textarea', label: 'Long Text', icon: AlignLeft, defaults: { type: 'textarea', label: 'Message', placeholder: 'Type here...', required: false, ghlField: 'custom' } },
    { type: 'select', label: 'Dropdown', icon: Layout, defaults: { type: 'select', label: 'Select Option', options: 'Option A, Option B, Option C', required: false, ghlField: 'custom' } },
    { type: 'button', label: 'Submit', icon: Send, defaults: { type: 'button', text: 'Submit Request', color: '#C59D5F' } }
];

// ─── Template Presets ──────────────────────────────────────
const TEMPLATES: Record<string, any[]> = {
    buyer: [
        { type: 'heading', props: { type: 'heading', text: 'Buyer Intake Form', size: 'h1', align: 'center' } },
        { type: 'text', props: { type: 'text', text: 'Tell us about the type of business you are looking to acquire.', align: 'center' } },
        { type: 'input', props: { type: 'input', label: 'Full Name', placeholder: 'John Doe', required: true, ghlField: 'firstName' } },
        { type: 'email', props: { type: 'email', label: 'Email Address', placeholder: 'name@email.com', required: true, ghlField: 'email' } },
        { type: 'phone', props: { type: 'phone', label: 'Phone Number', placeholder: '+1 (555) 000-0000', required: true, ghlField: 'phone' } },
        { type: 'select', props: { type: 'select', label: 'Target Industry', options: 'SaaS, Healthcare, E-Commerce, Manufacturing, Other', required: true, ghlField: 'custom' } },
        { type: 'input', props: { type: 'input', label: 'Budget Range', placeholder: 'e.g. $500K - $2M', required: false, ghlField: 'custom' } },
        { type: 'textarea', props: { type: 'textarea', label: 'Additional Notes', placeholder: 'Anything else we should know...', required: false, ghlField: 'custom' } },
        { type: 'button', props: { type: 'button', text: 'Submit Buyer Profile', color: '#C59D5F' } },
    ],
    seller: [
        { type: 'heading', props: { type: 'heading', text: 'Free Business Valuation', size: 'h1', align: 'center' } },
        { type: 'text', props: { type: 'text', text: 'Get a preliminary valuation estimate in under 5 minutes.', align: 'center' } },
        { type: 'input', props: { type: 'input', label: 'Business Name', placeholder: 'Acme Corp', required: true, ghlField: 'companyName' } },
        { type: 'input', props: { type: 'input', label: 'Your Name', placeholder: 'Full name', required: true, ghlField: 'firstName' } },
        { type: 'email', props: { type: 'email', label: 'Email', placeholder: 'owner@business.com', required: true, ghlField: 'email' } },
        { type: 'input', props: { type: 'input', label: 'Annual Revenue', placeholder: '$2,000,000', required: true, ghlField: 'custom' } },
        { type: 'input', props: { type: 'input', label: 'EBITDA / SDE', placeholder: '$500,000', required: false, ghlField: 'custom' } },
        { type: 'select', props: { type: 'select', label: 'Reason for Selling', options: 'Retirement, Partnership Dispute, Growth Capital, Market Timing, Other', required: false, ghlField: 'custom' } },
        { type: 'button', props: { type: 'button', text: 'Get My Valuation', color: '#C59D5F' } },
    ],
    nda: [
        { type: 'heading', props: { type: 'heading', text: 'NDA & Confidentiality Request', size: 'h2', align: 'left' } },
        { type: 'text', props: { type: 'text', text: 'Fill out the form below to request access to confidential deal materials.', align: 'left' } },
        { type: 'input', props: { type: 'input', label: 'Full Legal Name', placeholder: 'As appears on ID', required: true, ghlField: 'firstName' } },
        { type: 'email', props: { type: 'email', label: 'Email Address', placeholder: 'name@firm.com', required: true, ghlField: 'email' } },
        { type: 'input', props: { type: 'input', label: 'Company / Fund Name', placeholder: 'Your firm', required: true, ghlField: 'companyName' } },
        { type: 'phone', props: { type: 'phone', label: 'Phone Number', placeholder: '+1 (555) 000-0000', required: false, ghlField: 'phone' } },
        { type: 'button', props: { type: 'button', text: 'Submit NDA Request', color: '#111111' } },
    ],
};

// ─── Canvas Item (drag-sortable) ───────────────────────────
function CanvasItem({ item, selectedId, onSelect, onRemove, isOverlay = false }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item.id,
        data: { type: 'CanvasItem', item }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging && !isOverlay) {
        return <div ref={setNodeRef} style={style} className="h-[60px] w-full bg-brand-gold/10 border-2 border-dashed border-brand-gold/50 rounded-lg" />;
    }

    const isSelected = selectedId === item.id;

    const renderContent = () => {
        const t = item.props.type || item.type;
        switch (t) {
            case 'heading': {
                const sizeClass = item.props.size === 'h1' ? 'text-3xl' : item.props.size === 'h2' ? 'text-2xl' : 'text-xl';
                const hProps = { className: `${sizeClass} font-serif font-bold text-[#111]`, style: { textAlign: item.props.align as any } };
                return item.props.size === 'h2' ? <h2 {...hProps}>{item.props.text}</h2> : item.props.size === 'h3' ? <h3 {...hProps}>{item.props.text}</h3> : <h1 {...hProps}>{item.props.text}</h1>;
            }
            case 'text':
                return <p className="text-gray-600 text-sm" style={{ textAlign: item.props.align }}>{item.props.text}</p>;
            case 'input':
            case 'email':
            case 'phone':
                return (
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-bold text-gray-700">{item.props.label} {item.props.required && <span className="text-red-500">*</span>}</label>
                        <input disabled placeholder={item.props.placeholder} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm" />
                    </div>
                );
            case 'textarea':
                return (
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-bold text-gray-700">{item.props.label} {item.props.required && <span className="text-red-500">*</span>}</label>
                        <textarea disabled placeholder={item.props.placeholder} rows={3} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm resize-none" />
                    </div>
                );
            case 'select':
                return (
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-bold text-gray-700">{item.props.label} {item.props.required && <span className="text-red-500">*</span>}</label>
                        <select disabled className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm appearance-none text-gray-400">
                            <option>Select...</option>
                            {(item.props.options || '').split(',').map((opt: string, i: number) => (
                                <option key={i}>{opt.trim()}</option>
                            ))}
                        </select>
                    </div>
                );
            case 'button':
                return (
                    <button disabled className="w-full text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md mt-2" style={{ backgroundColor: item.props.color }}>
                        {item.props.text}
                    </button>
                );
            default:
                return <div className="text-gray-400 text-sm italic">Unknown element: {t}</div>;
        }
    };

    return (
        <div 
            ref={setNodeRef}
            style={style}
            onClick={() => onSelect(item.id)}
            className={`relative p-4 rounded-xl group transition-all ${isSelected ? 'ring-2 ring-brand-gold bg-blue-50/10' : 'hover:ring-1 hover:ring-brand-gold/50'} ${isOverlay ? 'shadow-2xl scale-105 bg-white z-50 cursor-grabbing' : 'bg-transparent cursor-grab active:cursor-grabbing'}`}
        >
            <div className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 p-1.5 bg-red-500 text-white rounded-full text-xs opacity-0 ${isSelected ? 'opacity-100 hover:scale-110 cursor-pointer' : 'group-hover:opacity-100'}`} onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}>
                ✕
            </div>
            <div {...attributes} {...listeners} className="pointer-events-none">
                {renderContent()}
            </div>
        </div>
    );
}

// ─── Palette Item (click or drag to add) ───────────────────
function PaletteItem({ type, label, icon: Icon, onClickAdd }: any) {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
        id: `palette-${type}`,
        data: { type: 'PaletteItem', elementType: type }
    });

    return (
        <div 
            ref={setNodeRef} 
            {...attributes} 
            {...listeners}
            onClick={() => onClickAdd(type)}
            className={`flex flex-col items-center justify-center p-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl cursor-grab hover:border-brand-gold/50 hover:bg-[#222] transition-colors gap-2 ${isDragging ? 'opacity-50' : ''}`}
        >
            <Icon className="h-5 w-5 text-brand-gold" />
            <span className="text-[11px] font-bold text-white/60 tracking-wider uppercase">{label}</span>
        </div>
    );
}

// ─── Droppable Canvas Wrapper ──────────────────────────────
function DroppableCanvas({ children }: { children: React.ReactNode }) {
    const { setNodeRef, isOver } = useDroppable({ id: 'canvas-drop-zone' });
    return (
        <div ref={setNodeRef} className={`transition-all ${isOver ? 'ring-2 ring-brand-gold/30' : ''}`} style={{ minHeight: '100%' }}>
            {children}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────
export default function FunnelBuilderPage() {
    const [elements, setElements] = useState<any[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [showEmbedCode, setShowEmbedCode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), useSensor(KeyboardSensor));

    const selectedElement = elements.find(e => e.id === selectedElementId);

    // ─── Click-to-Add from palette ─────────────────────────
    const addElementByClick = useCallback((elementType: string) => {
        const config = ELEMENT_TYPES.find(t => t.type === elementType);
        if (!config) return;
        const newElement = {
            id: `elem_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            type: config.type,
            props: { ...config.defaults }
        };
        setElements(prev => [...prev, newElement]);
        setSelectedElementId(newElement.id);
    }, []);

    // ─── Template Loader ───────────────────────────────────
    const loadTemplate = (key: string) => {
        const template = TEMPLATES[key];
        if (!template) return;
        setElements(template.map((el, i) => ({
            id: `tpl_${key}_${i}_${Date.now()}`,
            type: el.type,
            props: { ...el.props }
        })));
        setSelectedElementId(null);
        setFormSubmitted(false);
        setFormValues({});
        toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} template loaded.`);
    };

    // ─── DnD Handlers ──────────────────────────────────────
    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null);
        const { active, over } = event;
        if (!over) return;

        const isFromPalette = active.data.current?.type === 'PaletteItem';
        const isFromCanvas = active.data.current?.type === 'CanvasItem';
        const isOverCanvas = over.id === 'canvas-drop-zone' || elements.some(e => e.id === over.id);

        if (isFromPalette && isOverCanvas) {
            const elementType = active.data.current?.elementType;
            const config = ELEMENT_TYPES.find(t => t.type === elementType);
            if (config) {
                const newElement = {
                    id: `elem_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                    type: config.type,
                    props: { ...config.defaults }
                };
                const overIndex = elements.findIndex(e => e.id === over.id);
                setElements(prev => {
                    const next = [...prev];
                    if (overIndex >= 0) {
                        next.splice(overIndex + 1, 0, newElement);
                    } else {
                        next.push(newElement);
                    }
                    return next;
                });
                setSelectedElementId(newElement.id);
            }
        } else if (isFromCanvas && isOverCanvas) {
            const activeIndex = elements.findIndex(e => e.id === active.id);
            const overIndex = elements.findIndex(e => e.id === over.id);
            if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
                setElements(items => arrayMove(items, activeIndex, overIndex));
            }
        }
    };

    const updateSelectedProps = (updates: any) => {
        setElements(prev => prev.map(e => e.id === selectedElementId ? { ...e, props: { ...e.props, ...updates } } : e));
    };

    const removeElement = (id: string) => {
        setElements(prev => prev.filter(e => e.id !== id));
        if (selectedElementId === id) setSelectedElementId(null);
    };

    // ─── Form Submission to GHL ────────────────────────────
    const handleFormSubmit = async () => {
        // Validate required fields
        const fieldElements = elements.filter(e => ['input', 'email', 'phone', 'textarea', 'select'].includes(e.props.type || e.type));
        const missingFields: string[] = [];
        
        for (const el of fieldElements) {
            if (el.props.required && !formValues[el.id]?.trim()) {
                missingFields.push(el.props.label);
            }
        }
        
        if (missingFields.length > 0) {
            toast.error(`Required: ${missingFields.join(', ')}`);
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Build contact payload from field mappings
            const contactPayload: any = {};
            const customFields: Record<string, string> = {};
            
            for (const el of fieldElements) {
                const value = formValues[el.id] || '';
                const field = el.props.ghlField;
                
                if (field && field !== 'custom') {
                    contactPayload[field] = value;
                } else {
                    customFields[`BROKERAGEOS_${el.props.label.replace(/\s+/g, '_').toLowerCase()}`] = value;
                }
            }

            // Create contact in GHL
            await createContact({
                firstName: contactPayload.firstName || '',
                lastName: contactPayload.lastName || '',
                email: contactPayload.email || '',
                phone: contactPayload.phone || '',
                tags: ['funnel_submission'],
                customFields: Object.entries(customFields).map(([key, value]) => ({ key, field_value: value })),
            });

            // Trigger webhook
            await triggerWebhook('funnel_form_submission', {
                ...contactPayload,
                ...customFields,
                funnelName: elements.find(e => (e.props.type || e.type) === 'heading')?.props.text || 'Untitled Form',
                submittedAt: new Date().toISOString(),
            });

            setFormSubmitted(true);
            toast.success('Form submitted — contact created in CRM.');
        } catch (err) {
            console.error('[Funnel] Submission error:', err);
            toast.error('Submission failed. Check console.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateEmbedCode = () => {
        const jsonConfig = JSON.stringify(elements, null, 2);
        return `<script src="https://assets.brokerageos.com/funnel.js"></script>\n<div id="bos-funnel-root" data-config='${jsonConfig}'></div>`;
    };

    // ─── Render ────────────────────────────────────────────
    return (
        <div className="h-[calc(100vh-120px)] w-full flex flex-col max-w-[1600px] animate-fade-in pb-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 shrink-0">
                <div>
                    <h2 className="text-[28px] font-serif font-bold text-white mb-1 tracking-tight">Form Builder</h2>
                    <p className="text-white/50 text-[13px]">Visual intake form builder with GHL field mapping and live preview.</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex bg-[#161616] border border-[#2A2A2A] rounded-xl p-1">
                        <button onClick={() => loadTemplate('buyer')} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-brand-gold hover:bg-[#222] rounded-lg transition-all">Buyer</button>
                        <button onClick={() => loadTemplate('seller')} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-brand-gold hover:bg-[#222] rounded-lg transition-all">Seller</button>
                        <button onClick={() => loadTemplate('nda')} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-brand-gold hover:bg-[#222] rounded-lg transition-all">NDA</button>
                    </div>
                    <button onClick={() => { setPreviewMode(!previewMode); setFormSubmitted(false); setFormValues({}); }} className={`h-9 px-4 flex items-center gap-2 rounded-xl border font-bold text-[12px] transition-all ${previewMode ? 'bg-brand-gold text-black border-brand-gold' : 'bg-[#222] hover:bg-[#333] border-[#333] text-white'}`}>
                        {previewMode ? '← Edit Mode' : '▶ Preview'}
                    </button>
                    <button onClick={() => setShowEmbedCode(true)} className="h-9 px-4 flex items-center gap-2 rounded-xl bg-[#222] hover:bg-[#333] border border-[#333] text-white font-semibold transition-all text-[12px]">
                        <Code className="h-3.5 w-3.5"/> Embed
                    </button>
                    <button onClick={() => { toast.success("Form configuration saved."); }} className="h-9 px-4 flex items-center gap-2 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-black font-bold shadow-lg transition-all text-[12px]">
                        <Globe className="h-3.5 w-3.5"/> Save & Deploy
                    </button>
                </div>
            </div>

            {/* ─── Preview Mode ─────────────────────────────── */}
            {previewMode ? (
                <div className="flex-1 flex justify-center overflow-y-auto hide-scrollbar py-8 bg-[#0A0A0A] rounded-3xl border border-[#2A2A2A]">
                    <div className={`bg-white rounded-3xl shadow-2xl transition-all duration-300 relative border border-gray-200 self-start ${viewMode === 'desktop' ? 'w-[800px] p-12' : 'w-[375px] p-6'}`}>
                        {formSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <CheckCircle className="h-16 w-16 text-[#10B981] mb-4" />
                                <h3 className="text-2xl font-serif font-bold text-[#111] mb-2">Submission Received!</h3>
                                <p className="text-gray-500 text-sm">A new contact has been created in your CRM and the assigned advisor will follow up shortly.</p>
                                <button onClick={() => { setFormSubmitted(false); setFormValues({}); }} className="mt-6 text-sm font-bold text-brand-gold hover:underline">Submit another response</button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {elements.map(el => {
                                    const t = el.props.type || el.type;
                                    switch (t) {
                                        case 'heading': {
                                            const sizeClass = el.props.size === 'h1' ? 'text-3xl' : el.props.size === 'h2' ? 'text-2xl' : 'text-xl';
                                            const hProps = { key: el.id, className: `${sizeClass} font-serif font-bold text-[#111]`, style: { textAlign: el.props.align as any } };
                                            return el.props.size === 'h2' ? <h2 {...hProps}>{el.props.text}</h2> : el.props.size === 'h3' ? <h3 {...hProps}>{el.props.text}</h3> : <h1 {...hProps}>{el.props.text}</h1>;
                                        }
                                        case 'text':
                                            return <p key={el.id} className="text-gray-600 text-sm" style={{ textAlign: el.props.align }}>{el.props.text}</p>;
                                        case 'input':
                                        case 'email':
                                        case 'phone':
                                            return (
                                                <div key={el.id} className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-bold text-gray-700">{el.props.label} {el.props.required && <span className="text-red-500">*</span>}</label>
                                                    <input
                                                        type={t === 'email' ? 'email' : t === 'phone' ? 'tel' : 'text'}
                                                        placeholder={el.props.placeholder}
                                                        value={formValues[el.id] || ''}
                                                        onChange={e => setFormValues(prev => ({ ...prev, [el.id]: e.target.value }))}
                                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#C59D5F] focus:ring-1 focus:ring-[#C59D5F]/30 transition-colors"
                                                    />
                                                </div>
                                            );
                                        case 'textarea':
                                            return (
                                                <div key={el.id} className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-bold text-gray-700">{el.props.label} {el.props.required && <span className="text-red-500">*</span>}</label>
                                                    <textarea
                                                        placeholder={el.props.placeholder}
                                                        rows={3}
                                                        value={formValues[el.id] || ''}
                                                        onChange={e => setFormValues(prev => ({ ...prev, [el.id]: e.target.value }))}
                                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-[#C59D5F] focus:ring-1 focus:ring-[#C59D5F]/30 transition-colors"
                                                    />
                                                </div>
                                            );
                                        case 'select':
                                            return (
                                                <div key={el.id} className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-bold text-gray-700">{el.props.label} {el.props.required && <span className="text-red-500">*</span>}</label>
                                                    <select
                                                        value={formValues[el.id] || ''}
                                                        onChange={e => setFormValues(prev => ({ ...prev, [el.id]: e.target.value }))}
                                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm appearance-none focus:outline-none focus:border-[#C59D5F] focus:ring-1 focus:ring-[#C59D5F]/30 transition-colors"
                                                    >
                                                        <option value="">Select...</option>
                                                        {(el.props.options || '').split(',').map((opt: string, i: number) => (
                                                            <option key={i} value={opt.trim()}>{opt.trim()}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            );
                                        case 'button':
                                            return (
                                                <button
                                                    key={el.id}
                                                    onClick={handleFormSubmit}
                                                    disabled={isSubmitting}
                                                    className="w-full text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md mt-2 hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                                                    style={{ backgroundColor: el.props.color }}
                                                >
                                                    {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : el.props.text}
                                                </button>
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                                {elements.length === 0 && (
                                    <div className="text-center py-16 text-gray-400">
                                        <p className="text-lg font-bold text-gray-300">No elements</p>
                                        <p className="text-sm">Switch to Edit mode and add components first.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* ─── Edit Mode ───────────────────────────────── */
                <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className="flex-1 flex gap-5 min-h-0 min-w-0">
                        
                        {/* Left Sidebar: Components Palette */}
                        <Card className="w-[260px] shrink-0 bg-[#161616] border-[#2A2A2A] rounded-2xl p-5 flex flex-col overflow-y-auto hide-scrollbar">
                            <div className="mb-4">
                                <h3 className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-0.5">Components</h3>
                                <p className="text-[11px] text-white/30">Drag or click to add.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                {ELEMENT_TYPES.map(config => (
                                    <PaletteItem key={config.type} {...config} onClickAdd={addElementByClick} />
                                ))}
                            </div>
                        </Card>

                        {/* Center: Canvas Workspace */}
                        <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A] rounded-2xl border border-[#2A2A2A] relative overflow-hidden">
                            {/* Device Toggle */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center bg-[#161616] border border-[#2A2A2A] rounded-full p-0.5 z-10">
                                <button onClick={() => setViewMode('desktop')} className={`p-1.5 rounded-full transition-all ${viewMode === 'desktop' ? 'bg-[#2A2A2A] text-brand-gold' : 'text-white/40 hover:text-white'}`}>
                                    <Monitor className="h-3.5 w-3.5" />
                                </button>
                                <button onClick={() => setViewMode('mobile')} className={`p-1.5 rounded-full transition-all ${viewMode === 'mobile' ? 'bg-[#2A2A2A] text-brand-gold' : 'text-white/40 hover:text-white'}`}>
                                    <Smartphone className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            {/* Canvas Dropzone */}
                            <div className="flex-1 overflow-y-auto hide-scrollbar py-16 flex justify-center w-full">
                                <SortableContext id="canvas" items={elements.map(e => e.id)} strategy={verticalListSortingStrategy}>
                                    <DroppableCanvas>
                                        <div className={`bg-white rounded-3xl shadow-2xl overflow-y-auto transition-all duration-300 relative border border-gray-200 ${viewMode === 'desktop' ? 'w-[700px] min-h-[500px] p-10' : 'w-[375px] min-h-[700px] p-6'}`}>
                                            {elements.length === 0 ? (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                                    <Layout className="h-14 w-14 mb-3 opacity-20" />
                                                    <p className="text-lg font-serif font-bold text-gray-300">Start Building</p>
                                                    <p className="text-sm mb-4">Drag components here or click them in the palette.</p>
                                                    <button onClick={() => loadTemplate('seller')} className="text-sm font-bold text-[#C59D5F] hover:underline flex items-center gap-1">
                                                        <Plus className="h-3.5 w-3.5" /> Load a template
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-2 flex flex-col">
                                                    {elements.map(el => (
                                                        <CanvasItem key={el.id} item={el} selectedId={selectedElementId} onSelect={setSelectedElementId} onRemove={removeElement} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </DroppableCanvas>
                                </SortableContext>
                            </div>
                        </div>

                        {/* Right Sidebar: Properties Panel */}
                        <Card className="w-[300px] shrink-0 bg-[#161616] border-[#2A2A2A] rounded-2xl p-5 flex flex-col overflow-y-auto hide-scrollbar">
                            <div className="mb-4 flex items-center justify-between border-b border-[#2A2A2A] pb-3">
                                <div className="flex items-center gap-2">
                                    <Settings className="h-3.5 w-3.5 text-brand-gold" />
                                    <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">Properties</h3>
                                </div>
                            </div>

                            {!selectedElement ? (
                                <div className="text-center text-white/30 text-[12px] py-8">Select an element on the canvas to configure.</div>
                            ) : (
                                <div className="space-y-4 animate-fade-in">
                                    <div>
                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1 block">Type</label>
                                        <div className="px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white/50 text-[12px] capitalize">{selectedElement.type} Block</div>
                                    </div>

                                    {(selectedElement.type === 'heading') && (
                                        <>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Text</label>
                                                <input type="text" value={selectedElement.props.text || ''} onChange={(e) => updateSelectedProps({ text: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-brand-gold/50 rounded-lg p-2.5 text-[12px] text-white outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Size</label>
                                                <select value={selectedElement.props.size || 'h1'} onChange={(e) => updateSelectedProps({ size: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-2.5 text-[12px] text-white outline-none appearance-none">
                                                    <option value="h1">Heading 1</option>
                                                    <option value="h2">Heading 2</option>
                                                    <option value="h3">Heading 3</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Alignment</label>
                                                <div className="flex bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-0.5">
                                                    {['left', 'center', 'right'].map(a => (
                                                        <button key={a} onClick={() => updateSelectedProps({ align: a })} className={`flex-1 py-1.5 text-[11px] font-bold capitalize rounded-md ${selectedElement.props.align === a ? 'bg-[#333] text-white' : 'text-white/40'}`}>{a}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {selectedElement.type === 'text' && (
                                        <>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Paragraph</label>
                                                <textarea rows={3} value={selectedElement.props.text || ''} onChange={(e) => updateSelectedProps({ text: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-brand-gold/50 rounded-lg p-2.5 text-[12px] text-white outline-none resize-none" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Alignment</label>
                                                <div className="flex bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-0.5">
                                                    {['left', 'center', 'right'].map(a => (
                                                        <button key={a} onClick={() => updateSelectedProps({ align: a })} className={`flex-1 py-1.5 text-[11px] font-bold capitalize rounded-md ${selectedElement.props.align === a ? 'bg-[#333] text-white' : 'text-white/40'}`}>{a}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {['input', 'email', 'phone', 'textarea'].includes(selectedElement.type) && (
                                        <>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Field Label</label>
                                                <input type="text" value={selectedElement.props.label || ''} onChange={(e) => updateSelectedProps({ label: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-brand-gold/50 rounded-lg p-2.5 text-[12px] text-white outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Placeholder</label>
                                                <input type="text" value={selectedElement.props.placeholder || ''} onChange={(e) => updateSelectedProps({ placeholder: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-brand-gold/50 rounded-lg p-2.5 text-[12px] text-white outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Map to CRM</label>
                                                <select value={selectedElement.props.ghlField || 'custom'} onChange={(e) => updateSelectedProps({ ghlField: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-2.5 text-[12px] text-white outline-none appearance-none font-mono">
                                                    <option value="firstName">Contact: First Name</option>
                                                    <option value="lastName">Contact: Last Name</option>
                                                    <option value="email">Contact: Email</option>
                                                    <option value="phone">Contact: Phone</option>
                                                    <option value="companyName">Contact: Company</option>
                                                    <option value="custom">Custom / Tag</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center justify-between pt-1">
                                                <span className="text-[11px] font-bold text-white/70">Required</span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" checked={selectedElement.props.required || false} onChange={e => updateSelectedProps({ required: e.target.checked })} />
                                                    <div className="w-9 h-5 bg-[#333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-gold"></div>
                                                </label>
                                            </div>
                                        </>
                                    )}

                                    {selectedElement.type === 'select' && (
                                        <>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Label</label>
                                                <input type="text" value={selectedElement.props.label || ''} onChange={(e) => updateSelectedProps({ label: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-brand-gold/50 rounded-lg p-2.5 text-[12px] text-white outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Options (comma separated)</label>
                                                <textarea rows={2} value={selectedElement.props.options || ''} onChange={(e) => updateSelectedProps({ options: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-brand-gold/50 rounded-lg p-2.5 text-[12px] text-white outline-none resize-none" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Map to CRM</label>
                                                <select value={selectedElement.props.ghlField || 'custom'} onChange={(e) => updateSelectedProps({ ghlField: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-2.5 text-[12px] text-white outline-none appearance-none font-mono">
                                                    <option value="firstName">Contact: First Name</option>
                                                    <option value="lastName">Contact: Last Name</option>
                                                    <option value="email">Contact: Email</option>
                                                    <option value="phone">Contact: Phone</option>
                                                    <option value="companyName">Contact: Company</option>
                                                    <option value="custom">Custom / Tag</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center justify-between pt-1">
                                                <span className="text-[11px] font-bold text-white/70">Required</span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" checked={selectedElement.props.required || false} onChange={e => updateSelectedProps({ required: e.target.checked })} />
                                                    <div className="w-9 h-5 bg-[#333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-gold"></div>
                                                </label>
                                            </div>
                                        </>
                                    )}

                                    {selectedElement.type === 'button' && (
                                        <>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Button Text</label>
                                                <input type="text" value={selectedElement.props.text || ''} onChange={(e) => updateSelectedProps({ text: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-brand-gold/50 rounded-lg p-2.5 text-[12px] text-white outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">Color</label>
                                                <div className="flex gap-2">
                                                    {['#C59D5F', '#111111', '#3b82f6', '#10b981', '#ef4444'].map(color => (
                                                        <button key={color} onClick={() => updateSelectedProps({ color })} className={`h-7 w-7 rounded-full border-2 ${selectedElement.props.color === color ? 'border-white' : 'border-transparent'}`} style={{ backgroundColor: color }} />
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </Card>

                        <DragOverlay>
                            {activeId && String(activeId).startsWith('palette-') && (
                                <div className="w-[140px] opacity-80 cursor-grabbing bg-[#1A1A1A] border-brand-gold p-4 rounded-xl border">
                                    <p className="text-[11px] font-bold text-white text-center">Drop to Canvas</p>
                                </div>
                            )}
                        </DragOverlay>
                    </div>
                </DndContext>
            )}

            {/* Embed Code Modal */}
            {showEmbedCode && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-3xl p-8 max-w-[600px] w-full animate-fade-in shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-serif font-bold text-white">Embed Code</h3>
                            <button onClick={() => setShowEmbedCode(false)} className="text-white/40 hover:text-white pb-1">✕</button>
                        </div>
                        <p className="text-white/60 text-[13px] mb-4">Copy this snippet to embed this intake form on your external site. Submissions will flow directly into GHL.</p>
                        
                        <div className="bg-[#111111] p-4 rounded-xl border border-[#333] relative mb-6">
                            <pre className="text-brand-gold font-mono text-[12px] whitespace-pre-wrap break-all">{generateEmbedCode()}</pre>
                            <button onClick={() => { navigator.clipboard.writeText(generateEmbedCode()); toast.success('Copied to clipboard'); }} className="absolute top-3 right-3 p-2 bg-[#222] hover:bg-[#333] rounded-lg text-white/50 hover:text-white transition-colors">
                                <Copy className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <button onClick={() => setShowEmbedCode(false)} className="bg-brand-gold text-black px-6 py-2.5 rounded-xl font-bold text-[13px] hover:bg-brand-gold/90 transition-colors">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
