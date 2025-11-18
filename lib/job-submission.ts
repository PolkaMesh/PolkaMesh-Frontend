import { ContractPromise } from '@polkadot/api-contract';
import { getApi, getSigner, parseAmount } from './polkadot';
import { contracts } from './contracts';

// Import ABIs
import aiJobQueueAbi from '../abis/ai_job_queue.json';
import phalaJobProcessorAbi from '../abis/phala_job_processor.json';
import paymentEscrowAbi from '../abis/payment_escrow.json';

export interface JobSubmissionParams {
  modelRef: string;
  dataRef: string;
  budget: string; // In PAS tokens
  deadline: number; // Block number
  privacyRequired: boolean;
  userAddress: string;
}

export interface JobSubmissionResult {
  jobId: number;
  txHash: string;
  success: boolean;
  error?: string;
}

/**
 * Submit a job to the AI Job Queue
 */
export async function submitJob(params: JobSubmissionParams): Promise<JobSubmissionResult> {
  try {
    const api = getApi();
    const signer = await getSigner(params.userAddress);

    // Create contract instance
    const contract = new ContractPromise(api, aiJobQueueAbi, contracts.aiJobQueue.address);

    // Get current block number for deadline calculation
    const currentBlock = await api.rpc.chain.getHeader();
    const deadline = currentBlock.number.toNumber() + params.deadline;

    console.log('Submitting job to AIJobQueue contract...');
    console.log('Params:', {
      modelRef: params.modelRef,
      dataRef: params.dataRef,
      deadline,
      privacyRequired: params.privacyRequired,
    });

    // Call submitJob
    const tx = contract.tx.submitJob(
      { gasLimit: -1 },
      params.modelRef,
      params.dataRef,
      deadline,
      params.privacyRequired
    );

    // Sign and send
    return new Promise((resolve, reject) => {
      tx.signAndSend(params.userAddress, { signer }, ({ status, events, txHash }) => {
        console.log('Transaction status:', status.type);

        if (status.isInBlock) {
          console.log('Transaction included in block:', status.asInBlock.toHex());

          // Extract jobId from events
          let jobId = 0;
          events.forEach(({ event }) => {
            if (api.events.contracts.ContractEmitted.is(event)) {
              const [contractAddress, data] = event.data;
              if (contractAddress.toString() === contracts.aiJobQueue.address) {
                const decoded = contract.abi.decodeEvent(data);
                if (decoded.event.identifier === 'JobSubmitted') {
                  jobId = Number(decoded.args[0].toString());
                  console.log('Job submitted with ID:', jobId);
                }
              }
            }
          });

          resolve({
            jobId,
            txHash: txHash.toHex(),
            success: true,
          });
        } else if (status.isFinalized) {
          console.log('Transaction finalized');
        }
      }).catch((error) => {
        console.error('Transaction failed:', error);
        reject({
          jobId: 0,
          txHash: '',
          success: false,
          error: error.message,
        });
      });
    });
  } catch (error: any) {
    console.error('Job submission failed:', error);
    return {
      jobId: 0,
      txHash: '',
      success: false,
      error: error.message || 'Failed to submit job',
    };
  }
}

/**
 * Submit confidential job to Phala Job Processor
 */
export async function submitConfidentialJob(
  jobId: number,
  encryptedPayload: string,
  publicKey: string,
  userAddress: string
): Promise<{ success: boolean; txHash?: string; error?: string }> {
  try {
    const api = getApi();
    const signer = await getSigner(userAddress);

    // Create contract instance
    const contract = new ContractPromise(api, phalaJobProcessorAbi, contracts.phalaJobProcessor.address);

    console.log('Submitting confidential job to PhalaJobProcessor...');

    const tx = contract.tx.submitConfidentialJob(
      { gasLimit: -1 },
      encryptedPayload,
      publicKey
    );

    return new Promise((resolve, reject) => {
      tx.signAndSend(userAddress, { signer }, ({ status, txHash }) => {
        if (status.isInBlock) {
          console.log('Confidential job submitted:', txHash.toHex());
          resolve({
            success: true,
            txHash: txHash.toHex(),
          });
        }
      }).catch((error) => {
        reject({
          success: false,
          error: error.message,
        });
      });
    });
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to submit confidential job',
    };
  }
}

/**
 * Deposit payment for a job
 */
