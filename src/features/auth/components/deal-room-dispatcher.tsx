import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context';

export default function DealRoomDispatcher() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return null; // or a spinner
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === 'seller') {
        return <Navigate to="/seller/documents" replace />;
    }

    if (user.role === 'buyer') {
        return <Navigate to="/buy/data-room" replace />;
    }

    // Fallback for partner/broker or unknown roles
    return <Navigate to="/" replace />;
}
