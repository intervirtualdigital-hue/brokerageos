/**
 * GoHighLevel API v2 — Service Layer
 *
 * Real API calls replacing all previous mock stubs.
 * Uses the centralized ghl-client which routes through the Vite proxy.
 */

import { ghl, GHLError } from './ghl-client';
import type {
    GHLContact,
    GHLOpportunity,
    GHLPipeline,
    GHLCalendarEvent,
    GHLConversation,
    GHLMessage,
    GHLNote,
    GHLTask,
} from '@/types';

/* ─── helpers ───────────────────────────────────────────────── */

const locationId = () => import.meta.env.VITE_GHL_LOCATION_ID ?? '';
const pipelineId = () => import.meta.env.VITE_GHL_PIPELINE_ID ?? '';
const calendarId = () => import.meta.env.VITE_GHL_CALENDAR_ID ?? '';
const webhookUrl = () => import.meta.env.VITE_GHL_WEBHOOK_URL ?? '';

/* ─── Contacts ──────────────────────────────────────────────── */

export async function searchContactByEmail(email: string): Promise<GHLContact | null> {
    try {
        const res = await ghl.get<{ contacts: GHLContact[] }>('/contacts/', {
            locationId: locationId(),
            query: email,
            limit: '1',
        });
        return res.contacts?.[0] ?? null;
    } catch (e) {
        if (e instanceof GHLError && e.status === 404) return null;
        throw e;
    }
}

export async function getContact(id: string): Promise<GHLContact> {
    const res = await ghl.get<{ contact: GHLContact }>(`/contacts/${id}`);
    return res.contact;
}

export async function getContacts(): Promise<GHLContact[]> {
    const res = await ghl.get<{ contacts: GHLContact[] }>('/contacts/', {
        locationId: locationId(),
        limit: '100', // Fetch a batch for the clients view
    });
    return res.contacts ?? [];
}

export async function createContact(data: {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    tags?: string[];
    customFields?: Array<{ key: string; field_value: string }>;
}): Promise<GHLContact> {
    const res = await ghl.post<{ contact: GHLContact }>('/contacts/', {
        ...data,
        locationId: locationId(),
    });
    return res.contact;
}

export async function updateContact(
    id: string,
    data: Partial<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        tags: string[];
        customFields: Array<{ key: string; field_value: string }>;
    }>,
): Promise<GHLContact> {
    const res = await ghl.put<{ contact: GHLContact }>(`/contacts/${id}`, data);
    return res.contact;
}

/* ─── Opportunities / Deals ─────────────────────────────────── */

export async function getOpportunities(opts: {
    contactId?: string;
    pipelineId?: string;
}): Promise<GHLOpportunity[]> {
    const res = await ghl.get<{ opportunities: GHLOpportunity[] }>(
        '/opportunities/search',
        {
            location_id: locationId(),
            contact_id: opts.contactId,
            pipeline_id: opts.pipelineId || pipelineId(),
        },
    );
    return res.opportunities ?? [];
}

export async function getOpportunity(id: string): Promise<GHLOpportunity> {
    const res = await ghl.get<{ opportunity: GHLOpportunity }>(`/opportunities/${id}`);
    return res.opportunity;
}

export async function createOpportunity(data: {
    name: string;
    pipelineId: string;
    pipelineStageId: string;
    contactId: string;
    monetaryValue?: number;
    status?: string;
}): Promise<GHLOpportunity> {
    const res = await ghl.post<{ opportunity: GHLOpportunity }>('/opportunities/', {
        ...data,
        locationId: locationId(),
    });
    return res.opportunity;
}

export async function updateOpportunity(
    id: string,
    data: Partial<{
        name: string;
        pipelineStageId: string;
        status: string;
        monetaryValue: number;
    }>,
): Promise<GHLOpportunity> {
    const res = await ghl.put<{ opportunity: GHLOpportunity }>(`/opportunities/${id}`, data);
    return res.opportunity;
}

/* ─── Pipelines ─────────────────────────────────────────────── */

export async function getPipelines(): Promise<GHLPipeline[]> {
    const res = await ghl.get<{ pipelines: GHLPipeline[] }>('/opportunities/pipelines', {
        locationId: locationId(),
    });
    return res.pipelines ?? [];
}

/* ─── Calendar / Appointments ───────────────────────────────── */

