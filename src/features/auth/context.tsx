import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole, AuthState } from './types';
import { auditLog } from '@/services/audit-log';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate checking local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('brokerage_os_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, role: UserRole) => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockUser: User = {
            id: crypto.randomUUID(),
            name: email.split('@')[0] || 'User',
            email,
            role,
            companyName: role === 'seller' ? 'Acme Corp' : role === 'buyer' ? 'Investment Holdings LLC' : undefined
        };

        setUser(mockUser);
        localStorage.setItem('brokerage_os_user', JSON.stringify(mockUser));

        auditLog.log('user_login', mockUser.id, `Logged in as ${role}`);
        setIsLoading(false);
    };

    const logout = () => {
        try {
            if (user) {
                auditLog.log('user_logout', user.id, 'User logged out');
            }
            setUser(null);
            localStorage.removeItem('brokerage_os_user');
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            // Optionally, handle error, e.g., show a message to the user
            // Even if audit logging or navigation fails, we should still try to clear local storage
            localStorage.removeItem('brokerage_os_user');
            setUser(null); // Ensure user state is cleared
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
