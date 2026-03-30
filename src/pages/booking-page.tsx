import { Link } from 'react-router-dom';
import { CalendarDays, Phone, Clock, ArrowRight } from 'lucide-react';

export default function BookingPage() {
  const calendarId = import.meta.env.VITE_GHL_CALENDAR_ID;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Info */}
        <div className="lg:col-span-2">
          <p className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-4">Schedule</p>
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Book a Call</h1>
          <p className="text-white/50 leading-relaxed mb-8">
            Speak directly with a senior advisor. No salespeople, no runaround — just a clear conversation about your situation.
          </p>

          <div className="space-y-5 mb-10">
            {[
              { icon: Clock, label: '30-minute call', desc: 'Focused and efficient.' },
              { icon: Phone, label: 'Phone or Zoom', desc: 'Your choice of format.' },
              { icon: CalendarDays, label: 'Same-week availability', desc: 'We don\'t gatekeep.' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.label}</p>
                  <p className="text-white/40 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-sm font-bold text-white mb-2">What we'll cover:</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>• Your situation and goals</li>
              <li>• Whether our services are a fit</li>
              <li>• Preliminary timeline and next steps</li>
            </ul>
          </div>
        </div>

        {/* Calendar Embed */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden h-[650px]">
            {calendarId ? (
              <iframe
                src={`https://api.leadconnectorhq.com/widget/booking/${calendarId}`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Book a Call"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <CalendarDays className="h-16 w-16 text-white/10 mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Calendar Coming Soon</h3>
                <p className="text-white/40 text-sm max-w-sm mb-6">
                  Set <code className="px-1.5 py-0.5 rounded bg-white/5 text-xs text-brand-gold">VITE_GHL_CALENDAR_ID</code> in your <code className="px-1.5 py-0.5 rounded bg-white/5 text-xs text-brand-gold">.env</code> file to activate the booking widget.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-all">
                  Contact Us Instead <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
