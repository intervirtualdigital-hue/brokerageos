import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Simple password-based gate for the internal portal.
 * Replace with proper auth (GHL SSO, custom JWT, etc.) when scaling.
 */
const PORTAL_PASSCODE = import.meta.env.VITE_PORTAL_PASSCODE || 'brokerage2024';

export function PortalGate() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('portal_auth') === 'true');
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');

  if (authed) return <Outlet />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === PORTAL_PASSCODE) {
      sessionStorage.setItem('portal_auth', 'true');
      setAuthed(true);
    } else {
      setError('Invalid access code. Contact your broker administrator.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold mb-6">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Team Portal</h1>
          <p className="text-white/40 text-sm">Enter your access code to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] space-y-5">
          <div>
            <label className="text-xs text-white/40 uppercase tracking-wider font-bold mb-2 block">Access Code</label>
            <div className="relative">
              <input
                type={showCode ? 'text' : 'password'}
                value={code}
                onChange={e => { setCode(e.target.value); setError(''); }}
                placeholder="Enter access code"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 px-3 py-2 rounded-lg">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 text-black font-bold text-sm hover:shadow-[0_0_20px_rgba(197,157,95,0.3)] transition-all"
          >
            Access Portal
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