export async function getAppointments(opts?: {
    contactId?: string;
    startTime?: string;
    endTime?: string;
}): Promise<GHLCalendarEvent[]> {
    const calId = calendarId();
    if (!calId) {
        console.warn('[GHL] No VITE_GHL_CALENDAR_ID configured');
        return [];
    }
    const res = await ghl.get<{ events: GHLCalendarEvent[] }>(
        `/calendars/events`,
        {
            locationId: locationId(),
            calendarId: calId,
            contactId: opts?.contactId,
            startTime: opts?.startTime,
            endTime: opts?.endTime,
        },
    );
    return res.events ?? [];
}

export async function createAppointment(data: {
    calendarId: string;
    contactId: string;
    startTime: string;
    endTime: string;
    title?: string;
    notes?: string;
}): Promise<GHLCalendarEvent> {
    const res = await ghl.post<GHLCalendarEvent>('/calendars/events', {
        ...data,
        locationId: locationId(),
    });
    return res;
}

/* ─── Conversations / Messages ──────────────────────────────── */

export async function getConversations(contactId?: string): Promise<GHLConversation[]> {
    const res = await ghl.get<{ conversations: GHLConversation[] }>(
        '/conversations/search',
        {
            locationId: locationId(),
            contactId,
        },
    );
    return res.conversations ?? [];
}

export async function getConversationMessages(
    conversationId: string,
): Promise<GHLMessage[]> {
    const res = await ghl.get<{ messages: { messages: GHLMessage[] } }>(
        `/conversations/${conversationId}/messages`,
    );
    return res.messages?.messages ?? [];
}

export async function sendMessage(data: {
    conversationId: string;
    type: string; // 'SMS' | 'Email' | 'WhatsApp' etc
    message: string;
    contactId: string;
}): Promise<GHLMessage> {
    const res = await ghl.post<GHLMessage>('/conversations/messages', {
        ...data,
        locationId: locationId(),
    });
    return res;
}

/* ─── Notes (activity feed) ─────────────────────────────────── */

export async function getContactNotes(contactId: string): Promise<GHLNote[]> {
    const res = await ghl.get<{ notes: GHLNote[] }>(
        `/contacts/${contactId}/notes`,
    );
    return res.notes ?? [];
}

export async function createContactNote(
    contactId: string,
    body: string,
): Promise<GHLNote> {
    const res = await ghl.post<{ note: GHLNote }>(
        `/contacts/${contactId}/notes`,
        { body, userId: contactId },
    );
    return res.note;
}

/* ─── Tasks ─────────────────────────────────────────────────── */

export async function getContactTasks(contactId: string): Promise<GHLTask[]> {
    const res = await ghl.get<{ tasks: GHLTask[] }>(
        `/contacts/${contactId}/tasks`,
    );
    return res.tasks ?? [];
}

export async function createContactTask(
    contactId: string,
    data: { title: string; body?: string; dueDate?: string; assignedTo?: string },
): Promise<GHLTask> {
    const res = await ghl.post<{ task: GHLTask }>(
        `/contacts/${contactId}/tasks`,
        data,
    );
    return res.task;
}

export async function updateContactTask(
    contactId: string,
    taskId: string,
    data: { status?: 'completed' | 'pending'; completed?: boolean },
): Promise<GHLTask> {
    const res = await ghl.put<{ task: GHLTask }>(
        `/contacts/${contactId}/tasks/${taskId}`,
        data,
    );
    return res.task;
}

/* ─── Webhooks ──────────────────────────────────────────────── */

export async function triggerWebhook(
    event: string,
    payload: Record<string, unknown>,
): Promise<boolean> {
    const url = webhookUrl();
    if (!url) {
        console.warn('[GHL] No webhook URL configured. Skipping.');
        return false;
    }
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event, ...payload }),
        });
        return true;
    } catch (err) {
        console.error('[Webhook] Failed:', err);
        return false;
    }
}

/* ─── Backward-compatible default export ────────────────────── */

export const ghlService = {
    searchContactByEmail,
    getContact,
    createContact,
    updateContact,
    getOpportunities,
    getOpportunity,
    createOpportunity,
    updateOpportunity,
    getPipelines,
    getAppointments,
    createAppointment,
    getConversations,
    getConversationMessages,
    sendMessage,
    getContactNotes,
    createContactNote,
    getContactTasks,
    createContactTask,
    updateContactTask,
    triggerWebhook,
};
