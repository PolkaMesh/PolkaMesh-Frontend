"use client";

import { motion } from "framer-motion";
import { Send, Cpu, DollarSign, Clock, Shield, Zap, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { submitJobComplete, JobSubmissionParams } from "../lib/job-submission";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface JobFormData {
  description: string;
  budget: string;
  computeType: "CPU" | "GPU" | "TPU";
  estimatedRuntime: string;
  isConfidential: boolean;
}

interface SubmitJobFormProps {
  account: InjectedAccountWithMeta | null;
  onJobSubmitted?: (jobId: number, txHash: string) => void;
}

export default function SubmitJobForm({ account, onJobSubmitted }: SubmitJobFormProps) {
  const [formData, setFormData] = useState<JobFormData>({
    description: "",
    budget: "",
    computeType: "GPU",
    estimatedRuntime: "",
    isConfidential: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    jobId?: number;
    txHash?: string;
  }>({ type: null, message: '' });

  // Demo submission for hackathon testing
  const handleDemoSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockJobId = Math.floor(Math.random() * 10000) + 1;
    const mockTxHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');

    setSubmitStatus({
      type: 'success',
      message: `[DEMO] Job submitted successfully! Job ID: ${mockJobId}`,
      jobId: mockJobId,
      txHash: mockTxHash,
    });

    onJobSubmitted?.(mockJobId, mockTxHash);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        description: "",
        budget: "",
        computeType: "GPU",
        estimatedRuntime: "",
        isConfidential: false,
      });
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!account) {
      setSubmitStatus({
        type: 'error',
        message: 'Please connect your wallet first',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Prepare job submission parameters
      const params: JobSubmissionParams = {
        modelRef: `model:${formData.computeType.toLowerCase()}:${formData.description.substring(0, 50)}`,
        dataRef: `data:${Date.now()}:${formData.description.substring(0, 30)}`,
        budget: formData.budget,
        deadline: parseInt(formData.estimatedRuntime),
        privacyRequired: formData.isConfidential,
        userAddress: account.address,
      };

      console.log('Submitting job with params:', params);

      // Submit job to contracts
      const result = await submitJobComplete(params);

      if (result.success && result.jobId > 0) {
        setSubmitStatus({
          type: 'success',
          message: `Job submitted successfully! Job ID: ${result.jobId}`,
          jobId: result.jobId,
          txHash: result.txHash,
        });

        // Notify parent component
        onJobSubmitted?.(result.jobId, result.txHash);

        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            description: "",
            budget: "",
            computeType: "GPU",
            estimatedRuntime: "",
            isConfidential: false,
          });
          setSubmitStatus({ type: null, message: '' });
        }, 3000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Job submission failed. Please try again.',
        });
      }
    } catch (error: any) {
      console.error('Job submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An unexpected error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // In demo mode, wallet connection is not required
  const isFormValid = formData.description && formData.budget && formData.estimatedRuntime && (account || demoMode);

  // Helper to show which fields are missing
  const getMissingFields = () => {
    const missing: string[] = [];
    if (!account && !demoMode) missing.push('Connect wallet (or enable Demo Mode)');
    if (!formData.description) missing.push('Job description');
    if (!formData.budget) missing.push('Budget');
    if (!formData.estimatedRuntime) missing.push('Estimated runtime');
    return missing;
  };

  // Handle form submission - use demo or real based on mode
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (demoMode) {
      await handleDemoSubmit();
    } else {
      await handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl p-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-[#FF0080] to-[#E6007A] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(230,0,122,0.4)]">
          <Send className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-white">Submit AI Job</h2>
          <p className="text-[#E0E0E0] mt-1">Deploy your computation to the mesh network</p>
        </div>
      </div>

      {/* Status Messages */}
      {submitStatus.type && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${
            submitStatus.type === 'success'
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
          }`}
        >
          {submitStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className={`${submitStatus.type === 'success' ? 'text-green-500' : 'text-red-500'} text-sm`}>
              {submitStatus.message}
            </p>
            {submitStatus.txHash && (
              <a
                href={`https://polkadot.js.org/apps/?rpc=${encodeURIComponent('wss://rpc1.paseo.popnetwork.xyz')}#/explorer/query/${submitStatus.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E6007A] text-xs hover:underline flex items-center gap-1 mt-1"
              >
                View transaction <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </motion.div>
      )}

      {/* Demo Mode Toggle */}
      <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-purple-500 mt-0.5" />
            <div>
              <h4 className="text-purple-500 font-medium">Demo Mode</h4>
              <p className="text-purple-500/70 text-sm">
                Test the flow without real transactions or wallet
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDemoMode(!demoMode)}
            className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
              demoMode
                ? "bg-gradient-to-r from-purple-500 to-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                : "bg-[#E0E0E0]/20"
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-lg ${
                demoMode ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Warning if wallet not connected and not in demo mode */}
      {!account && !demoMode && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-yellow-500 text-sm">
            Please connect your wallet or enable Demo Mode to submit a job
          </p>
        </div>
      )}

      <form onSubmit={onFormSubmit} className="space-y-6">
        {/* Job Description */}
        <div>
          <label className="block text-white font-medium mb-3">
            Job Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your AI computation task (e.g., Image classification, LLM inference, Model training...)"
            rows={4}
            className="w-full px-5 py-4 bg-[#0A0A0F]/50 border border-[#E6007A]/20 rounded-xl text-white placeholder-[#E0E0E0]/40 focus:border-[#E6007A] focus:outline-none focus:ring-2 focus:ring-[#E6007A]/30 transition-all duration-300 resize-none"
            disabled={isSubmitting}
          />
        </div>

        {/* Compute Type */}
        <div>
          <label className="block text-white font-medium mb-3">
            Compute Type
          </label>
          <div className="grid grid-cols-3 gap-4">
            {(["CPU", "GPU", "TPU"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, computeType: type })}
                disabled={isSubmitting}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  formData.computeType === type
                    ? "border-[#E6007A] bg-[#E6007A]/10 shadow-[0_0_15px_rgba(230,0,122,0.3)]"
                    : "border-[#E6007A]/20 bg-[#0A0A0F]/30 hover:border-[#E6007A]/40"
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Cpu className={`w-6 h-6 mx-auto mb-2 ${
                  formData.computeType === type ? "text-[#E6007A]" : "text-[#E0E0E0]"
                }`} />
                <p className={`text-sm font-medium ${
                  formData.computeType === type ? "text-white" : "text-[#E0E0E0]"
                }`}>
                  {type}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Budget and Runtime */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget */}
          <div>
            <label className="block text-white font-medium mb-3">
              Budget (PAS)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E6007A]" />
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="100"
                step="0.01"
                min="0"
                disabled={isSubmitting}
                className="w-full pl-12 pr-5 py-4 bg-[#0A0A0F]/50 border border-[#E6007A]/20 rounded-xl text-white placeholder-[#E0E0E0]/40 focus:border-[#E6007A] focus:outline-none focus:ring-2 focus:ring-[#E6007A]/30 transition-all duration-300 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Estimated Runtime */}
          <div>
            <label className="block text-white font-medium mb-3">
              Estimated Runtime (seconds)
            </label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E6007A]" />
              <input
                type="number"
                value={formData.estimatedRuntime}
                onChange={(e) => setFormData({ ...formData, estimatedRuntime: e.target.value })}
                placeholder="60"
                min="1"
                disabled={isSubmitting}
                className="w-full pl-12 pr-5 py-4 bg-[#0A0A0F]/50 border border-[#E6007A]/20 rounded-xl text-white placeholder-[#E0E0E0]/40 focus:border-[#E6007A] focus:outline-none focus:ring-2 focus:ring-[#E6007A]/30 transition-all duration-300 disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Confidential Compute Toggle */}
        <div className="bg-[#0A0A0F]/30 rounded-xl p-6 border border-[#E6007A]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-[#E6007A] mt-1" />
              <div>
                <h4 className="text-white font-semibold text-lg mb-1">
                  Confidential Execution
                </h4>
                <p className="text-[#E0E0E0] text-sm">
                  Execute job in Phala TEE with encrypted data and attestation proof
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isConfidential: !formData.isConfidential })}
              disabled={isSubmitting}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                formData.isConfidential
                  ? "bg-gradient-to-r from-[#FF0080] to-[#E6007A] shadow-[0_0_15px_rgba(230,0,122,0.4)]"
                  : "bg-[#E0E0E0]/20"
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-lg ${
                  formData.isConfidential ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Estimated Cost Breakdown */}
        {formData.budget && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-[#0A0A0F]/30 rounded-xl p-6 border border-[#E6007A]/10"
          >
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#E6007A]" />
              Cost Breakdown
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#E0E0E0]">Compute Cost</span>
                <span className="text-white font-medium">{formData.budget} PAS</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#E0E0E0]">Network Fee</span>
                <span className="text-white font-medium">~0.01 PAS</span>
              </div>
              {formData.isConfidential && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#E0E0E0]">TEE Premium</span>
                  <span className="text-white font-medium">+10%</span>
                </div>
              )}
              <div className="h-px bg-[#E6007A]/20 my-2"></div>
              <div className="flex justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-[#E6007A] font-bold text-lg">
                  {(parseFloat(formData.budget || '0') * (formData.isConfidential ? 1.1 : 1) + 0.01).toFixed(2)} PAS
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full flex items-center justify-center gap-3 px-8 py-4 text-white text-lg font-medium rounded-xl transition-all duration-300 ${
            isFormValid && !isSubmitting
              ? demoMode
                ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:scale-[1.02] shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                : "bg-gradient-to-r from-[#FF0080] to-[#E6007A] hover:scale-[1.02] shadow-[0_0_15px_rgba(230,0,122,0.3)] hover:shadow-[0_0_25px_rgba(230,0,122,0.5)]"
              : "bg-[#E0E0E0]/20 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{demoMode ? 'Simulating...' : 'Submitting to Blockchain...'}</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>{demoMode ? 'Test Submit (Demo)' : 'Submit Job to Mesh'}</span>
            </>
          )}
        </button>

        {/* Show missing fields hint */}
        {!isFormValid && getMissingFields().length > 0 && (
          <div className="text-center text-[#E0E0E0]/60 text-sm">
            <span className="text-yellow-500">Missing: </span>
            {getMissingFields().join(', ')}
          </div>
        )}

        <p className="text-[#E0E0E0]/60 text-xs text-center">
          By submitting, you agree to deposit funds in escrow. Payment will be released after job completion and attestation verification.
        </p>
      </form>
    </motion.div>
  );
}
