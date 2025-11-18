"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Key, FileCheck, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

interface AttestationData {
  jobId: string;
  resultHash: string;
  attestationProof: string;
  teeWorkerPubkey: string;
  timestamp: number;
  verified: boolean;
  jobDescription: string;
}

const mockAttestation: AttestationData = {
  jobId: "2",
  resultHash: "0x7a3c92ef4d5b8a71c2e9f0d6b8a3c5e7f9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
  attestationProof: "0xab12cd34ef56gh78ij90kl12mn34op56qr78st90uv12wx34yz56ab78cd90ef12gh34ij56kl78mn90",
  teeWorkerPubkey: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  timestamp: Date.now() - 1800000,
  verified: true,
  jobDescription: "LLM inference - GPT-2 text generation",
};

export default function AttestationVerifier() {
  const [attestation] = useState<AttestationData>(mockAttestation);
  const [showFullProof, setShowFullProof] = useState(false);

  const shortenHash = (hash: string, start = 8, end = 8) => {
    return `${hash.slice(0, start)}...${hash.slice(-end)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-[#FF0080] to-[#E6007A] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(230,0,122,0.4)]">
          <ShieldCheck className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-white">TEE Attestation Verifier</h2>
          <p className="text-[#E0E0E0] mt-1">Cryptographic proof of confidential execution</p>
        </div>
      </div>

      {/* Verification Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`rounded-xl p-6 mb-6 ${
          attestation.verified
            ? "bg-green-500/10 border border-green-500/30"
            : "bg-red-500/10 border border-red-500/30"
        }`}
      >
        <div className="flex items-center gap-4">
          {attestation.verified ? (
            <CheckCircle className="w-12 h-12 text-green-500" />
          ) : (
            <AlertCircle className="w-12 h-12 text-red-500" />
          )}
          <div>
            <h3 className={`text-2xl font-semibold mb-1 ${
              attestation.verified ? "text-green-500" : "text-red-500"
            }`}>
              {attestation.verified ? "Attestation Verified ✓" : "Verification Failed"}
            </h3>
            <p className="text-[#E0E0E0]">
              {attestation.verified
                ? "Job was executed in a trusted Phala TEE environment"
                : "Unable to verify attestation proof"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Job Information */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-[#E6007A]" />
          Job Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0A0A0F]/50 rounded-xl p-5 border border-[#E6007A]/10">
            <p className="text-sm text-[#E0E0E0]/60 mb-2">Job ID</p>
            <p className="text-white font-mono text-lg">#{attestation.jobId}</p>
          </div>

          <div className="bg-[#0A0A0F]/50 rounded-xl p-5 border border-[#E6007A]/10">
            <p className="text-sm text-[#E0E0E0]/60 mb-2">Timestamp</p>
            <p className="text-white text-lg">
              {new Date(attestation.timestamp).toLocaleString()}
            </p>
          </div>

          <div className="bg-[#0A0A0F]/50 rounded-xl p-5 border border-[#E6007A]/10 md:col-span-2">
            <p className="text-sm text-[#E0E0E0]/60 mb-2">Description</p>
            <p className="text-white text-lg">{attestation.jobDescription}</p>
          </div>
        </div>
      </div>

      {/* Cryptographic Proofs */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#E6007A]" />
          Cryptographic Proofs
        </h3>

        {/* Result Hash */}
        <div className="bg-[#0A0A0F]/50 rounded-xl p-5 border border-[#E6007A]/10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#E6007A]" />
              <h4 className="text-white font-semibold">Result Hash</h4>
            </div>
            <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/30 rounded-lg text-xs font-medium">
              SHA-256
            </span>
          </div>
          <div className="bg-[#13131A]/50 rounded-lg p-4 border border-[#E6007A]/5">
            <p className="text-[#E0E0E0] font-mono text-sm break-all">
              {attestation.resultHash}
            </p>
          </div>
        </div>

        {/* TEE Worker Public Key */}
        <div className="bg-[#0A0A0F]/50 rounded-xl p-5 border border-[#E6007A]/10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-[#E6007A]" />
              <h4 className="text-white font-semibold">TEE Worker Public Key</h4>
            </div>
            <span className="px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/30 rounded-lg text-xs font-medium">
              secp256r1
            </span>
          </div>
          <div className="bg-[#13131A]/50 rounded-lg p-4 border border-[#E6007A]/5">
            <p className="text-[#E0E0E0] font-mono text-sm break-all">
              {attestation.teeWorkerPubkey}
            </p>
          </div>
        </div>

        {/* Attestation Proof */}
        <div className="bg-[#0A0A0F]/50 rounded-xl p-5 border border-[#E6007A]/10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#E6007A]" />
              <h4 className="text-white font-semibold">Attestation Signature</h4>
            </div>
            <span className="px-3 py-1 bg-[#E6007A]/10 text-[#E6007A] border border-[#E6007A]/30 rounded-lg text-xs font-medium">
              ECDSA
            </span>
          </div>
          <div className="bg-[#13131A]/50 rounded-lg p-4 border border-[#E6007A]/5">
            <p className="text-[#E0E0E0] font-mono text-sm break-all">
              {showFullProof
                ? attestation.attestationProof
                : shortenHash(attestation.attestationProof, 32, 32)}
            </p>
          </div>
          <button
            onClick={() => setShowFullProof(!showFullProof)}
            className="mt-3 text-sm text-[#E6007A] hover:text-[#FF0080] transition-colors duration-300"
          >
            {showFullProof ? "Show less" : "Show full proof"}
          </button>
        </div>
      </div>

      {/* Verification Details */}
      <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          What This Proves
        </h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-[#E0E0E0] text-sm">
              <span className="font-semibold text-white">Confidential Execution:</span> Job was processed inside a hardware-secured Trusted Execution Environment (TEE)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-[#E0E0E0] text-sm">
              <span className="font-semibold text-white">Data Integrity:</span> Results have not been tampered with since computation
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-[#E0E0E0] text-sm">
              <span className="font-semibold text-white">Worker Authenticity:</span> Computation was performed by a verified Phala Network worker
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-[#E0E0E0] text-sm">
              <span className="font-semibold text-white">Privacy Preserved:</span> Your sensitive data never left the encrypted enclave
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF0080] to-[#E6007A] text-white rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(230,0,122,0.3)] hover:shadow-[0_0_25px_rgba(230,0,122,0.5)]">
          <ExternalLink className="w-4 h-4" />
          <span>View on Explorer</span>
        </button>

        <button className="flex items-center gap-2 px-6 py-3 border-2 border-[#E6007A] text-[#E6007A] rounded-xl transition-all duration-300 hover:bg-[#E6007A]/10 hover:scale-[1.02]">
          <FileCheck className="w-4 h-4" />
          <span>Download Proof</span>
        </button>
      </div>
    </motion.div>
  );
}
