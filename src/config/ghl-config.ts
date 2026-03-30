/**
 * BrokerageOS Lite — GHL CRM Configuration
 * Single source of truth for all custom field keys, tags, and pipeline config.
 */

/* ─── Custom Field Keys ─────────────────────────────────────── */

export const FIELDS = {
  // General Meta
  lead_source: 'BROKERAGEOS_lead_source',
  avatar_type: 'BROKERAGEOS_avatar_type',
  product_interest: 'BROKERAGEOS_product_interest',
  page_url: 'BROKERAGEOS_page_url',
  submission_timestamp: 'BROKERAGEOS_submission_timestamp',
  environment: 'BROKERAGEOS_environment',
  app_version: 'BROKERAGEOS_app_version',
  raw_form_type: 'raw_form_type',

  // Seller / Valuation
  valuation_industry: 'BROKERAGEOS_valuation_industry',
  valuation_revenue_ltm: 'BROKERAGEOS_valuation_revenue_ltm',
  valuation_earnings: 'BROKERAGEOS_valuation_earnings',
  valuation_earnings_type: 'BROKERAGEOS_valuation_earnings_type',
  valuation_margin_percent: 'BROKERAGEOS_valuation_margin_percent',
  valuation_multiple_low: 'BROKERAGEOS_valuation_multiple_low',
  valuation_multiple_high: 'BROKERAGEOS_valuation_multiple_high',
  valuation_estimated_low: 'BROKERAGEOS_valuation_estimated_low',
  valuation_estimated_high: 'BROKERAGEOS_valuation_estimated_high',
  valuation_readiness_score: 'BROKERAGEOS_valuation_readiness_score',
  strategic_premium_flag: 'BROKERAGEOS_strategic_premium_flag',
  exit_timeline: 'BROKERAGEOS_Exit_Timeline',

  // Buyer
  buyer_liquid_capital: 'BROKERAGEOS_buyer_liquid_capital',
  buyer_financing_status: 'BROKERAGEOS_buyer_financing_status',
  buyer_experience_level: 'BROKERAGEOS_buyer_experience_level',
  buyer_type: 'BROKERAGEOS_buyer_type',
  buyer_acquisition_timeline: 'BROKERAGEOS_buyer_acquisition_timeline',
  buyer_industry_preference: 'BROKERAGEOS_buyer_industry_preference',

  // Listing
  listing_id_interest: 'BROKERAGEOS_listing_id_interest',
  listing_title_interest: 'BROKERAGEOS_listing_title_interest',
  listing_revenue_interest: 'BROKERAGEOS_listing_revenue_interest',
  listing_cashflow_interest: 'BROKERAGEOS_listing_cashflow_interest',
  listing_price_interest: 'BROKERAGEOS_listing_price_interest',
  listing_status_interest: 'BROKERAGEOS_listing_status_interest',
  listing_industry_interest: 'BROKERAGEOS_listing_industry_interest',
  listing_location_interest: 'BROKERAGEOS_listing_location_interest',
  listing_inquiry_message: 'BROKERAGEOS_listing_inquiry_message',

  // NDA
  nda_requested: 'BROKERAGEOS_nda_requested',
  nda_status: 'BROKERAGEOS_nda_status',
  nda_document_id: 'BROKERAGEOS_nda_document_id',
  nda_signed: 'BROKERAGEOS_nda_signed',
  nda_signed_timestamp: 'BROKERAGEOS_nda_signed_timestamp',
  nda_capital_certified: 'BROKERAGEOS_nda_capital_certified',
  nda_acquisition_timeline: 'BROKERAGEOS_nda_acquisition_timeline',
  nda_consent: 'BROKERAGEOS_nda_consent',

  // Internal
  internal_priority_score: 'BROKERAGEOS_internal_priority_score',
  internal_assigned_broker: 'BROKERAGEOS_internal_assigned_broker',
  internal_buyer_tier: 'BROKERAGEOS_internal_buyer_tier',
  internal_review_status: 'BROKERAGEOS_internal_review_status',

  // Careers
  careers_role_applied: 'BROKERAGEOS_careers_role_applied',
  careers_years_experience: 'BROKERAGEOS_careers_years_experience',
  careers_deal_volume: 'BROKERAGEOS_careers_deal_volume',
  careers_resume_url: 'BROKERAGEOS_careers_resume_url',
  careers_linkedin_url: 'BROKERAGEOS_careers_linkedin_url',
  careers_application_status: 'BROKERAGEOS_careers_application_status',
} as const;

/* ─── Tags ──────────────────────────────────────────────────── */

