import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { auditLog } from '@/services/audit-log';

export default function NdaWizardPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        liquidCapital: '',
        buyerType: 'individual',
        financingStatus: 'pre_approved',
        certify: false,
        consent: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        auditLog.log('nda_submitted', 'user-id-placeholder', `NDA Requested for Listing Project AURA`);
        navigate('/nda/success');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="text-center space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                    <ShieldCheck className="h-6 w-6" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-white">Confidentiality Agreement</h1>
                <p className="text-white/60 max-w-md mx-auto">Execute the Non-Disclosure Agreement to access the Confidential Information Memorandum (CIM) and Data Room for <strong>Project AURA</strong>.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Buyer Qualification</CardTitle>
                        <CardDescription>We require this info to vet buyers before releasing sensitive data.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-white/60">Full Legal Name</label>
                                <Input
                                    required
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-white/60">Phone Number</label>
                                <Input
                                    required
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Email Address</label>
                            <Input
                                type="email"
                                required
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-white/60">Liquid Capital Available</label>
                                <div className="relative">
                                    <select
                                        className="flex h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.liquidCapital}
                                        onChange={e => setFormData({ ...formData, liquidCapital: e.target.value })}
                                    >
                                        <option value="" className="bg-surface text-white">Select Range...</option>
                                        <option value="<250k" className="bg-surface text-white">&lt; $250k</option>
                                        <option value="250k-500k" className="bg-surface text-white">$250k - $500k</option>
                                        <option value="500k-1m" className="bg-surface text-white">$500k - $1M</option>
                                        <option value="1m+" className="bg-surface text-white">$1M+</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50">
                                        <ArrowRight className="h-4 w-4 rotate-90" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-white/60">Buyer Type</label>
                                <div className="relative">
                                    <select
                                        className="flex h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.buyerType}
                                        onChange={e => setFormData({ ...formData, buyerType: e.target.value })}
                                    >
                                        <option value="individual" className="bg-surface text-white">Individual / Search Fund</option>
                                        <option value="strategic" className="bg-surface text-white">Strategic Buyer</option>
                                        <option value="pe" className="bg-surface text-white">Private Equity</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50">
                                        <ArrowRight className="h-4 w-4 rotate-90" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 space-y-4">
                            <div className="flex items-start space-x-3">
                                <Checkbox
                                    id="certify"
                                    checked={formData.certify}
                                    onChange={(e) => setFormData({ ...formData, certify: e.target.checked })}
                                />
                                <label htmlFor="certify" className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    I certify that the information provided is accurate and I have the funds available to complete a transaction of this size.
                                </label>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Checkbox
                                    id="consent"
                                    checked={formData.consent}
                                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                />
                                <label htmlFor="consent" className="text-sm text-white/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    I consent to communication via email and phone regarding this deal opportunity.
                                </label>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={isLoading}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                            </Button>
                            <Button type="submit" className="flex-1" isLoading={isLoading} disabled={!formData.certify || !formData.consent}>
                                Execute Agreement <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <p className="text-center text-xs text-white/40">Most NDAs are processed within 1 business day.</p>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
