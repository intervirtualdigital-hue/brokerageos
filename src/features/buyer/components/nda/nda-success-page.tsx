import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NdaSuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in">
            <div className="h-20 w-20 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <CheckCircle className="h-10 w-10" />
            </div>
            <div>
                <h2 className="text-3xl font-serif text-white mb-2">NDA Requested</h2>
                <p className="text-gray-400">We’ve received your request. We'll notify you via email once approved.</p>
            </div>

            <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => navigate('/')}>Return to Dashboard</Button>
                <Button onClick={() => navigate('/appointments')}>Book Buyer Fit Call</Button>
            </div>

            <p className="text-xs text-gray-500">If your capital and timeline are clear, we can move faster.</p>
        </div>
    );
}
