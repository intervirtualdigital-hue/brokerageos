export const auditLog = {
    log: (action: string, userId: string, details: string) => {
        console.log(`[AUDIT] ${new Date().toISOString()} - ${action} - User: ${userId} - ${details}`);
        // In a real app, this would send data to a backend or analytics service
    }
};
