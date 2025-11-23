"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, Clock, AlertCircle, Loader2, FileText } from 'lucide-react';
import { getJobStatus, getAttestation, JobStatus } from '../lib/job-status';
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface JobStatusMonitorProps {
  jobId: number;
  account: InjectedAccountWithMeta | null;
}

export default function JobStatusMonitor({ jobId, account }: JobStatusMonitorProps) {
  const [status, setStatus] = useState<JobStatus>('Registered');
  const [attestation, setAttestation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId || !account) return;

    let isMounted = true;
    const pollInterval = setInterval(async () => {
      try {
        const currentStatus = await getJobStatus(jobId, account.address);
        if (isMounted) {
          setStatus(currentStatus);
          
          if (currentStatus === 'Completed') {
            const proof = await getAttestation(jobId, account.address);
            setAttestation(proof);
            // Stop polling if completed and we have attestation
            if (proof) clearInterval(pollInterval);
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
        if (isMounted) setError('Failed to fetch job status');
      } finally {
        if (isMounted) setLoading(false);
      }
    }, 3000); // Poll every 3 seconds

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, [jobId, account]);

  const steps = [
    { id: 'Registered', label: 'Job Registered', icon: FileText },
    { id: 'Assigned', label: 'Assigned to Worker', icon: Activity },
    { id: 'InProgress', label: 'Processing in TEE', icon: Loader2 },
    { id: 'Completed', label: 'Completed & Verified', icon: CheckCircle },
  ];

  const getCurrentStepIndex = () => {
    const index = steps.findIndex(s => s.id === status);
    return index === -1 ? 0 : index;
  };

  const currentStepIndex = getCurrentStepIndex();

  if (!jobId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 mt-6 border border-[#E6007A]/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#E6007A]" />
          Job Status Monitor
        </h3>
        <span className="px-3 py-1 rounded-full bg-[#E6007A]/10 text-[#E6007A] text-sm font-medium border border-[#E6007A]/20">
          Job ID: #{jobId}
        </span>
      </div>

      <div className="relative flex justify-between items-center mb-8">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[#333] -z-10 rounded-full" />
        
        {/* Active Progress Bar */}
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#FF0080] to-[#E6007A] -z-10 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />

        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isCompleted ? '#E6007A' : '#1A1A1A',
                  borderColor: isCompleted ? '#E6007A' : '#333',
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-colors duration-300`}
              >
                <Icon className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-gray-500'}`} />
              </motion.div>
              <span className={`text-xs font-medium ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {attestation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-green-500/10 border border-green-500/30 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="text-green-500 font-semibold mb-1">Attestation Verified</h4>
              <p className="text-green-500/80 text-sm break-all">
                Proof: {attestation.attestation_proof?.substring(0, 32)}...
              </p>
              <p className="text-green-500/80 text-sm mt-1">
                Result Hash: {attestation.result_hash?.substring(0, 16)}...
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {status === 'Failed' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-500 font-medium">Job Execution Failed</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
