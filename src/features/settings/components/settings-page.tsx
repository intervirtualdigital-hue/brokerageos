import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Key, User, CreditCard, Shield, Users, Save, Upload, Camera } from 'lucide-react';
import { toast } from 'sonner';

type Tab = 'profile' | 'api' | 'team' | 'billing' | 'security';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<Tab>('profile');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('Alex');
    const [lastName, setLastName] = useState('Morgan');
    const [email, setEmail] = useState('alex@brokerageos.com');
    const [phone, setPhone] = useState('+1 (416) 555-0199');
    const [role, setRole] = useState('Founder & CEO');
    const [twoFA, setTwoFA] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            setAvatarUrl(ev.target?.result as string);
            toast.success('Avatar updated!');
        };
        reader.readAsDataURL(file);
    };

    const tabs: {id: Tab, label: string, icon: any}[] = [
        { id: 'profile', label: 'General Profile', icon: User },
        { id: 'api', label: 'API & Integrations', icon: Key },
        { id: 'team', label: 'Team Members', icon: Users },
        { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <div className="space-y-8 max-w-[900px] animate-fade-in text-white/80 pb-12">
            <div>
                <h2 className="text-[32px] font-serif font-bold text-white mb-2 tracking-tight">System Settings</h2>
                <p className="text-white/50 text-[15px]">Configure your BrokerageOS environment.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-[240px] shrink-0 space-y-1">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl font-semibold text-[14px] transition-colors ${activeTab === tab.id ? 'bg-brand-gold/10 text-brand-gold' : 'text-white/60 hover:text-white hover:bg-[#222]'}`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 space-y-8 w-full">
                    {/* ─── PROFILE TAB ─── */}
                    {activeTab === 'profile' && (
                    <Card className="bg-[#161616] border-[#2A2A2A] p-8 rounded-3xl animate-fade-in">
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                        <div className="flex items-center gap-6 mb-8 border-b border-[#2A2A2A] pb-8">
                            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" className="h-20 w-20 rounded-full object-cover border-2 border-brand-gold shadow-[0_0_20px_rgba(255,221,89,0.3)]" />
                                ) : (
                                    <div className="h-20 w-20 rounded-full bg-brand-gold flex items-center justify-center text-black font-bold text-2xl shadow-[0_0_20px_rgba(255,221,89,0.3)]">
                                        {initials}
                                    </div>
                                )}
                                <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <div>
                                <p className="text-[18px] font-bold text-white mb-1">{firstName} {lastName}</p>
                                <p className="text-[13px] text-white/50 mb-2">{role}</p>
                                <button onClick={() => fileInputRef.current?.click()} className="text-[13px] font-bold text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded-lg hover:bg-brand-gold/20 transition-colors border border-brand-gold/20 flex items-center gap-1.5">
                                    <Upload className="h-3 w-3" /> Upload Photo
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-[14px] font-bold text-white uppercase tracking-widest">Personal Info</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-2 block">First Name</label>
                                    <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[14px] text-white focus:outline-none focus:border-brand-gold/50" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Last Name</label>
                                    <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[14px] text-white focus:outline-none focus:border-brand-gold/50" value={lastName} onChange={e => setLastName(e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Email Address</label>
                                    <input type="email" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[14px] text-white focus:outline-none focus:border-brand-gold/50" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Phone</label>
                                    <input type="tel" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[14px] text-white focus:outline-none focus:border-brand-gold/50" value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Role / Title</label>
                                    <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[14px] text-white focus:outline-none focus:border-brand-gold/50" value={role} onChange={e => setRole(e.target.value)} />
                                </div>
                            </div>
                            
                            <div className="pt-4 flex justify-end">
                                <button onClick={() => toast.success('Profile saved successfully')} className="bg-brand-gold text-black font-semibold text-[13px] px-6 py-2.5 rounded-xl hover:bg-brand-gold/90 transition-colors flex items-center gap-2">
                                    <Save className="h-4 w-4" /> Save Profile
                                </button>
                            </div>
                        </div>
                    </Card>
                    )}

                    {/* ─── API TAB ─── */}
                    {activeTab === 'api' && (
                    <Card className="bg-[#161616] border-[#2A2A2A] p-8 rounded-3xl space-y-6 animate-fade-in">
                        <div className="flex items-center gap-3 mb-2">
                            <Key className="h-5 w-5 text-brand-gold" />
                            <h3 className="text-[16px] font-bold text-white">GoHighLevel Integration</h3>
                        </div>
                        <p className="text-[13px] text-white/40 -mt-4 mb-6">These tokens connect your app directly to the GHL API v2.</p>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-2 block flex items-center justify-between">
                                    Location ID
                                    <span className="text-[#10B981] capitalize tracking-normal text-[10px] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">Connected</span>
                                </label>
                                <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[13px] font-mono text-white/80 focus:outline-none focus:border-brand-gold/50" defaultValue="S4QtQWuGlLlhsYZThyCh" />
                            </div>
                            <div>
                                <label className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Private Integration Token</label>
                                <div className="relative">
                                    <input type="password" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[13px] font-mono text-brand-gold focus:outline-none focus:border-brand-gold/50 pr-12" defaultValue="pit-9c6732fa-b5d5-44c2-b64e-eadfe310696c" />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-[12px] font-bold">SHOW</button>
                                </div>
                            </div>
                            <div>
                                <label className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Webhook URL (Inbound)</label>
                                <input type="text" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl text-[13px] font-mono text-white/60 focus:outline-none focus:border-brand-gold/50" defaultValue="https://services.leadconnectorhq.com/hooks/..." />
                            </div>
                        </div>
                        
                        <div className="pt-4 flex justify-end">
                            <button onClick={() => toast.success('GHL Configuration Saved')} className="bg-white text-black font-semibold text-[13px] px-6 py-2.5 rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2">
                                <Save className="h-4 w-4" /> Save Configuration
                            </button>
                        </div>
                    </Card>
                    )}

                    {/* ─── TEAM TAB ─── */}
                    {activeTab === 'team' && (
                    <Card className="bg-[#161616] border-[#2A2A2A] p-8 rounded-3xl space-y-6 animate-fade-in">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-[16px] font-bold text-white">Team Members</h3>
                                <p className="text-[13px] text-white/40 mt-1">Manage your brokerage staff and advisor access.</p>
                            </div>
                            <button onClick={() => toast.info('Invite link copied to clipboard')} className="bg-brand-gold text-black font-semibold text-[13px] px-5 py-2.5 rounded-xl hover:bg-brand-gold/90 transition-colors flex items-center gap-2">
                                <Users className="h-3.5 w-3.5" /> Invite Member
                            </button>
                        </div>
                        {[
                            { name: 'Alex Morgan', email: 'alex@brokerageos.com', role: 'Owner', active: true },
                            { name: 'Sarah Chen', email: 'sarah@brokerageos.com', role: 'Senior Advisor', active: true },
                            { name: 'James Taylor', email: 'james@brokerageos.com', role: 'Analyst', active: false },
                        ].map((member, i) => (
                            <div key={i} className="flex items-center justify-between py-4 border-b border-[#2A2A2A] last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#222] border border-[#333] flex items-center justify-center text-white/60 text-[12px] font-bold">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-white">{member.name}</p>
                                        <p className="text-[12px] text-white/40">{member.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${member.active ? 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20' : 'text-white/30 bg-white/5 border-white/10'}`}>
                                        {member.active ? 'Active' : 'Inactive'}
                                    </span>
                                    <span className="text-[12px] text-white/50 font-medium">{member.role}</span>
                                </div>
                            </div>
                        ))}
                    </Card>
                    )}

                    {/* ─── BILLING TAB ─── */}
                    {activeTab === 'billing' && (
                    <Card className="bg-[#161616] border-[#2A2A2A] p-8 rounded-3xl space-y-6 animate-fade-in">
                        <h3 className="text-[16px] font-bold text-white">Billing & Subscription</h3>
                        <p className="text-[13px] text-white/40">Manage your BrokerageOS Elite plan and payment methods.</p>
                        <div className="bg-[#1A1A1A] p-6 border border-brand-gold/30 rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-[14px] font-bold text-white mb-1">Elite Firm License</p>
                                    <p className="text-[12px] text-white/50">Next billing: April 15, 2026</p>
                                </div>
                                <span className="bg-brand-gold text-black font-bold text-[12px] px-4 py-1.5 rounded-full">$499 / mo</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2A2A2A]">
                                <div className="text-center">
                                    <p className="text-[20px] font-bold text-white">∞</p>
                                    <p className="text-[11px] text-white/40">Contacts</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[20px] font-bold text-white">10</p>
                                    <p className="text-[11px] text-white/40">Team Seats</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[20px] font-bold text-white">50GB</p>
                                    <p className="text-[11px] text-white/40">Data Room</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-[#1A1A1A] p-5 rounded-2xl border border-[#2A2A2A]">
                            <div className="flex items-center gap-3">
                                <CreditCard className="h-5 w-5 text-white/50" />
                                <div>
                                    <p className="text-[13px] font-bold text-white">Visa ending 4242</p>
                                    <p className="text-[11px] text-white/40">Expires 12/2027</p>
                                </div>
                            </div>
                            <button onClick={() => toast.info('Payment method management coming soon')} className="text-[12px] font-bold text-brand-gold hover:underline">Update</button>
                        </div>
                    </Card>
                    )}

                    {/* ─── SECURITY TAB ─── */}
                    {activeTab === 'security' && (
                    <Card className="bg-[#161616] border-[#2A2A2A] p-8 rounded-3xl space-y-6 animate-fade-in">
                        <h3 className="text-[16px] font-bold text-white">Security Settings</h3>
                        <p className="text-[13px] text-white/40">Protect your firm's data and client access endpoints.</p>
                        
                        <div className="flex items-center justify-between py-4 border-b border-[#2A2A2A]">
                            <div>
                                <p className="text-[14px] font-bold text-white mb-1">Two-Factor Authentication</p>
                                <p className="text-[12px] text-white/50">Add an extra layer of security to your account.</p>
                            </div>
                            <button
                                onClick={() => { setTwoFA(!twoFA); toast.success(twoFA ? '2FA Disabled' : '2FA Enabled'); }}
                                className={`relative w-12 h-6 rounded-full transition-colors ${twoFA ? 'bg-[#10B981]' : 'bg-[#333]'}`}
                            >
                                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${twoFA ? 'translate-x-6' : 'translate-x-0.5'}`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between py-4 border-b border-[#2A2A2A]">
                            <div>
                                <p className="text-[14px] font-bold text-white mb-1">Session Timeout</p>
                                <p className="text-[12px] text-white/50">Auto-logout after period of inactivity.</p>
                            </div>
                            <select className="bg-[#1A1A1A] border border-[#2A2A2A] text-white text-[13px] px-3 py-2 rounded-xl focus:outline-none focus:border-brand-gold/50">
                                <option>30 minutes</option>
                                <option>1 hour</option>
                                <option>4 hours</option>
                                <option>Never</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between py-4">
                            <div>
                                <p className="text-[14px] font-bold text-white mb-1">Change Password</p>
                                <p className="text-[12px] text-white/50">Last changed: 14 days ago</p>
                            </div>
                            <button onClick={() => toast.info('Password reset email sent')} className="px-4 py-2 border border-[#2A2A2A] rounded-xl text-[12px] font-bold text-white/60 hover:text-white hover:border-white/30 transition-colors">
                                Reset Password
                            </button>
                        </div>
                    </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
