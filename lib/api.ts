/**
 * PolkaMesh API Client
 * Connects frontend to backend with real blockchain integration
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export const api = {
  /**
   * System Status
   */
  async getStatus() {
    const res = await fetch(`${API_BASE}/status`);
    return res.json();
  },

  async getContracts() {
    const res = await fetch(`${API_BASE}/contracts`);
    return res.json();
  },

  async getPhalaStatus() {
    const res = await fetch(`${API_BASE}/phala/status`);
    return res.json();
  },

  /**
   * Job Management
   */
  async submitJob(data: {
    description: string;
    budget: string;
    dataSetId?: string;
    computeType?: string;
    accountAddress: string;
  }) {
    const res = await fetch(`${API_BASE}/jobs/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async submitConfidentialJob(data: {
    payload: any;
    accountAddress: string;
  }) {
    const res = await fetch(`${API_BASE}/jobs/submit-confidential`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getJob(jobId: number) {
    const res = await fetch(`${API_BASE}/jobs/${jobId}`);
    return res.json();
  },

  async listJobs(owner?: string) {
    const url = owner ? `${API_BASE}/jobs?owner=${owner}` : `${API_BASE}/jobs`;
    const res = await fetch(url);
    return res.json();
  },

  async getAttestation(jobId: number) {
    const res = await fetch(`${API_BASE}/jobs/${jobId}/attestation`);
    return res.json();
  },

  /**
   * MEV Protection
   */
  async submitMEVIntent(data: {
    tokenIn: string;
    tokenOut: string;
    amountIn: string;
    minAmountOut: string;
    accountAddress: string;
  }) {
    const res = await fetch(`${API_BASE}/mev/submit-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getMEVSavings() {
    const res = await fetch(`${API_BASE}/mev/savings`);
    return res.json();
  },

  /**
   * Providers & Data
   */
  async listProviders() {
    const res = await fetch(`${API_BASE}/providers`);
    return res.json();
  },

  async listDataNFTs() {
    const res = await fetch(`${API_BASE}/data-nfts`);
    return res.json();
  },
};

export default api;
