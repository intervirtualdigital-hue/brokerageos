import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className={`relative bg-[#161616] border border-[#2A2A2A] rounded-2xl w-full ${maxWidth} overflow-hidden animate-fade-in shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]`}>
                <div className="flex justify-between items-center p-5 border-b border-[#2A2A2A] shrink-0">
                    <h3 className="text-lg font-serif font-bold text-white tracking-tight">{title}</h3>
                    <button onClick={onClose} className="text-white/40 hover:text-brand-gold transition-colors bg-white/5 p-1.5 rounded-lg">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-5 overflow-y-auto hide-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
}
