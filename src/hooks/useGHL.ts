/**
 * useGHL — React hooks for GHL data fetching
 *
 * Each hook manages its own loading / error / data state and auto-fetches
 * on mount. Refresh can be triggered by calling `refetch()`.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import * as api from '@/services/api';
import type {
    Deal,
} from '@/types';
import { mapGHLOpportunityToDeal, mapGHLContactToUser } from '@/types';

/* ─── generic async hook ────────────────────────────────────── */

function useAsync<T>(
    fn: () => Promise<T>,
    deps: unknown[] = [],
) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const mountedRef = useRef(true);

    const execute = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await fn();
            if (mountedRef.current) setData(result);
        } catch (err) {
            if (mountedRef.current) setError(err as Error);
        } finally {
            if (mountedRef.current) setIsLoading(false);
        }
    }, deps);

    useEffect(() => {
        mountedRef.current = true;
        execute();
        return () => { mountedRef.current = false; };
    }, [execute]);

    return { data, isLoading, error, refetch: execute };
}

/* ─── Opportunities ─────────────────────────────────────────── */

export function useOpportunities(contactId?: string) {
    return useAsync(
        () => api.getOpportunities({ contactId }),
        [contactId],
    );
}

export function useDeals(contactId?: string) {
    const { data: opps, ...rest } = useOpportunities(contactId);
    const deals: Deal[] = (opps ?? []).map(o => mapGHLOpportunityToDeal(o));
    return { data: deals, ...rest };
}

/* ─── Pipelines ─────────────────────────────────────────────── */

export function usePipelines() {
    return useAsync(() => api.getPipelines(), []);
}

/* ─── Appointments ──────────────────────────────────────────── */

export function useAppointments(contactId?: string) {
    return useAsync(
        () => api.getAppointments({ contactId }),
        [contactId],
    );
}

/* ─── Conversations ─────────────────────────────────────────── */

export function useConversations(contactId?: string) {
    return useAsync(
        () => api.getConversations(contactId),
        [contactId],
    );
}

export function useConversationMessages(conversationId: string | null) {
    return useAsync(
        () => conversationId ? api.getConversationMessages(conversationId) : Promise.resolve([]),
        [conversationId],
    );
}

/* ─── Notes (activity) ──────────────────────────────────────── */

export function useContactNotes(contactId?: string) {
    return useAsync(
        () => contactId ? api.getContactNotes(contactId) : Promise.resolve([]),
        [contactId],
    );
}

/* ─── Tasks ─────────────────────────────────────────────────── */

export function useContactTasks(contactId?: string) {
    return useAsync(
        () => contactId ? api.getContactTasks(contactId) : Promise.resolve([]),
        [contactId],
    );
}

/* ─── Contact Lookup ────────────────────────────────────────── */

export function useContactLookup(email: string | null) {
    return useAsync(
        async () => {
            if (!email) return null;
            const contact = await api.searchContactByEmail(email);
            return contact ? mapGHLContactToUser(contact) : null;
        },
        [email],
    );
}

export function useContacts() {
    return useAsync(
        () => api.getContacts(),
        [],
    );
}
