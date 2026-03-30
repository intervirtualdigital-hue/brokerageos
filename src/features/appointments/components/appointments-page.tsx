import { Copy, Video, User, ChevronLeft, ChevronRight, ExternalLink, Calendar as CalendarIcon, Clock, CalendarX2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAppointments } from '@/hooks/useGHL';
import { useNavigate } from 'react-router-dom';

const bookingTypes = [
    { title: "Introductory Call", duration: "15 min" },
    { title: "Listing Valuation", duration: "45 min" },
    { title: "Due Diligence Review", duration: "60 min" },
];

export default function AppointmentsPage() {
    const { data: liveEvents, isLoading } = useAppointments();
    const navigate = useNavigate();
    
    const displayEvents = (liveEvents || []).map((evt, i) => ({
        id: evt.id || i,
        title: evt.title || `Consultation / Sync`,
        contact: evt.contactId || 'Active Client',
        time: evt.startTime ? new Date(evt.startTime).toLocaleString('en-US', { hour: 'numeric', minute:'2-digit', hour12:true }) : "TBA",
        status: evt.appoinmentStatus || evt.status || "Confirmed",
        type: "video"
    }));

    return (
        <div className="space-y-8 max-w-[1400px] animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-[32px] font-serif font-bold text-white mb-2 tracking-tight">Calendar & Booking</h2>
                    <p className="text-white/50 text-[15px]">Manage your schedule and view live meetings populated from GHL.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => {navigator.clipboard.writeText(`${window.location.origin}/book`); toast.success('Booking Link Copied!')}} className="h-10 px-5 flex items-center justify-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] hover:bg-[#222222] text-white/80 font-medium transition-colors">
                        <Copy className="h-4 w-4" />
                        <span>Copy Booking Link</span>
                    </button>
                    <button onClick={() => navigate('/book')} className="h-10 px-5 flex items-center justify-center gap-2 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-black font-semibold shadow-[0_0_15px_rgba(255,221,89,0.2)] transition-all text-[14px]">
                        <ExternalLink className="h-4 w-4" />
                        <span>View Public Page</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Upcoming Consultations */}
                <Card className="lg:col-span-2 bg-[#161616] border-[#2A2A2A] p-8 rounded-3xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Upcoming Consultations</h3>
                            <p className="text-[14px] text-white/40">Real-time schedule synchronization.</p>
                        </div>
                        {isLoading && <div className="h-5 w-5 rounded-full border-2 border-brand-gold border-t-transparent animate-spin" />}
                    </div>

                    <div className="space-y-4">
                        {displayEvents.length === 0 && !isLoading ? (
                            <div className="py-12 flex flex-col items-center justify-center text-white/40 border border-dashed border-[#2A2A2A] rounded-2xl bg-black/10">
                                <CalendarX2 className="h-10 w-10 mb-3 opacity-20" />
                                <p className="text-[14px] font-semibold">No upcoming appointments</p>
                                <p className="text-[13px] opacity-70 mt-1">Share your booking link to schedule consultations.</p>
                            </div>
                        ) : (
                            displayEvents.map((apt: any) => (
                                <div key={apt.id} className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-brand-gold/30 hover:bg-white/[0.02] transition-colors overflow-hidden shadow-lg">
                                    {String(apt.status).toLowerCase() === 'confirmed' && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold opacity-100 transition-opacity" />
                                    )}
                                    
                                    <div className="flex items-start gap-5">
                                        <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 border ${String(apt.status).toLowerCase() === 'confirmed' ? 'bg-[#FFDD59]/10 border-brand-gold/30' : 'bg-[#222222] border-[#333333]'}`}>
                                            {apt.type === 'video' ? (
                                                <Video className={`h-5 w-5 ${String(apt.status).toLowerCase() === 'confirmed' ? 'text-brand-gold' : 'text-white/40'}`} />
                                            ) : (
                                                <CalendarIcon className={`h-5 w-5 ${String(apt.status).toLowerCase() === 'confirmed' ? 'text-brand-gold' : 'text-white/40'}`} />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-[16px] font-semibold text-white mb-1.5">{apt.title}</h4>
                                            <div className="flex items-center gap-2 text-[14px] text-white/40 mb-3">
                                                <User className="h-3.5 w-3.5 text-white/30" />
                                                <span>{apt.contact}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[13px] font-medium text-white/60 bg-[#222222] inline-flex px-3 py-1.5 rounded-lg border border-[#333333]">
                                                <Clock className="h-3.5 w-3.5 text-brand-gold" />
                                                {apt.time}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between self-stretch md:self-auto pt-4 md:pt-0 border-t border-[#2A2A2A] md:border-none">
                                        <div className={`px-3 py-1 rounded-full text-[12px] font-bold tracking-wide uppercase mb-0 md:mb-6 border ${String(apt.status).toLowerCase() === 'confirmed' ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/20' : 'bg-transparent border-white/20 text-white/40'}`}>
                                            {apt.status || 'Scheduled'}
                                        </div>
                                        <button onClick={() => toast('Meeting Details loaded from CRM.')} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">
                                            Agent Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Right Sidebar - Mini Calendar & Booking Types */}
                <div className="space-y-6">
                    {/* Mini Calendar Live Mock */}
                    <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6 rounded-3xl pb-8">
                        <div className="flex items-center justify-between mb-8">
                            <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-[#2A2A2A] text-white/40 transition-colors">
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <h3 className="text-[15px] font-semibold text-white">March 2026</h3>
                            <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-[#2A2A2A] text-white/40 transition-colors">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-y-6 text-center">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                <div key={day} className="text-[12px] font-bold text-white/30">{day}</div>
                            ))}
                            <div className="col-span-1"></div>
                            
                            {[...Array(31)].map((_, i) => {
                                const day = i + 1;
                                const isActive = day === new Date().getDate(); // Selects today automatically
                                return (
                                    <div key={day} className="flex items-center justify-center relative h-8">
                                        <button className={`h-8 w-8 rounded-full flex items-center justify-center text-[14px] font-medium transition-colors ${isActive ? 'text-brand-gold relative z-10' : 'text-white hover:bg-[#2A2A2A]'}`}>
                                            {day}
                                        </button>
                                        {isActive && (
                                            <div className="absolute inset-x-0 h-9 w-9 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-dashed border-brand-gold rounded block" />
                                        )}
                                    </div>
                                );
                            })}
                            {[...Array(4)].map((_, i) => (
                                <div key={`next-${i}`} className="flex items-center justify-center h-8 text-[14px] font-medium text-white/10">
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Booking Types */}
                    <div>
                        <h3 className="text-[18px] font-bold text-white mb-4 px-1">Booking Links</h3>
                        <div className="flex flex-col gap-3">
                            {bookingTypes.map((type, i) => (
                                <Card key={i} onClick={() => {navigator.clipboard.writeText(`${window.location.origin}/book?type=${encodeURIComponent(type.title)}`); toast.success('Booking Link Copied - Ready to send!')}} className="bg-[#1A1A1A] border-[#2A2A2A] p-5 rounded-2xl flex flex-col justify-between group hover:border-brand-gold/30 hover:bg-white/[0.02] transition-colors h-[100px] cursor-pointer shadow-lg">
                                    <div className="flex items-start justify-between">
                                        <p className="text-[14px] font-semibold text-white group-hover:text-brand-gold transition-colors">{type.title}</p>
                                        <span className="text-[12px] text-white/40 bg-[#222] px-2 py-0.5 rounded-full border border-white/5">{type.duration}</span>
                                    </div>
                                    <div className="text-right flex items-center justify-end gap-1.5 mt-auto">
                                        <Copy className="h-3.5 w-3.5 text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                                        <span className="text-[13px] font-bold text-white/40 group-hover:text-brand-gold transition-colors">Copy Link</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
