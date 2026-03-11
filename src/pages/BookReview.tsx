
import { useState, useRef, useEffect } from 'react';
import { Section } from '../components/ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Clock, Layers, ArrowRight, Building2,
  User, Briefcase, BarChart3, Wrench, MessageSquare,
  CheckCircle2, Sparkles, Lock, ChevronDown,
  CalendarDays, Loader2,
} from 'lucide-react';

/* ═══════════════════════════════════════════ */
/*              CONSTANTS                     */
/* ═══════════════════════════════════════════ */
const ACCENT = '#FFDD59';
const SURFACE = '#111111';

const WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/haxeHgIDHbGvqriQUPOO/webhook-trigger/bae1f1f4-0a3a-4404-b343-c3d875e604de';

const CALENDAR_EMBED_URL =
  'https://api.leadconnectorhq.com/widget/booking/noNIOmETdLnTvHFd7AGl';
const CALENDAR_SCRIPT_URL =
  'https://link.msgsndr.com/js/form_embed.js';

/* ═══════════════════════════════════════════ */
/*              TRUST SIGNALS                 */
/* ═══════════════════════════════════════════ */
const trustSignals = [
  { label: '45 Minutes', sub: 'No sales pressure', icon: Clock },
  { label: 'No Commitment', sub: 'Exploratory only', icon: ShieldCheck },
  { label: 'Confidential', sub: 'NDA available', icon: Lock },
  { label: 'Roadmap Delivered', sub: 'After call', icon: Sparkles },
];

const valueProps = [
  { icon: Clock, title: '45-Minute Strategic Session', desc: 'No high-pressure sales. A technical walkthrough of architecture matched to your current operational setup.' },
  { icon: Layers, title: 'Custom Migration Plan', desc: 'Detailed roadmap for migrating off your disjointed legacy tools — specific to your firm size and deal volume.' },
  { icon: ShieldCheck, title: 'Strict Confidentiality', desc: 'All discussions and current operational metrics remain strictly private. NDA available on request.' },
  { icon: Building2, title: 'Infrastructure Roadmap Delivered', desc: 'You leave the call with a documented infrastructure plan for your brokerage, regardless of whether you proceed.' },
];

