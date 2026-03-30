/* ────────────────────────────────────────────────────────────
 *  App-level types  (existing)
 * ──────────────────────────────────────────────────────────── */

export type UserRole = "seller" | "buyer" | "partner" | "broker";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
    companyName?: string;
    phone?: string;
    ghlContactId?: string;       // Link back to GHL
}

export type DealStage =
    | "inquiry"
    | "nda"
    | "access_granted"
    | "review"
    | "offer"
    | "due_diligence"
    | "closing"
    | "completed";

export interface Deal {
    id: string;
    title: string;
    stage: DealStage;
    updatedAt: string;
    valuation?: number;
    askingPrice?: number;
    ndaSigned: boolean;
    pipelineId?: string;
    contactId?: string;
}

export interface AuditLogEntry {
    id: string;
    action: string;
    userId: string;
    timestamp: string;
    details?: string;
}

export interface Document {
    id: string;
    name: string;
    category: "financials" | "tax" | "contracts" | "ops" | "hr" | "ip" | "other";
    size: number; // bytes
    updatedAt: string;
    accessLevel: UserRole[];
    url?: string;
}

/* ────────────────────────────────────────────────────────────
 *  GHL API Response Types
 * ──────────────────────────────────────────────────────────── */

/** GHL Contact – subset of fields we use */
export interface GHLContact {
    id: string;
    contactName?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    phone?: string;
    tags?: string[];
    companyName?: string;
    customFields?: GHLCustomField[];
    assignedTo?: string;
    dateAdded?: string;
    locationId?: string;
}

export interface GHLCustomField {
    id: string;
    key?: string;
    field_value?: string | string[];
    value?: string | string[];
}

/** GHL Opportunity */
export interface GHLOpportunity {
    id: string;
    name: string;
    monetaryValue?: number;
    pipelineId: string;
    pipelineStageId: string;
    status: string;
    contactId: string;
    assignedTo?: string;
    createdAt?: string;
    updatedAt?: string;
    customFields?: GHLCustomField[];
}

/** GHL Pipeline */
export interface GHLPipeline {
    id: string;
    name: string;
    stages: GHLPipelineStage[];
    locationId: string;
}

export interface GHLPipelineStage {
    id: string;
    name: string;
    position: number;
}

/** GHL Calendar Event / Appointment */
export interface GHLCalendarEvent {
    id: string;
    calendarId: string;
    title?: string;
    status: string;
    appoinmentStatus?: string;
    startTime: string;
    endTime: string;
    contactId?: string;
    assignedUserId?: string;
    notes?: string;
    dateAdded?: string;
}

/** GHL Conversation */
export interface GHLConversation {
    id: string;
    contactId: string;
    locationId: string;
    lastMessageBody?: string;
    lastMessageDate?: string;
    lastMessageType?: string;
    type?: string;
    unreadCount?: number;
    fullName?: string;
    contactName?: string;
    email?: string;
    phone?: string;
}

/** GHL Message */
export interface GHLMessage {
    id: string;
    conversationId: string;
    body: string;
    type: number; // 1 = sms, 2 = email, etc.
    direction: 'inbound' | 'outbound';
    status?: string;
    dateAdded: string;
    contactId?: string;
    userId?: string;
    attachments?: string[];
}

/** GHL Task/Note (used for activity feed) */
export interface GHLTask {
    id: string;
    title?: string;
    body?: string;
    contactId: string;
    assignedTo?: string;
    status?: string;
    dueDate?: string;
    dateAdded?: string;
    completed?: boolean;
}

export interface GHLNote {
    id: string;
    body: string;
    contactId: string;
    userId?: string;
    dateAdded?: string;
}

/* ────────────────────────────────────────────────────────────
 *  Mapping Utilities  (GHL → App types)
 * ──────────────────────────────────────────────────────────── */

const STAGE_MAP: Record<string, DealStage> = {
    // Common GHL pipeline stage names → app stage IDs
    // Users can customize; these are reasonable defaults
    'inquiry': 'inquiry',
    'new lead': 'inquiry',
    'nda': 'nda',
    'nda signed': 'nda',
    'access granted': 'access_granted',
    'data room': 'access_granted',
    'review': 'review',
    'under review': 'review',
    'offer': 'offer',
    'loi': 'offer',
    'due diligence': 'due_diligence',
    'due_diligence': 'due_diligence',
    'closing': 'closing',
    'completed': 'completed',
    'closed won': 'completed',
    'closed': 'completed',
};

export function mapGHLContactToUser(c: GHLContact): User {
    const tags = (c.tags ?? []).map(t => t.toLowerCase());
    let role: UserRole = 'buyer'; // default
    if (tags.includes('seller')) role = 'seller';
    else if (tags.includes('partner')) role = 'partner';
    else if (tags.includes('broker')) role = 'broker';

    return {
        id: c.id,
        name: c.name || c.contactName || `${c.firstName ?? ''} ${c.lastName ?? ''}`.trim() || 'Unknown',
        email: c.email ?? '',
        role,
        phone: c.phone,
        companyName: c.companyName,
        ghlContactId: c.id,
    };
}

export function mapGHLOpportunityToDeal(
    opp: GHLOpportunity,
    stages: GHLPipelineStage[] = [],
): Deal {
    // Try to match stage name from pipeline stages list
    const stageMeta = stages.find(s => s.id === opp.pipelineStageId);
    const stageKey = (stageMeta?.name ?? '').toLowerCase();
    const mappedStage: DealStage = STAGE_MAP[stageKey] ?? 'inquiry';

    return {
        id: opp.id,
        title: opp.name,
        stage: mappedStage,
        updatedAt: opp.updatedAt ?? opp.createdAt ?? new Date().toISOString(),
        valuation: opp.monetaryValue,
        askingPrice: opp.monetaryValue,
        ndaSigned: ['nda', 'access_granted', 'review', 'offer', 'due_diligence', 'closing', 'completed'].includes(mappedStage),
        pipelineId: opp.pipelineId,
        contactId: opp.contactId,
    };
}

export function mapGHLConversation(c: GHLConversation) {
    return {
        id: c.id,
        contactId: c.contactId,
        lastMessage: c.lastMessageBody ?? '',
        lastMessageDate: c.lastMessageDate ?? '',
        unreadCount: c.unreadCount ?? 0,
        contactName: c.fullName || c.contactName || c.email || 'Unknown',
    };
}

export function mapGHLMessage(m: GHLMessage) {
    return {
        id: m.id,
        body: m.body,
        direction: m.direction,
        timestamp: m.dateAdded,
        attachments: m.attachments ?? [],
    };
}
