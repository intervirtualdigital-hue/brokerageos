import { Card } from '@/components/ui/card';
import { Plus, GripVertical, Settings2, Save } from 'lucide-react';

export default function QuizBuilderPage() {
    return (
        <div className="space-y-8 max-w-[1400px] animate-fade-in text-white/80">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-[32px] font-serif font-bold text-white mb-2 tracking-tight">Funnel & Quiz Builder</h2>
                    <p className="text-white/50 text-[15px]">Design data collection experiences that convert.</p>
                </div>
                <button className="h-10 px-5 flex items-center justify-center gap-2 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-black font-semibold shadow-[0_0_15px_rgba(255,221,89,0.2)] transition-all text-[14px]">
                    <Save className="h-4 w-4" /> Save Funnel
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 w-full space-y-4">
                    {[1, 2, 3].map((step) => (
                        <Card key={step} className="bg-[#161616] border-[#2A2A2A] p-5 rounded-2xl flex items-center gap-4 group hover:border-[#444] transition-colors">
                            <GripVertical className="h-5 w-5 text-white/20 cursor-grab group-hover:text-white/50" />
                            <div className="flex-1">
                                <h3 className="text-[15px] font-semibold text-white">Question Step {step}</h3>
                                <p className="text-[13px] text-white/40">Multiple Choice selection</p>
                            </div>
                            <button className="p-2 hover:bg-[#222222] rounded-lg transition-colors text-white/40 hover:text-brand-gold">
                                <Settings2 className="h-5 w-5" />
                            </button>
                        </Card>
                    ))}
                    <button className="w-full py-5 border-2 border-dashed border-[#2A2A2A] rounded-2xl text-white/40 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-brand-gold/5 transition-colors flex items-center justify-center gap-2 font-medium">
                        <Plus className="h-5 w-5 border border-current rounded-full p-0.5" /> Add New Step
                    </button>
                </div>
                
                <div className="w-full lg:w-[350px] shrink-0 sticky top-8">
                    <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6 rounded-3xl">
                        <h3 className="text-[16px] font-bold text-white mb-6">Component Library</h3>
                        <div className="space-y-3 block">
                            {['Short Text Input', 'Paragraph Text', 'Multiple Choice Grid', 'Dropdown Menu', 'File Upload / Resume', 'GHL Calendar Widget'].map(tool => (
                                <div key={tool} className="bg-[#222222] border border-[#333333] p-3.5 rounded-xl cursor-grab text-[13px] font-medium text-white/70 hover:text-white hover:border-brand-gold/50 transition-colors flex items-center justify-between">
                                    {tool}
                                    <GripVertical className="h-3 w-3 text-white/20" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
