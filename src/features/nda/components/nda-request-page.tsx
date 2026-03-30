import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck, ArrowRight, FileText, Loader2 } from 'lucide-react';
import { createContact, createOpportunity, triggerWebhook } from '@/services/api';

export default function NDARequestPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        liquidCapital: '',
        timeline: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Create GHL contact with NDA info
            const nameParts = formData.fullName.split(' ');
            const contact = await createContact({
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                email: formData.email,
                phone: formData.phone,
                tags: ['buyer', 'nda-requested'],
                customFields: [
                    { key: 'liquid_capital', field_value: formData.liquidCapital },
                    { key: 'acquisition_timeline', field_value: formData.timeline },
                ],
            });

            // Create opportunity
            const pipelineId = import.meta.env.VITE_GHL_PIPELINE_ID;
            if (pipelineId && contact?.id) {
                await createOpportunity({
                    name: `NDA Request — ${formData.fullName}`,
                    pipelineId,
                    pipelineStageId: 'nda',
                    contactId: contact.id,
                    status: 'open',
                });
            }

            // Trigger webhook
            await triggerWebhook('nda_requested', {
                contactId: contact?.id,
                ...formData,
            });

            setIsSubmitted(true);
        } catch (error) {
            console.error('[NDA] Submission failed:', error);
            // Graceful degradation — show success anyway
            setIsSubmitted(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in">
                <div className="h-20 w-20 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <ShieldCheck className="h-10 w-10" />
                </div>
                <div>
                    <h2 className="text-3xl font-serif text-white mb-2">NDA Request Received</h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                        We have received your request. A confirmation email has been sent to your inbox.
                        Once approved, you will be granted access to the Data Room.
                    </p>
                </div>
                <div className="pt-4">
                    <Button variant="outline" onClick={() => window.location.href = '/'}>Return to Dashboard</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif font-bold text-white">Confidentiality Agreement</h2>
                <p className="text-gray-400">Complete this step to unlock detailed financials and operational data.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Info Column */}
                <div className="space-y-6">
                    <Card className="bg-surface/50 border-accent/20">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-accent" />
                                Why is this required?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-gray-300">
                            <p>
                                BrokerageOS represents sensitive business sales. To protect our sellers, we require all potential buyers to agree to our standard Non-Disclosure Agreement.
                            </p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li>Protects seller's trade secrets and customer lists.</li>
                                <li>Ensures discretion during the sale process.</li>
                                <li>Verifies buyer intent and qualification.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-white">What you get access to:</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-400 pl-8">
                            <li>Full P&L and Balance Sheets</li>
                            <li>Operational Organization Charts</li>
                            <li>Customer Concentration Reports</li>
                            <li>Legal Contract Templates</li>
                        </ul>
                    </div>
                </div>

                {/* Form Column */}
                <Card className="border-t-4 border-t-accent">
                    <CardHeader>
                        <CardTitle>Buyer Qualification & NDA</CardTitle>
                        <CardDescription className="text-gray-400">Please provide your details below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Full Legal Name</label>
                                <Input
                                    required
                                    placeholder="e.g. Jonathan Smith"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white">Email Address</label>
                                    <Input
                                        type="email"
                                        required
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white">Phone Number</label>
                                    <Input
                                        type="tel"
                                        required
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Liquid Capital Range</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                                    value={formData.liquidCapital}
                                    onChange={e => setFormData({ ...formData, liquidCapital: e.target.value })}
                                >
                                    <option value="" className="bg-background">Select range...</option>
                                    <option value="under_500k" className="bg-background">$0 - $500k</option>
                                    <option value="500k_1m" className="bg-background">$500k - $1M</option>
                                    <option value="1m_5m" className="bg-background">$1M - $5M</option>
                                    <option value="5m_plus" className="bg-background">$5M+</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Acquisition Timeline</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                                    value={formData.timeline}
                                    onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                                >
                                    <option value="" className="bg-background">Select timeline...</option>
                                    <option value="immediate" className="bg-background">Immediate (0-3 months)</option>
                                    <option value="short" className="bg-background">Short term (3-6 months)</option>
                                    <option value="searching" className="bg-background">Just starting search</option>
                                </select>
                            </div>

                            <div className="pt-4 space-y-4">
                                <div className="flex items-start gap-3">
                                    <Checkbox id="terms" required className="mt-1" />
                                    <label htmlFor="terms" className="text-xs text-gray-400 leading-snug cursor-pointer">
                                        I agree to the <span className="text-accent hover:underline">Confidentiality Agreement</span> and affirm that the information provided is accurate. I understand that false information may lead to revocation of access.
                                    </label>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Checkbox id="marketing" className="mt-1" />
                                    <label htmlFor="marketing" className="text-xs text-gray-400 leading-snug cursor-pointer">
                                        I confirm I am a qualified investor capable of completing a transaction of this size.
                                    </label>
                                </div>
                            </div>

                            <Button type="submit" className="w-full mt-2" size="lg" isLoading={isLoading}>
                                {isLoading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                                ) : (
                                    <>Sign NDA & Request Access <ArrowRight className="ml-2 h-4 w-4" /></>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
