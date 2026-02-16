import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context';
import { UserRole } from '@/features/auth/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock, ArrowRight, UserCog } from 'lucide-react';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';

// Styles for the specific login page layout
import '@/index.css';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState<UserRole>('seller');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await login(email, selectedRole);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px]" />
            </div>

            <Card className="w-full max-w-md border-accent/20 bg-white/5 backdrop-blur-xl animate-fade-in">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                        <Lock className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-2xl font-serif text-white">Sign in to Deal Room</CardTitle>
                    <CardDescription className="text-white/60">Secure access. Confidential by default.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            {/* Role Switcher for Demo Purposes */}
                            <div className="flex justify-center mb-4">
                                <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)}>
                                    <TabsList>
                                        <TabsTrigger value="seller">Seller</TabsTrigger>
                                        <TabsTrigger value="buyer">Buyer</TabsTrigger>
                                        <TabsTrigger value="partner">Partner</TabsTrigger>
                                        <TabsTrigger value="broker">Broker</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/60 uppercase">Email</label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    required
                                    className="bg-background/50 border-white/10 focus:border-accent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/60 uppercase">Password</label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="bg-background/50 border-white/10 focus:border-accent"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-11 text-base" isLoading={isLoading}>
                            Sign In <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <p className="text-center text-xs text-gray-500 mt-4">
                            We’ll never share your data without permission.
                        </p>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 border-t border-white/5 pt-6 bg-white/[0.02]">
                    <button className="text-sm text-accent hover:text-accent/80 transition-colors font-medium">
                        Email me a sign-in link
                    </button>
                    <p className="text-xs text-white/60">Useful if you don't have a password yet.</p>
                </CardFooter>
            </Card>

            {/* Demo helper */}
            <div className="absolute bottom-4 right-4 p-4 rounded-lg bg-black/80 border border-white/10 text-xs text-gray-400 max-w-xs hidden md:block">
                <div className="flex items-center gap-2 mb-2 text-accent">
                    <UserCog className="h-4 w-4" />
                    <span className="font-bold">Demo Mode</span>
                </div>
                <p>Switch tabs to simulate different user roles. No actual password required.</p>
            </div>
        </div>
    );
}
