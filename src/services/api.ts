import { Deal, User } from '@/types';

// Mock GHL Integration Service
export const ghlService = {
    // Simulate fetching a contact from GHL
    getContact: async (id: string): Promise<User> => {
        // In production, this would call GHL API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id,
                    name: 'Alex Morgan',
                    email: 'alex@example.com',
                    role: 'buyer',
                });
            }, 500);
        });
    },

    // Simulate updating a custom field in GHL
    updateCustomField: async (contactId: string, fieldKey: string, value: any): Promise<boolean> => {
        console.log(`[GHL] Updating field ${fieldKey} for contact ${contactId} to:`, value);
        return Promise.resolve(true);
    },

    // Simulate triggering a webhook event
    triggerWebhook: async (event: string, payload: any): Promise<boolean> => {
        console.log(`[Webhook] Triggering event: ${event}`, payload);
        return Promise.resolve(true);
    },

    // Simulate fetching deals/opportunities
    getDeals: async (contactId: string): Promise<Deal[]> => {
        console.log('[Mock] Fetching deals for contact:', contactId);
        return Promise.resolve([
            {
                id: 'deal-123',
                title: 'Project AURA',
                stage: 'nda',
                updatedAt: new Date().toISOString(),
                ndaSigned: true,
            }
        ]);
    }
};
