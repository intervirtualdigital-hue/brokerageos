import { CheckCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function DataRoomReadyPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-fade-in relative z-10">
            <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-accent to-yellow-600 flex items-center justify-center text-white shadow-[0_0_40px_rgba(197,157,95,0.4)]">
                    <ShieldCheck className="h-12 w-12" />
                </div>
                <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-green-500 border-4 border-background flex items-center justify-center text-white">
                    <CheckCircle className="h-4 w-4" />
                </div>
            </div>

            <div className="space-y-4 max-w-lg">
                <h2 className="text-4xl font-serif font-bold text-white">Your data room is ready</h2>
                <p className="text-lg text-gray-300">
                    We've organized your documents into a secure, compliant structure. You can now invite buyers to view your listing.
                </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 w-full max-w-md text-left space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">What happens next?</h4>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 text-xs font-bold">1</div>
                        <span>Verified buyers request access via NDA.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 text-xs font-bold">2</div>
                        <span>You (or your broker) approve each request.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 text-xs font-bold">3</div>
                        <span>We track every view and download in the Audit Log.</span>
                    </li>
                </ul>
            </div>

            <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate('/')}>Return to Dashboard</Button>
                <Button onClick={() => navigate('/seller/resources')}>View Selling Guide</Button>
            </div>
        </div>
    );
}
