"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, X, Search } from 'lucide-react';
import { getAttestation } from '../lib/job-status';
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface AttestationVerifierProps {
  account: InjectedAccountWithMeta | null;
}

export default function AttestationVerifier({ account }: AttestationVerifierProps) {
  const [jobId, setJobId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [proofData, setProofData] = useState<any>(null);

  const handleVerify = async () => {
    if (!jobId || !account) return;

    setVerificationStatus('loading');
    setProofData(null);

    try {
      const attestation = await getAttestation(parseInt(jobId), account.address);
      
      if (attestation) {
        setProofData(attestation);
        setVerificationStatus('valid');
      } else {
        setVerificationStatus('invalid');
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationStatus('invalid');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-[#E6007A]/10 rounded-xl flex items-center justify-center border border-[#E6007A]/20">
          <Shield className="w-6 h-6 text-[#E6007A]" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white">Attestation Verifier</h2>
          <p className="text-[#E0E0E0]/60">Verify Phala TEE execution proofs</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E0E0E0]/40" />
          <input
            type="number"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder="Enter Job ID to verify"
            className="w-full pl-12 pr-4 py-3 bg-[#0A0A0F]/50 border border-[#E6007A]/20 rounded-xl text-white placeholder-[#E0E0E0]/40 focus:border-[#E6007A] focus:outline-none transition-all"
          />
        </div>
        <button
          onClick={handleVerify}
          disabled={!jobId || !account || verificationStatus === 'loading'}
          className="px-6 py-3 bg-[#E6007A] text-white font-medium rounded-xl hover:bg-[#E6007A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {verificationStatus === 'loading' ? 'Verifying...' : 'Verify Proof'}
        </button>
      </div>

      {verificationStatus === 'valid' && proofData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-500/10 border border-green-500/30 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-green-500">Valid TEE Proof</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-green-500/20">
              <span className="text-green-500/70">Worker Public Key</span>
              <span className="text-green-500 font-mono">{proofData.tee_worker_pubkey?.substring(0, 20)}...</span>
            </div>
            <div className="flex justify-between py-2 border-b border-green-500/20">
              <span className="text-green-500/70">Result Hash</span>
              <span className="text-green-500 font-mono">{proofData.result_hash?.substring(0, 20)}...</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-green-500/70">Timestamp</span>
              <span className="text-green-500 font-mono">{new Date(proofData.timestamp * 1000).toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      )}

      {verificationStatus === 'invalid' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <X className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-500">Verification Failed</h3>
            <p className="text-red-500/70 text-sm">
              No valid attestation found for this Job ID. The job may be pending or failed.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
