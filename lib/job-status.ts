import api from './api';

export type JobStatus = 'Registered' | 'Assigned' | 'InProgress' | 'Completed' | 'Failed' | 'Unknown';

export interface JobDetails {
  id: number;
  owner: string;
  modelRef: string;
  dataRef: string;
  status: JobStatus;
  resultHash?: string;
  attestation?: any;
}

/**
 * Query the status of a job from backend API
 */
export async function getJobStatus(jobId: number, callerAddress: string): Promise<JobStatus> {
  try {
    const result = await api.getJob(jobId);

    if (result && result.data) {
      const status = result.data.status;

      // Map backend status to JobStatus
      if (typeof status === 'string') {
        return status as JobStatus;
      }

      // Handle various status formats
      if (status?.Registered) return 'Registered';
      if (status?.Assigned) return 'Assigned';
      if (status?.InProgress) return 'InProgress';
      if (status?.Completed) return 'Completed';
      if (status?.Failed) return 'Failed';
    }

    return 'Unknown';
  } catch (error) {
    console.error('Failed to get job status:', error);
    return 'Unknown';
  }
}

/**
 * Get full job details from backend API
 */
export async function getJobDetails(jobId: number, callerAddress: string): Promise<JobDetails | null> {
  try {
    const result = await api.getJob(jobId);

    if (result && result.data) {
      return {
        id: jobId,
        owner: result.data.owner || callerAddress,
        modelRef: result.data.modelRef || result.data.description || '',
        dataRef: result.data.dataRef || result.data.dataSetId || '',
        status: await getJobStatus(jobId, callerAddress),
        resultHash: result.data.resultHash,
        attestation: result.data.attestation,
      };
    }

    return null;
  } catch (error) {
    console.error('Failed to get job details:', error);
    return null;
  }
}

/**
 * Get attestation for a job from backend API
 */
export async function getAttestation(jobId: number, callerAddress: string): Promise<any> {
  try {
    const result = await api.getAttestation(jobId);

    if (result && result.data) {
      return result.data;
    }

    return null;
  } catch (error) {
    console.error('Failed to get attestation:', error);
    return null;
  }
}
