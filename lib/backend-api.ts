import { BACKEND_API } from './contracts';

/**
 * Backend API client for PolkaMesh backend service
 */

export interface HealthStatus {
  status: string;
  uptime: number;
  timestamp: string;
  memory: any;
}

export interface ServiceInfo {
  service: string;
  version: string;
  status: string;
  timestamp: string;
}

/**
 * Check backend health
 */
export async function checkHealth(): Promise<HealthStatus> {
  const response = await fetch(`${BACKEND_API}/health`);
  if (!response.ok) {
    throw new Error('Backend health check failed');
  }
  return response.json();
}

/**
 * Get backend service info
 */
export async function getServiceInfo(): Promise<ServiceInfo> {
  const response = await fetch(`${BACKEND_API}/`);
  if (!response.ok) {
    throw new Error('Failed to get service info');
  }
  return response.json();
}

/**
 * Check if backend is running
 */
export async function isBackendRunning(): Promise<boolean> {
  try {
    await checkHealth();
    return true;
  } catch {
    return false;
  }
}
