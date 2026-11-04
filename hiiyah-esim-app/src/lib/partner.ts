// HIIYAH partner API adapter — plug a real white-label / MVNO partner in here.
// No partner is hard-coded. Fill config from secure environment, never from the repo.
export interface Plan { id: string; name: string; data: string; validity: string; priceCents: number | null; }
export interface Activation { lpa: string; smdpPlus: string; matchingId: string; confirmationCode?: string; expiresAt?: string; }
export interface PartnerApi {
  listPlans(): Promise<Plan[]>;
  createOrder(planId: string, customer: { name: string; email: string }): Promise<{ orderId: string }>;
  getActivation(orderId: string): Promise<Activation>;
  getStatus(orderId: string): Promise<'pending' | 'ready' | 'installed' | 'failed'>;
}
export class MockPartner implements PartnerApi {
  async listPlans(): Promise<Plan[]> {
    return [
      { id: 'hiiyah-us-5gb', name: 'HIIYAH USA — 5 GB', data: '5 GB', validity: '30 days', priceCents: null },
      { id: 'hiiyah-us-20gb', name: 'HIIYAH USA — 20 GB', data: '20 GB', validity: '30 days', priceCents: null },
    ];
  }
  async createOrder(planId: string): Promise<{ orderId: string }> {
    return { orderId: `demo-${planId}-${Date.now()}` };
  }
  async getActivation(): Promise<Activation> {
    throw new Error('Demo mode: no real activation code. Connect a real partner (see partner-onboarding.md) for live codes.');
  }
  async getStatus(): Promise<'pending'> { return 'pending'; }
}
export class HttpPartner implements PartnerApi {
  constructor(private baseUrl: string, private apiKey: string) {}
  private async call(path: string, body?: unknown) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: body ? 'POST' : 'GET',
      headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`Partner API ${path} failed: ${res.status}`);
    return res.json();
  }
  listPlans(): Promise<Plan[]> { return this.call('/plans'); }
  createOrder(planId: string, customer: { name: string; email: string }): Promise<{ orderId: string }> {
    return this.call('/orders', { planId, customer });
  }
  getActivation(orderId: string): Promise<Activation> { return this.call(`/orders/${orderId}/activation`); }
  getStatus(orderId: string): Promise<'pending' | 'ready' | 'installed' | 'failed'> {
    return this.call(`/orders/${orderId}/status`).then((r: any) => r.status);
  }
}
