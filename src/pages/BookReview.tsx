
import { useState, useRef } from 'react';
import { Section } from '../components/ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Clock, Layers, ArrowRight, Building2,
  User, Briefcase, BarChart3, Wrench, MessageSquare,
  CheckCircle2, Sparkles, Lock, ChevronDown,
} from 'lucide-react';

/* ═══════════════════════════════════════════ */
/*              ACCENT & PALETTE              */
/* ═══════════════════════════════════════════ */
const ACCENT = '#FFDD59';
const SURFACE = '#111111';

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
      {/* Glow ring */}
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

      {/* Dropdown */}
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

      {/* Filled check */}
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
      {/* Glow ring */}
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

      {/* Character count */}
      {hasValue && (
        <div className="absolute right-3 bottom-2 text-[9px] text-white/15">
          {value.length}
        </div>
      )}
    </motion.div>
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
/*            SUCCESS STATE                   */
/* ═══════════════════════════════════════════ */
const SuccessState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-12 px-6"
  >
    {/* Animated check ring */}
    <motion.div
      className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: `${ACCENT}30` }} />
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl"
        style={{ background: `${ACCENT}15` }}
      />
      {/* Inner */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
        style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 size={28} style={{ color: ACCENT }} />
        </motion.div>
      </div>
    </motion.div>

    <motion.h3
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-2xl font-semibold text-white mb-3"
    >
      Application Received
    </motion.h3>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-muted-text leading-relaxed max-w-sm mx-auto mb-6"
    >
      Our team will review your application and reach out within 1 business day to schedule your session.
    </motion.p>

    {/* Confirmation details */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
      style={{ borderColor: `${ACCENT}20`, background: `${ACCENT}08` }}
    >
      <Lock size={11} style={{ color: ACCENT }} />
      <span className="text-[11px] text-white/50">Confidential — all data encrypted</span>
    </motion.div>
  </motion.div>
);

/* ═══════════════════════════════════════════ */
/*           MAIN PAGE COMPONENT              */
/* ═══════════════════════════════════════════ */
export const BookReview = () => {
  const [formData, setFormData] = useState({
    name: '', firm: '', volume: '', tools: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
      {/* Grid pattern */}
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

          {/* ═══ Right Column: Premium Form ═══ */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}08, transparent 50%)`,
              }}
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
                style={{
                  background: `linear-gradient(180deg, #141414 0%, #0F0F0F 100%)`,
                }}
              >
                {/* Decorative corner glow */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none"
                  style={{ background: `${ACCENT}06` }}
                />
                <div
                  className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-[80px] pointer-events-none"
                  style={{ background: `${ACCENT}04` }}
                />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <SuccessState key="success" />
                  ) : (
                    <motion.div
                      key="form"
                      className="relative z-10"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {/* Form header */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-1">
                            Request Deployment Access
                          </h3>
                          <p className="text-sm text-white/35">
                            Limited onboarding — complete form below
                          </p>
                        </div>
                        {/* Live indicator */}
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

                      {/* Progress bar */}
                      <FormProgress filled={filledCount} total={4} />

                      {/* Form fields */}
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

                        {/* ── Submit Button ── */}
                        <div className="pt-3">
                          <motion.button
                            type="submit"
                            className="w-full relative overflow-hidden rounded-xl font-semibold text-base transition-all group"
                            style={{
                              background: `linear-gradient(135deg, ${ACCENT}, #F0C830)`,
                              color: '#111',
                              padding: '16px 24px',
                              boxShadow: `0 4px 24px ${ACCENT}25, 0 0 0 1px ${ACCENT}40`,
                            }}
                            whileHover={{ scale: 1.01, boxShadow: `0 8px 32px ${ACCENT}35, 0 0 0 1px ${ACCENT}60` }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Shimmer effect */}
                            <div
                              className="absolute inset-0 pointer-events-none transition-transform duration-700 group-hover:translate-x-full"
                              style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                                transform: 'translateX(-100%)',
                              }}
                            />
                            <div className="relative flex items-center justify-center gap-2">
                              <Sparkles size={16} />
                              Submit Application
                              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </motion.button>
                        </div>

                        {/* Privacy note */}
                        <div className="flex items-center justify-center gap-2 pt-1">
                          <Lock size={10} className="text-white/15" />
                          <p className="text-[11px] text-white/20">
                            Encrypted submission — all information is confidential
                          </p>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
