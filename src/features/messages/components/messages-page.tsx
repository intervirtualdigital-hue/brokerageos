import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Send } from 'lucide-react';

export default function MessagesPage() {
    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            <div className="mb-6">
                <h2 className="text-3xl font-serif font-bold text-white mb-2">Messages</h2>
                <p className="text-gray-400">Secure communication with your broker.</p>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
                {/* Thread List */}
                <Card className="flex flex-col h-full bg-white/5 border-white/10">
                    <CardHeader className="p-4 border-b border-white/10">
                        <CardTitle className="text-sm">Conversations</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 overflow-y-auto">
                        <div className="p-2 space-y-2">
                            <div className="p-3 rounded-lg bg-accent/20 border border-accent/20 cursor-pointer">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-medium text-white text-sm">Next Steps: Due Diligence</h4>
                                    <span className="text-[10px] text-accent">2m ago</span>
                                </div>
                                <p className="text-xs text-gray-300 line-clamp-2">Please see the attached document regarding the Q3 financials query...</p>
                            </div>

                            <div className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-medium text-gray-300 text-sm">NDA Confirmation</h4>
                                    <span className="text-[10px] text-gray-500">Yesterday</span>
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2">Thanks for signing the NDA. Access has been granted.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Chat Area */}
                <Card className="lg:col-span-2 flex flex-col h-full overflow-hidden">
                    <CardHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                                <span className="text-xs font-bold text-white">SJ</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-white">Sarah Jenkins</h3>
                                <p className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="block h-1.5 w-1.5 rounded-full bg-green-400" /> Online
                                </p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="flex justify-start">
                            <div className="max-w-[80%] rounded-lg bg-white/10 p-3 text-sm text-gray-200">
                                Hello Alex, I've uploaded the Q3 reports you requested. Let me know if you need anything else.
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="max-w-[80%] rounded-lg bg-accent text-background p-3 text-sm font-medium">
                                Thanks Sarah. I'll take a look tonight. When are we scheduled for the follow-up call?
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="max-w-[80%] rounded-lg bg-white/10 p-3 text-sm text-gray-200">
                                We can do Thursday at 2 PM EST. Does that work?
                            </div>
                        </div>
                    </CardContent>

                    <div className="p-4 border-t border-white/10 bg-white/5">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                <Paperclip className="h-5 w-5" />
                            </Button>
                            <Input placeholder="Type your message..." className="bg-background border-white/10 focus-visible:ring-offset-0" />
                            <Button size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