export const TAGS = {
  // Global
  SELLER: 'SELLER',
  BUYER: 'BUYER',
  LISTING_INQUIRY: 'LISTING_INQUIRY',
  GENERAL_CONTACT: 'GENERAL_CONTACT',
  CAREERS_APPLICANT: 'CAREERS_APPLICANT',
  PARTNER: 'PARTNER',
  DEMO_BOOKED: 'DEMO_BOOKED',

  // Seller
  VALUATION_SUBMITTED: 'VALUATION_SUBMITTED',
  VALUATION_BOOKING_PENDING: 'VALUATION_BOOKING_PENDING',
  SELLER_QUALIFIED: 'SELLER_QUALIFIED',
  SELLER_NURTURE: 'SELLER_NURTURE',

  // Buyer
  BUYER_QUALIFIED: 'BUYER_QUALIFIED',
  NDA_REQUESTED: 'NDA_REQUESTED',
  NDA_SIGNED: 'NDA_SIGNED',
  BUYER_TIER_1: 'BUYER_TIER_1',
  BUYER_TIER_2: 'BUYER_TIER_2',
  BUYER_TIER_3: 'BUYER_TIER_3',

  // Careers
  APPLICANT_NEW: 'applicant_new',
  APPLICANT_REVIEWED: 'applicant_reviewed',
  APPLICANT_INTERVIEW: 'applicant_interview',
  APPLICANT_REJECTED: 'applicant_rejected',
} as const;

/* ─── Advisors / Routing ────────────────────────────────────── */

export const ADVISORS = [
  { id: 'adv_01', name: 'Olivia Martin', email: 'olivia@brokerageos.com', phone: '(555) 010-0001' },
  { id: 'adv_02', name: 'Jackson Lee', email: 'jackson@brokerageos.com', phone: '(555) 010-0002' },
  { id: 'adv_03', name: 'Isabella Nguyen', email: 'isabella@brokerageos.com', phone: '(555) 010-0003' },
];

/* ─── Pipeline Config ───────────────────────────────────────── */

export const PIPELINES = {
  seller: {
    id: import.meta.env.VITE_GHL_SELLER_PIPELINE_ID ?? '',
    stages: {
      new_inquiry: '31413dee-0c54-49af-a6c0-eb3b5de52338', // New Lead
      valuation_submitted: '0bf89400-3375-483d-8e1f-339cd2d397d6', // Contact Attempted
      awaiting_call: '6613d153-5435-433f-9dcc-a9ebb5493e52', // Short Term Nurture
      call_booked: '2bc90cde-43ba-4d7f-9b54-15cbb2a5ef59', // Booked
      qualified: '41276768-5ce9-49cc-ae18-43e16d07fb6c', // Lead Responded
      advisory: '57c0cd1b-5fdd-4a8c-a839-8b8a54ba46de', // Showed - Sold
      nurture: '85ff759d-1736-43e5-afee-a5b2d4c5a83b', // Long Term Nurture
      closed_lost: 'f93c6e5f-d9de-45f8-a76f-aac1f62a787a', // Disqualified
    },
  },
  buyer: {
    id: import.meta.env.VITE_GHL_BUYER_PIPELINE_ID ?? '',
    stages: {
      new_inquiry: 'ab222df9-1fae-4050-9e3b-8bcc3a3c3271', // New Lead
      qualified: 'f5465a5b-6709-439e-b7b6-17c9a12623ee', // Hot Lead
      listing_interest: '80d50c7e-6921-436e-96fa-61bde2d78025', // Follow Up
      nda_requested: '5bf5e327-e90a-4243-aab6-44cb19e6f65c', // Long Term Nurture
      nda_signed: 'df15284b-2fbd-4bc4-8803-d1390c8f800e', // Appointment Booked
      buyer_review: 'df15284b-2fbd-4bc4-8803-d1390c8f800e', 
      active: 'f5465a5b-6709-439e-b7b6-17c9a12623ee',
      nurture: '5bf5e327-e90a-4243-aab6-44cb19e6f65c',
    },
  },
  general: {
    id: import.meta.env.VITE_GHL_GENERAL_PIPELINE_ID ?? '',
    stages: {
      new_contact: 'd28201ef-29db-43e4-9cb5-6ad9dd341772', // Website Leads
      review: '31413dee-0c54-49af-a6c0-eb3b5de52338', // New Lead
      scheduled: '2bc90cde-43ba-4d7f-9b54-15cbb2a5ef59', // Booked
      closed: '57c0cd1b-5fdd-4a8c-a839-8b8a54ba46de', // Showed - Sold
    },
  },
  careers: {
    id: import.meta.env.VITE_GHL_CAREERS_PIPELINE_ID ?? '',
    stages: {
      new_applicant: '23a7f1c7-7c33-4cbd-bdf4-29ac2f013497', // New Application
      resume_reviewed: '2ba86d7b-cd24-44c8-848f-66e8d69f7b2f', // Request For MBI
      screening: 'db6f2b54-58b9-4c9b-b263-2cfa3fb474b9', // MBI Booked
      interview: '40de29cc-711c-45a2-98de-5810e6d29092', // Scorecard
      offer: '91555583-1947-40ac-ab5c-a392f88c2170', // Onboarded
      rejected: '7514f0e4-6a95-411b-82b3-bbd4069da580', // Disqualified
      talent_pool: 'bc332c5f-f8ca-49a0-92ff-f6efa5eb9014', // Bench
    },
  },
} as const;

/* ─── Helper to build custom fields array ───────────────────── */

export function buildCustomFields(
  data: Record<string, string | number | boolean | undefined>,
): { key: string; field_value: string }[] {
  return Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([key, value]) => ({ key, field_value: String(value) }));
}