export async function depositPayment(
  jobId: number,
  amount: string,
  providerAddress: string,
  userAddress: string
): Promise<{ success: boolean; txHash?: string; error?: string }> {
  try {
    const api = getApi();
    const signer = await getSigner(userAddress);

    // Create contract instance
    const contract = new ContractPromise(api, paymentEscrowAbi, contracts.paymentEscrow.address);

    // Convert amount to blockchain units
    const amountInUnits = parseAmount(amount);

    console.log('Depositing payment to escrow...');
    console.log('Amount:', amountInUnits, 'units');

    const tx = contract.tx.depositForJob(
      { gasLimit: -1, value: amountInUnits },
      jobId,
      providerAddress
    );

    return new Promise((resolve, reject) => {
      tx.signAndSend(userAddress, { signer }, ({ status, txHash }) => {
        if (status.isInBlock) {
          console.log('Payment deposited:', txHash.toHex());
          resolve({
            success: true,
            txHash: txHash.toHex(),
          });
        }
      }).catch((error) => {
        reject({
          success: false,
          error: error.message,
        });
      });
    });
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to deposit payment',
    };
  }
}

/**
 * Get job details from AIJobQueue contract
 */
export async function getJobDetails(jobId: number, callerAddress: string): Promise<any> {
  try {
    const api = getApi();
    const contract = new ContractPromise(api, aiJobQueueAbi, contracts.aiJobQueue.address);

    const { result, output } = await contract.query.getJob(
      callerAddress,
      { gasLimit: -1 },
      jobId
    );

    if (result.isOk && output) {
      return output.toJSON();
    } else {
      throw new Error('Failed to get job details');
    }
  } catch (error: any) {
    console.error('Failed to get job details:', error);
    return null;
  }
}

/**
 * Get attestation for a job
 */
export async function getAttestation(jobId: number, callerAddress: string): Promise<any> {
  try {
    const api = getApi();
    const contract = new ContractPromise(api, phalaJobProcessorAbi, contracts.phalaJobProcessor.address);

    const { result, output } = await contract.query.getAttestation(
      callerAddress,
      { gasLimit: -1 },
      jobId
    );

    if (result.isOk && output) {
      return output.toJSON();
    } else {
      return null;
    }
  } catch (error: any) {
    console.error('Failed to get attestation:', error);
    return null;
  }
}

/**
 * Complete job submission flow
 */
export async function submitJobComplete(
  params: JobSubmissionParams
): Promise<JobSubmissionResult> {
  try {
    console.log('🚀 Starting complete job submission flow...');

    // Step 1: Submit job to AIJobQueue
    console.log('Step 1: Submitting to AIJobQueue...');
    const jobResult = await submitJob(params);

    if (!jobResult.success || jobResult.jobId === 0) {
      throw new Error(jobResult.error || 'Job submission failed');
    }

    console.log(`✅ Job submitted with ID: ${jobResult.jobId}`);

    // Step 2: Submit confidential job to PhalaJobProcessor (if privacy required)
    if (params.privacyRequired) {
      console.log('Step 2: Submitting confidential job to PhalaJobProcessor...');

      // Create encrypted payload (simplified for demo)
      const payload = JSON.stringify({
        jobId: jobResult.jobId,
        model: params.modelRef,
        data: params.dataRef,
      });
      const encryptedPayload = Buffer.from(payload).toString('base64');
      const publicKey = params.userAddress; // Simplified

      const phalaResult = await submitConfidentialJob(
        jobResult.jobId,
        encryptedPayload,
        publicKey,
        params.userAddress
      );

      if (!phalaResult.success) {
        console.warn('⚠️ Confidential job submission failed:', phalaResult.error);
        // Don't fail completely, job is still submitted
      } else {
        console.log('✅ Confidential job submitted');
      }
    }

    // Step 3: Deposit payment
    console.log('Step 3: Depositing payment to escrow...');
    const providerAddress = params.userAddress; // Simplified - use same address for demo

    const paymentResult = await depositPayment(
      jobResult.jobId,
      params.budget,
      providerAddress,
      params.userAddress
    );

    if (!paymentResult.success) {
      console.warn('⚠️ Payment deposit failed:', paymentResult.error);
      // Job is submitted but payment failed
    } else {
      console.log('✅ Payment deposited');
    }

    console.log('🎉 Job submission complete!');
    return jobResult;

  } catch (error: any) {
    console.error('❌ Complete job submission failed:', error);
    return {
      jobId: 0,
      txHash: '',
      success: false,
      error: error.message || 'Job submission flow failed',
    };
  }
}
