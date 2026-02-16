export type UserRole = 'seller' | 'buyer' | 'partner' | 'broker';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
    companyName?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, role: UserRole) => Promise<void>;
    logout: () => void;
}
