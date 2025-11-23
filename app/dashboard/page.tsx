"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SubmitJobForm from '@/components/SubmitJobForm';
import JobStatusMonitor from '@/components/JobStatusMonitor';
import AttestationVerifier from '@/components/AttestationVerifier';
import MEVSavingsDashboard from '@/components/MEVSavingsDashboard';
// WalletConnect handles Polkadot connection internally
import dynamic from 'next/dynamic';

// Dynamically import WalletConnect to avoid SSR issues with Polkadot extension
const WalletConnect = dynamic(() => import('@/components/WalletConnect'), { ssr: false });

export default function Dashboard() {
  const [activeJobId, setActiveJobId] = useState<number>(0);
  const [account, setAccount] = useState<any>(null); // Lifted state for account

  // Callback when wallet connects
  const handleAccountConnect = (acc: any) => {
    setAccount(acc);
  };

  // Callback when job is submitted
  const handleJobSubmitted = (jobId: number, txHash: string) => {
    console.log('Job submitted:', jobId, txHash);
    setActiveJobId(jobId);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#E6007A]/30">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Navbar />

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            >
              Compute Dashboard
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#E0E0E0]/60 mt-2 text-lg"
            >
              Manage your confidential AI workloads and monitor MEV savings
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <WalletConnect onConnect={handleAccountConnect} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Job Submission & Status */}
          <div className="lg:col-span-7 space-y-8">
            <SubmitJobForm account={account} onJobSubmitted={handleJobSubmitted} />
            
            {activeJobId > 0 && (
              <JobStatusMonitor jobId={activeJobId} account={account} />
            )}
          </div>

          {/* Right Column: Analytics & Verification */}
          <div className="lg:col-span-5 space-y-8">
            <MEVSavingsDashboard />
            <AttestationVerifier account={account} />
          </div>
        </div>
      </div>
    </main>
  );
}
