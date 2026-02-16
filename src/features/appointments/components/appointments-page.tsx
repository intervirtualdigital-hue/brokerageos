import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function AppointmentsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-bold text-white mb-2">Appointments</h2>
                <p className="text-gray-400">Schedule calls with your broker team.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="h-[600px] flex flex-col">
                        <CardHeader>
                            <CardTitle>Calendar</CardTitle>
                            <CardDescription className="text-gray-400">Select a time that works for you.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-center justify-center bg-white/5 mx-6 mb-6 rounded-lg border border-dashed border-white/20">
                            <div className="text-center text-gray-400">
                                <Calendar className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>GHL Calendar Widget Placeholder</p>
                                <p className="text-xs mt-1 text-gray-500">Iframe or script integration goes here</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Upcoming Calls</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-gray-400 py-4 text-center">
                                No upcoming calls scheduled.
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Past Calls</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="border-l-2 border-accent pl-4">
                                    <p className="text-white font-medium">Introductory Call</p>
                                    <p className="text-xs text-gray-400">Oct 12, 2023 • 30 min</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
