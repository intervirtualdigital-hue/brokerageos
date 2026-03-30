import { ADVISORS, FIELDS } from '@/config/ghl-config';

interface RouteLeadParams {
  industry?: string;
  capitalRange?: string;
  source?: string;
  overrideAdvisorId?: string;
}

export function assignAdvisor(params: RouteLeadParams): typeof ADVISORS[0] {
  // Manual override
  if (params.overrideAdvisorId) {
    const manual = ADVISORS.find(a => a.id === params.overrideAdvisorId);
    if (manual) return manual;
  }

  // Logic-based routing
  if (params.capitalRange === '5m_plus' || params.industry === 'Technology / SaaS') {
    // High-value / Tech leads go to top performer Olivia
    return ADVISORS[0]; // Olivia Martin
  }

  if (params.industry === 'Healthcare' || params.industry === 'Manufacturing') {
    return ADVISORS[1]; // Jackson Lee
  }

  // Fallback (Round robin stub or default queue)
  return ADVISORS[2]; // Isabella Nguyen
}

export function buildRoutingCustomFields(advisorId: string) {
  return [
    { key: FIELDS.internal_assigned_broker, field_value: advisorId }
  ];
}
