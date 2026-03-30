/**
 * BrokerageOS Lite — Listings Data
 *
 * Configurable listing objects. Broker populates these with their active deals.
 * In production, this can be replaced with a GHL custom objects fetch or CMS.
 */

export interface Listing {
  id: string;
  title: string;
  industry: string;
  location: string;
  revenue: number;
  cashflow: number;
  askingPrice: number;
  description: string;
  highlights: string[];
  status: 'active' | 'under_loi' | 'sold' | 'coming_soon';
  yearEstablished?: number;
  employees?: string;
  imageUrl?: string;
  ndaRequired: boolean;
}

export const INDUSTRIES = [
  'Technology / SaaS',
  'Healthcare',
  'Manufacturing',
  'E-Commerce',
  'Professional Services',
  'Food & Beverage',
  'Construction',
  'Logistics',
  'Real Estate Services',
  'Other',
] as const;

export const listings: Listing[] = [
  {
    id: 'L-2024-001',
    title: 'Project ATLAS',
    industry: 'Technology / SaaS',
    location: 'Austin, TX (Remote)',
    revenue: 3_200_000,
    cashflow: 960_000,
    askingPrice: 4_200_000,
    description: 'B2B SaaS platform serving mid-market logistics companies. 92% recurring revenue with sub-2% monthly churn. Fully remote team of 12.',
    highlights: [
      '$3.2M ARR with 30% YoY growth',
      '92% recurring revenue',
      'Net revenue retention: 115%',
      'Fully remote, scalable operations',
    ],
    status: 'active',
    yearEstablished: 2019,
    employees: '12 FTE',
    ndaRequired: true,
  },
  {
    id: 'L-2024-002',
    title: 'Project BEACON',
    industry: 'Healthcare',
    location: 'Nashville, TN',
    revenue: 5_800_000,
    cashflow: 1_450_000,
    askingPrice: 7_500_000,
    description: 'Specialized medical staffing agency focused on travel nursing. Strong relationships with 200+ facilities across the Southeast.',
    highlights: [
      '$5.8M revenue with stable margins',
      '200+ facility relationships',
      'Proprietary matching platform',
      'Recession-resistant demand profile',
    ],
    status: 'active',
    yearEstablished: 2016,
    employees: '28 FTE',
    ndaRequired: true,
  },
  {
    id: 'L-2024-003',
    title: 'Project CATALYST',
    industry: 'E-Commerce',
    location: 'Miami, FL (Remote)',
    revenue: 8_400_000,
    cashflow: 2_100_000,
    askingPrice: 10_500_000,
    description: 'D2C consumer wellness brand with Shopify Plus storefront, 50K email subscribers, and Amazon FBA channel generating 35% of revenue.',
    highlights: [
      '$8.4M revenue, 25% net margins',
      '50K active email subscribers',
      'Multi-channel: DTC + Amazon + Wholesale',
      'Clean supply chain, US-based 3PL',
    ],
    status: 'active',
    yearEstablished: 2020,
    employees: '8 FTE + contractors',
    ndaRequired: true,
  },
  {
    id: 'L-2024-004',
    title: 'Project DELTA',
    industry: 'Manufacturing',
    location: 'Charlotte, NC',
    revenue: 12_000_000,
    cashflow: 3_000_000,
    askingPrice: 15_000_000,
    description: 'Precision CNC machine shop serving aerospace and defense. AS9100 certified, long-term government contracts, and proprietary tooling.',
    highlights: [
      '$12M revenue with 25% EBITDA margins',
      'AS9100 & ITAR certified',
      '70% contracted/recurring revenue',
      'Turnkey operation with trained workforce',
    ],
    status: 'under_loi',
    yearEstablished: 2008,
    employees: '45 FTE',
    ndaRequired: true,
  },
  {
    id: 'L-2024-005',
    title: 'Project ECHO',
    industry: 'Professional Services',
    location: 'Denver, CO',
    revenue: 2_100_000,
    cashflow: 750_000,
    askingPrice: 2_800_000,
    description: 'Boutique digital marketing agency specializing in paid media for franchise brands. High-retention client base with average 3+ year engagement.',
    highlights: [
      '$2.1M revenue, 36% margins',
      'Average client tenure: 3.2 years',
      '95% client retention rate',
      'Documented SOPs for all services',
    ],
    status: 'active',
    yearEstablished: 2017,
    employees: '14 FTE',
    ndaRequired: false,
  },
  {
    id: 'L-2024-006',
    title: 'Project FRONTIER',
    industry: 'Construction',
    location: 'Phoenix, AZ',
    revenue: 18_000_000,
    cashflow: 3_600_000,
    askingPrice: 16_000_000,
    description: 'Commercial roofing contractor with government and municipal contracts. Fleet of 30+ vehicles, bonded and insured, strong backlog.',
    highlights: [
      '$18M revenue, growing market',
      '$8M+ contracted backlog',
      'Fully bonded, licensed in 3 states',
      'Experienced project management team',
    ],
    status: 'coming_soon',
    yearEstablished: 2012,
    employees: '55 FTE',
    ndaRequired: true,
  },
];

/* ─── Helpers ───────────────────────────────────────────────── */

export function getListingById(id: string): Listing | undefined {
  return listings.find(l => l.id === id);
}

export function getActiveListings(): Listing[] {
  return listings.filter(l => l.status === 'active');
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
}