/* ═══════════════════════════════════════════ */
/*           PREMIUM INPUT COMPONENT          */
/* ═══════════════════════════════════════════ */
const PremiumInput = ({
  id, label, icon: Icon, placeholder, type = 'text', required = true,
  value, onChange,
}: {
  id: string; label: string; icon: React.ElementType; placeholder: string;
  type?: string; required?: boolean; value: string;
  onChange: (val: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Glow ring on focus */}
      <div
        className="absolute -inset-px rounded-xl transition-all duration-500 pointer-events-none"
        style={{
          background: focused
            ? `linear-gradient(135deg, ${ACCENT}40, ${ACCENT}10, transparent)`
            : 'transparent',
          opacity: focused ? 1 : 0,
        }}
      />

      <div
        className="relative rounded-xl border transition-all duration-300 overflow-hidden"
        style={{
          background: focused ? 'rgba(255,221,89,0.03)' : 'rgba(0,0,0,0.4)',
          borderColor: focused ? `${ACCENT}50` : 'rgba(255,255,255,0.08)',
        }}
      >
        {/* Label row */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-0">
          <Icon
            size={13}
            className="transition-colors duration-300"
            style={{ color: focused || hasValue ? ACCENT : 'rgba(255,255,255,0.2)' }}
          />
          <label
            htmlFor={id}
            className="text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300"
            style={{ color: focused ? ACCENT : 'rgba(255,255,255,0.35)' }}
          >
            {label}
          </label>
          {required && (
            <span className="text-[8px] text-white/15 ml-auto">Required</span>
          )}
        </div>

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-4 pt-1.5 pb-3 text-white text-sm placeholder-white/15 focus:outline-none"
        />
      </div>

      {/* Filled check */}
      <AnimatePresence>
        {hasValue && !focused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <CheckCircle2 size={14} className="text-green-400/60" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════ */
/*         PREMIUM SELECT COMPONENT           */
/* ═══════════════════════════════════════════ */
const PremiumSelect = ({
  id, label, icon: Icon, options, value, onChange,
}: {
  id: string; label: string; icon: React.ElementType;
  options: { value: string; label: string }[];
  value: string; onChange: (val: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasValue = value.length > 0;
  const selectedLabel = options.find(o => o.value === value)?.label ?? '';

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className="absolute -inset-px rounded-xl transition-all duration-500 pointer-events-none"
        style={{
          background: focused || open
            ? `linear-gradient(135deg, ${ACCENT}40, ${ACCENT}10, transparent)`
            : 'transparent',
          opacity: focused || open ? 1 : 0,
        }}
      />

      <div
        className="relative rounded-xl border transition-all duration-300 cursor-pointer"
        style={{
          background: focused || open ? 'rgba(255,221,89,0.03)' : 'rgba(0,0,0,0.4)',
          borderColor: focused || open ? `${ACCENT}50` : 'rgba(255,255,255,0.08)',
        }}
        onClick={() => { setOpen(!open); setFocused(true); }}
        onBlur={() => { setFocused(false); setTimeout(() => setOpen(false), 200); }}
        tabIndex={0}
      >
        <div className="flex items-center gap-2 px-4 pt-3 pb-0">
          <Icon
            size={13}
            className="transition-colors duration-300"
            style={{ color: focused || hasValue ? ACCENT : 'rgba(255,255,255,0.2)' }}
          />
          <label
            htmlFor={id}
            className="text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300"
            style={{ color: focused || open ? ACCENT : 'rgba(255,255,255,0.35)' }}
          >
            {label}
          </label>
        </div>

        <div className="flex items-center justify-between px-4 pt-1.5 pb-3">
          <span className={`text-sm ${hasValue ? 'text-white' : 'text-white/15'}`}>
            {hasValue ? selectedLabel : 'Select range...'}
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} className="text-white/25" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 mt-1.5 rounded-xl border overflow-hidden"
            style={{
              background: '#141414',
              borderColor: `${ACCENT}20`,
              transformOrigin: 'top',
              boxShadow: `0 16px 48px rgba(0,0,0,0.7), 0 0 24px ${ACCENT}08`,
            }}
          >
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                className="w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center justify-between"
                style={{
                  color: opt.value === value ? ACCENT : 'rgba(255,255,255,0.55)',
                  background: opt.value === value ? `${ACCENT}08` : 'transparent',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.background = `${ACCENT}06`;
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.background = opt.value === value ? `${ACCENT}08` : 'transparent';
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(opt.value);
                  setOpen(false);
                  setFocused(false);
                }}
              >
                {opt.label}
                {opt.value === value && <CheckCircle2 size={12} style={{ color: ACCENT }} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasValue && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <CheckCircle2 size={14} className="text-green-400/60" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════ */
/*        PREMIUM TEXTAREA COMPONENT          */
/* ═══════════════════════════════════════════ */
const PremiumTextarea = ({
  id, label, icon: Icon, placeholder, value, onChange, required = false,
}: {
  id: string; label: string; icon: React.ElementType; placeholder: string;
  value: string; onChange: (val: string) => void; required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className="absolute -inset-px rounded-xl transition-all duration-500 pointer-events-none"
        style={{
          background: focused
            ? `linear-gradient(135deg, ${ACCENT}40, ${ACCENT}10, transparent)`
            : 'transparent',
          opacity: focused ? 1 : 0,
        }}
      />

      <div
        className="relative rounded-xl border transition-all duration-300 overflow-hidden"
        style={{
          background: focused ? 'rgba(255,221,89,0.03)' : 'rgba(0,0,0,0.4)',
          borderColor: focused ? `${ACCENT}50` : 'rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-2 px-4 pt-3 pb-0">
          <Icon
            size={13}
            className="transition-colors duration-300"
            style={{ color: focused || hasValue ? ACCENT : 'rgba(255,255,255,0.2)' }}
          />
          <label
            htmlFor={id}
            className="text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300"
            style={{ color: focused ? ACCENT : 'rgba(255,255,255,0.35)' }}
          >
            {label}
          </label>
          {!required && (
            <span className="text-[8px] text-white/15 ml-auto">Optional</span>
          )}
        </div>

        <textarea
          id={id}
          rows={3}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-4 pt-1.5 pb-3 text-white text-sm placeholder-white/15 focus:outline-none resize-none"
        />
      </div>

      {hasValue && (
        <div className="absolute right-3 bottom-2 text-[9px] text-white/15">
          {value.length}
        </div>
      )}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════ */
/*            CALENDAR EMBED                  */
/* ═══════════════════════════════════════════ */
const CalendarEmbed = () => {
  useEffect(() => {
    // Dynamically load the GHL embed script when this component mounts
    const script = document.createElement('script');
    script.src = CALENDAR_SCRIPT_URL;
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ borderColor: 'rgba(255,255,255,0.08)', minHeight: '520px' }}
    >
      <iframe
        src={CALENDAR_EMBED_URL}
        title="Book a Time"
        id="TMmrR1Zzoub9j4yIUbXU_1773202202661"
        style={{
          width: '100%',
          border: 'none',
          overflow: 'hidden',
          height: '520px',
          background: '#0A0A0A',
          colorScheme: 'dark',
        }}
        scrolling="no"
      />
    </div>
  );
};

/* ═══════════════════════════════════════════ */
/*       FORM STEP PROGRESS INDICATOR         */
/* ═══════════════════════════════════════════ */
const FormProgress = ({ filled, total }: { filled: number; total: number }) => {
  const pct = (filled / total) * 100;
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}80)` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[10px] text-white/30 font-mono tabular-nums shrink-0">
        {filled}/{total}
      </span>
    </div>
  );
};

/* ═══════════════════════════════════════════ */
/*         STEP INDICATOR (1 → 2)             */
/* ═══════════════════════════════════════════ */
const StepIndicator = ({ currentStep }: { currentStep: 1 | 2 }) => (
  <div className="flex items-center gap-3 mb-8">
    {/* Step 1 */}
    <div className="flex items-center gap-2">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-500"
        style={{
          background: currentStep >= 1 ? ACCENT : 'rgba(255,255,255,0.06)',
          color: currentStep >= 1 ? '#111' : 'rgba(255,255,255,0.25)',
          boxShadow: currentStep === 1 ? `0 0 16px ${ACCENT}30` : 'none',
        }}
      >
        {currentStep > 1 ? <CheckCircle2 size={14} /> : '1'}
      </div>
      <span
        className="text-[11px] font-medium transition-colors"
        style={{ color: currentStep >= 1 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}
      >
        Your Details
      </span>
    </div>

    {/* Connector */}
    <div className="flex-1 h-px relative overflow-hidden">
      <div className="absolute inset-0 bg-white/8" />
      <motion.div
        className="absolute inset-y-0 left-0 h-full"
        style={{ background: ACCENT }}
        initial={{ width: '0%' }}
        animate={{ width: currentStep >= 2 ? '100%' : '0%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </div>

    {/* Step 2 */}
    <div className="flex items-center gap-2">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-500"
        style={{
          background: currentStep >= 2 ? ACCENT : 'rgba(255,255,255,0.06)',
          color: currentStep >= 2 ? '#111' : 'rgba(255,255,255,0.25)',
          boxShadow: currentStep === 2 ? `0 0 16px ${ACCENT}30` : 'none',
        }}
      >
        2
      </div>
      <span
        className="text-[11px] font-medium transition-colors"
        style={{ color: currentStep >= 2 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}
      >
        Book a Time
      </span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════ */
/*           MAIN PAGE COMPONENT              */
/* ═══════════════════════════════════════════ */
export const BookReview = () => {
  const [formData, setFormData] = useState({
    name: '', firm: '', volume: '', tools: '', message: '',
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      // Build webhook payload with BROKERAGEOS_ prefixes
      const payload = {
        BROKERAGEOS_FULL_NAME: formData.name,
        BROKERAGEOS_FIRM_NAME: formData.firm,
        BROKERAGEOS_DEAL_VOLUME: formData.volume,
        BROKERAGEOS_CURRENT_TOOLS: formData.tools,
        BROKERAGEOS_PRIMARY_CHALLENGE: formData.message,
        BROKERAGEOS_SOURCE: 'book-review',
        BROKERAGEOS_SUBMITTED_AT: new Date().toISOString(),
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }

      // Move to step 2 (calendar)
      setStep(2);
    } catch (err) {
      console.error('Webhook error:', err);
      // Still proceed to calendar — don't block UX on webhook failure
      setStep(2);
    } finally {
      setSubmitting(false);
    }
  };

  const filledCount = Object.entries(formData).filter(
    ([key, val]) => key !== 'message' && val.length > 0
  ).length;

  const volumeOptions = [
    { value: 'under5m', label: 'Under $5M' },
    { value: '5m-25m', label: '$5M – $25M' },
    { value: '25m-100m', label: '$25M – $100M' },
    { value: 'over100m', label: '$100M+' },
  ];

  return (
    <Section className="pt-32 pb-32 relative overflow-hidden" container={false}>
      {/* ── Ambient effects ── */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: `${ACCENT}08` }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: '#4ade8008' }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: '48px 48px',
          backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)
                    `,
          maskImage: 'radial-gradient(ellipse at 70% 50%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 20%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">

          {/* ═══ Left Column ═══ */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6" style={{ borderColor: `${ACCENT}25`, background: `${ACCENT}08` }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ACCENT }} />
                <span className="text-sm font-medium" style={{ color: ACCENT }}>Exclusive Access</span>
              </div>
              <h1 className="text-5xl md:text-[60px] font-display font-semibold text-white mb-6 leading-tight tracking-tight">
                Schedule your<br />Infrastructure Review
              </h1>
              <p className="text-xl text-muted-text max-w-xl leading-relaxed">
                We'll analyze your current technology stack, identify deal flow bottlenecks, and map out exactly how BrokerageOS fits inside your operations.
              </p>
            </motion.div>

            <div className="space-y-6 mb-10">
              {valueProps.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-start gap-5">
                  <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <item.icon style={{ color: ACCENT }} size={22} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-text leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust signals */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {trustSignals.map(ts => (
                <div key={ts.label} className="rounded-xl p-3 text-center border" style={{ background: SURFACE, borderColor: 'rgba(255,255,255,0.04)' }}>
                  <ts.icon size={14} className="mx-auto mb-1.5" style={{ color: `${ACCENT}60` }} />
                  <div className="text-sm font-semibold text-white mb-0.5">{ts.label}</div>
                  <div className="text-[11px] text-muted-text">{ts.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ═══ Right Column: 2-Step Form ═══ */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div
              className="relative rounded-2xl overflow-visible"
              style={{ background: `linear-gradient(135deg, ${ACCENT}08, transparent 50%)` }}
            >
              {/* Outer glow border */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  border: `1px solid ${ACCENT}12`,
                  boxShadow: `0 0 60px ${ACCENT}05, inset 0 1px 0 ${ACCENT}15`,
                }}
              />

              {/* Inner card */}
              <div
                className="relative rounded-2xl p-8 md:p-10 m-px"
                style={{ background: 'linear-gradient(180deg, #141414 0%, #0F0F0F 100%)' }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: `${ACCENT}06` }} />
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-[80px] pointer-events-none" style={{ background: `${ACCENT}04` }} />

                <div className="relative z-10">
                  {/* ── Header ── */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-1">
                        {step === 1 ? 'Request Deployment Access' : 'Book Your Session'}
                      </h3>
                      <p className="text-sm text-white/35">
                        {step === 1
                          ? 'Limited onboarding — complete form below'
                          : 'Pick a time that works for your team'
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}15` }}>
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: ACCENT }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: `${ACCENT}90` }}>Open</span>
                    </div>
                  </div>

                  {/* ── Step Indicator ── */}
                  <StepIndicator currentStep={step} />

                  {/* ── Step Content ── */}
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      /* ═══════════════════════════════ */
                      /*       STEP 1: FORM FIELDS      */
                      /* ═══════════════════════════════ */
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.25 }}
                      >
                        <FormProgress filled={filledCount} total={4} />

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <PremiumInput
                            id="name" label="Full Name" icon={User}
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={val => setFormData(p => ({ ...p, name: val }))}
                          />
                          <PremiumInput
                            id="firm" label="Firm Name" icon={Briefcase}
                            placeholder="Your brokerage or advisory firm"
                            value={formData.firm}
                            onChange={val => setFormData(p => ({ ...p, firm: val }))}
                          />
                          <PremiumSelect
                            id="volume" label="Annual Deal Volume" icon={BarChart3}
                            options={volumeOptions}
                            value={formData.volume}
                            onChange={val => setFormData(p => ({ ...p, volume: val }))}
                          />
                          <PremiumInput
                            id="tools" label="Current Tools" icon={Wrench}
                            placeholder="e.g. HubSpot, DocuSign, custom forms..."
                            value={formData.tools}
                            onChange={val => setFormData(p => ({ ...p, tools: val }))}
                          />
                          <PremiumTextarea
                            id="message" label="Primary Challenge" icon={MessageSquare}
                            placeholder="Describe the biggest bottleneck in your current deal flow..."
                            value={formData.message}
                            onChange={val => setFormData(p => ({ ...p, message: val }))}
                          />

                          {/* Error */}
                          {submitError && (
                            <div className="text-red-400 text-sm text-center py-2">{submitError}</div>
                          )}

                          {/* Submit → Step 2 */}
                          <div className="pt-3">
                            <motion.button
                              type="submit"
                              disabled={submitting}
                              className="w-full relative overflow-hidden rounded-xl font-semibold text-base transition-all group disabled:opacity-70"
                              style={{
                                background: `linear-gradient(135deg, ${ACCENT}, #F0C830)`,
                                color: '#111',
                                padding: '16px 24px',
                                boxShadow: `0 4px 24px ${ACCENT}25, 0 0 0 1px ${ACCENT}40`,
                              }}
                              whileHover={!submitting ? { scale: 1.01, boxShadow: `0 8px 32px ${ACCENT}35, 0 0 0 1px ${ACCENT}60` } : {}}
                              whileTap={!submitting ? { scale: 0.98 } : {}}
                            >
                              <div
                                className="absolute inset-0 pointer-events-none transition-transform duration-700 group-hover:translate-x-full"
                                style={{
                                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                                  transform: 'translateX(-100%)',
                                }}
                              />
                              <div className="relative flex items-center justify-center gap-2">
                                {submitting ? (
                                  <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Submitting...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles size={16} />
                                    Continue to Booking
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                  </>
                                )}
                              </div>
                            </motion.button>
                          </div>

                          <div className="flex items-center justify-center gap-2 pt-1">
                            <Lock size={10} className="text-white/15" />
                            <p className="text-[11px] text-white/20">
                              Encrypted submission — all information is confidential
                            </p>
                          </div>
                        </form>
                      </motion.div>
                    ) : (
                      /* ═══════════════════════════════ */
                      /*     STEP 2: CALENDAR EMBED     */
                      /* ═══════════════════════════════ */
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      >
                        {/* Confirmation banner */}
                        <div
                          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6"
                          style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}15` }}
                        >
                          <CheckCircle2 size={16} style={{ color: ACCENT }} />
                          <div>
                            <div className="text-sm font-medium text-white">
                              Details received, {formData.name.split(' ')[0] || 'there'}!
                            </div>
                            <div className="text-[11px] text-white/35">
                              Now select a time for your infrastructure review
                            </div>
                          </div>
                        </div>

                        {/* Calendar embed — loads GHL script on mount */}
                        <CalendarEmbed />

                        {/* Back link */}
                        <div className="flex items-center justify-between mt-6">
                          <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors"
                          >
                            <ArrowRight size={12} className="rotate-180" />
                            Edit details
                          </button>
                          <div className="flex items-center gap-2">
                            <CalendarDays size={11} className="text-white/15" />
                            <span className="text-[11px] text-white/20">
                              45-min session — no commitment
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
