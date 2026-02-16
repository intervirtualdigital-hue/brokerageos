export type UserRole = "seller" | "buyer" | "partner" | "broker";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
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
}
