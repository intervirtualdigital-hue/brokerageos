import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function VerificationBookingPage() {
    const [isBooked, setIsBooked] = useState(false);
    const navigate = useNavigate();

    const handleBookingSim = () => {
        // Simulate booking action
        setTimeout(() => setIsBooked(true), 1000);
    };

    if (isBooked) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in">
                <div className="h-20 w-20 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <CheckCircle className="h-10 w-10" />
                </div>
                <div>
                    <h2 className="text-3xl font-serif text-white mb-2">You’re booked</h2>
                    <div className="text-gray-400 max-w-md mx-auto space-y-1">
                        <p><strong>Date:</strong> Fri, Oct 27 at 2:00 PM EST</p>
                        <p><strong>With:</strong> David Miller, Senior Broker</p>
                    </div>
                </div>

                <div className="bg-white/5 p-6 rounded-lg max-w-md w-full text-left">
                    <h4 className="text-sm font-bold text-white mb-2">What to prepare:</h4>
                    <ul className="text-sm text-gray-400 list-disc pl-4 space-y-1">
                        <li>Last 3 years of Tax Returns</li>
                        <li>YTD P&L Statement</li>
                        <li>List of Owner Add-backs</li>
                    </ul>
                </div>

                <div className="pt-4 flex gap-4">
                    <Button variant="outline" onClick={() => navigate('/')}>Return Home</Button>
                    <Button onClick={() => navigate('/documents')}>Upload Documents</Button>
                </div>

                <p className="text-xs text-gray-500">Uploading early helps us identify add-backs faster.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-serif font-bold text-white mb-2">Book your verification call</h2>
                <p className="text-gray-400">15 to 30 minutes. Confidential. No obligation.</p>
            </div>

            <Card className="h-[600px] flex flex-col">
                <CardContent className="flex-1 flex items-center justify-center bg-white/5 m-6 rounded-lg border border-dashed border-white/20 relative">
                    <div className="text-center text-gray-400">
                        <Calendar className="h-10 w-10 mx-auto mb-3 opacity-50" />
                        <p>GHL Calendar Widget Placeholder</p>
                        <p className="text-xs mt-1 text-gray-500">If you don’t see a time request one and we’ll hold a slot.</p>
                    </div>

                    {/* Simulate interaction overlay */}
                    <div className="absolute inset-0 flex items-end justify-center pb-10">
                        <Button onClick={handleBookingSim}>Simulate Booking Confirmation</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
