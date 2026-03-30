import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from './types';
import { auditLog } from '@/services/audit-log';
import { searchContactByEmail } from '@/services/api';
import { mapGHLContactToUser } from '@/types';

const AuthContext = createContext<AuthState | undefined>(undefined);

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, role: UserRole) => Promise<void>;
    logout: () => void;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restore session from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('brokerage_os_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, role: UserRole) => {
        setIsLoading(true);
        try {
            // Attempt real GHL contact lookup
            const ghlContact = await searchContactByEmail(email);

            if (ghlContact) {
                // Map GHL contact to our User type
                const mappedUser = mapGHLContactToUser(ghlContact);
                // Allow role override from login form if GHL tags don't specify a role
                // (fallback: use the role selected in the login form)
                const finalUser: User = {
                    ...mappedUser,
                    role: mappedUser.role || role,
                };

                setUser(finalUser);
                localStorage.setItem('brokerage_os_user', JSON.stringify(finalUser));
                auditLog.log('user_login', finalUser.id, `Logged in as ${finalUser.role} via GHL`);
            } else {
                // Fallback: create mock user if GHL contact not found
                // This allows the app to still function during development
                console.warn(`[Auth] No GHL contact found for ${email}. Using fallback mock login.`);
                const fallbackUser: User = {
                    id: crypto.randomUUID(),
                    name: email.split('@')[0] || 'User',
                    email,
                    role,
                    companyName: role === 'seller' ? 'Acme Corp' : role === 'buyer' ? 'Investment Holdings LLC' : undefined,
                };
                setUser(fallbackUser);
                localStorage.setItem('brokerage_os_user', JSON.stringify(fallbackUser));
                auditLog.log('user_login', fallbackUser.id, `Logged in as ${role} (fallback mock)`);
            }
        } catch (error) {
            // If API call fails entirely, fall back to mock user
            console.error('[Auth] GHL login failed, using fallback:', error);
            const fallbackUser: User = {
                id: crypto.randomUUID(),
                name: email.split('@')[0] || 'User',
                email,
                role,
                companyName: role === 'seller' ? 'Acme Corp' : role === 'buyer' ? 'Investment Holdings LLC' : undefined,
            };
            setUser(fallbackUser);
            localStorage.setItem('brokerage_os_user', JSON.stringify(fallbackUser));
            auditLog.log('user_login', fallbackUser.id, `Logged in as ${role} (API unavailable)`);
        } finally {
            setIsLoading(false);
        }
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
            localStorage.removeItem('brokerage_os_user');
            setUser(null);
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
