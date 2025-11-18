"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, AlertTriangle, CheckCircle2, DollarSign, Zap } from "lucide-react";
import { useState } from "react";

interface BatchData {
  id: string;
  intentCount: number;
  totalVolume: string;
  savingsAmount: string;
  attacksPrevented: number;
  timestamp: number;
  status: "pending" | "executed" | "settled";
}

const mockBatches: BatchData[] = [
  {
    id: "1",
    intentCount: 15,
    totalVolume: "12,450",
    savingsAmount: "847.50",
    attacksPrevented: 3,
    timestamp: Date.now() - 7200000,
    status: "settled",
  },
  {
    id: "2",
    intentCount: 8,
    totalVolume: "6,200",
    savingsAmount: "325.00",
    attacksPrevented: 1,
    timestamp: Date.now() - 3600000,
    status: "executed",
  },
  {
    id: "3",
    intentCount: 5,
    totalVolume: "3,800",
    savingsAmount: "0",
    attacksPrevented: 0,
    timestamp: Date.now() - 900000,
    status: "pending",
  },
];

export default function MEVSavingsDashboard() {
  const [batches] = useState<BatchData[]>(mockBatches);

  const totalSavings = batches.reduce((sum, batch) => sum + parseFloat(batch.savingsAmount), 0);
  const totalAttacksPrevented = batches.reduce((sum, batch) => sum + batch.attacksPrevented, 0);
  const totalIntents = batches.reduce((sum, batch) => sum + batch.intentCount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 rounded-lg text-xs font-medium">
            Pending
          </span>
        );
      case "executed":
        return (
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/30 rounded-lg text-xs font-medium">
            Executed
          </span>
        );
      case "settled":
        return (
          <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/30 rounded-lg text-xs font-medium">
            Settled
          </span>
        );
    }
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-[#FF0080] to-[#E6007A] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(230,0,122,0.4)]">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-white">MEV Protection Dashboard</h2>
            <p className="text-[#E0E0E0] mt-1">Track your savings from sandwich attack prevention</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Savings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-[#E0E0E0] font-medium">Total Savings</h3>
            </div>
            <p className="text-4xl font-bold text-green-500 mb-1">
              {totalSavings.toFixed(2)} PAS
            </p>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>Saved from MEV</span>
            </div>
          </motion.div>

          {/* Attacks Prevented */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-[#E6007A]/10 to-[#FF0080]/10 border border-[#E6007A]/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#E6007A]/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#E6007A]" />
              </div>
              <h3 className="text-[#E0E0E0] font-medium">Attacks Blocked</h3>
            </div>
            <p className="text-4xl font-bold text-[#E6007A] mb-1">
              {totalAttacksPrevented}
            </p>
            <div className="flex items-center gap-2 text-sm text-[#E6007A]">
              <AlertTriangle className="w-4 h-4" />
              <span>Sandwich attempts</span>
            </div>
          </motion.div>

          {/* Total Intents */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-[#E0E0E0] font-medium">Protected Intents</h3>
            </div>
            <p className="text-4xl font-bold text-blue-500 mb-1">
              {totalIntents}
            </p>
            <div className="flex items-center gap-2 text-sm text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Safely batched</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Batches */}
      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-white mb-6">Recent Batches</h3>

        <div className="space-y-4">
          {batches.map((batch, index) => (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#0A0A0F]/50 rounded-xl border border-[#E6007A]/10 p-6 hover:border-[#E6007A]/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-semibold text-lg">Batch #{batch.id}</h4>
                    {getStatusBadge(batch.status)}
                  </div>
                  <p className="text-sm text-[#E0E0E0]">{formatTime(batch.timestamp)}</p>
                </div>

                {batch.savingsAmount !== "0" && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2">
                    <p className="text-xs text-green-400 mb-1">Savings</p>
                    <p className="text-xl font-bold text-green-500">+{batch.savingsAmount} PAS</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#13131A]/50 rounded-lg p-4">
                  <p className="text-xs text-[#E0E0E0]/60 mb-1">Intents</p>
                  <p className="text-2xl font-semibold text-white">{batch.intentCount}</p>
                </div>

                <div className="bg-[#13131A]/50 rounded-lg p-4">
                  <p className="text-xs text-[#E0E0E0]/60 mb-1">Total Volume</p>
                  <p className="text-2xl font-semibold text-white">{batch.totalVolume} PAS</p>
                </div>

                <div className="bg-[#13131A]/50 rounded-lg p-4">
                  <p className="text-xs text-[#E0E0E0]/60 mb-1">Attacks Blocked</p>
                  <p className="text-2xl font-semibold text-[#E6007A]">{batch.attacksPrevented}</p>
                </div>
              </div>

              {batch.attacksPrevented > 0 && (
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-500">
                    <AlertTriangle className="w-4 h-4" />
                    <p className="text-sm font-medium">
                      {batch.attacksPrevented} sandwich attack{batch.attacksPrevented > 1 ? "s" : ""} prevented
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Protection Info */}
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">How MEV Protection Works</h3>
            <p className="text-[#E0E0E0] leading-relaxed mb-4">
              Your intents are encrypted and batched with others to prevent front-running and sandwich attacks.
              Our fair ordering algorithm ensures you get the best execution price without MEV extraction.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-[#E0E0E0]">Encrypted intents</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-[#E0E0E0]">Fair batch ordering</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-[#E0E0E0]">No front-running</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-[#E0E0E0]">Optimal routing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
