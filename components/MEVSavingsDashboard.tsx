"use client";

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, ArrowUpRight } from 'lucide-react';

export default function MEVSavingsDashboard() {
  // Mock data for demo purposes (since we don't have a live MEV feed yet)
  const stats = [
    { label: 'Total Volume Protected', value: '$1,245,890', change: '+12.5%', icon: BarChart3 },
    { label: 'MEV Saved (Total)', value: '$45,230', change: '+8.2%', icon: DollarSign },
    { label: 'Avg. Savings / Tx', value: '$4.50', change: '+2.1%', icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">MEV Protection Stats</h2>
            <p className="text-[#E0E0E0]/60">Real-time savings from Phala batching</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-500 text-sm font-medium">System Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0A0A0F]/50 border border-[#E6007A]/10 rounded-xl p-6 hover:border-[#E6007A]/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#E6007A]/10 rounded-lg">
                  <Icon className="w-5 h-5 text-[#E6007A]" />
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-lg">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-[#E0E0E0]/60 text-sm mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-[#E6007A]/10 to-purple-500/10 rounded-xl border border-[#E6007A]/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-semibold mb-1">Latest Batch Settled</h4>
            <p className="text-[#E0E0E0]/60 text-sm">Batch #45892 • 12 Intents • HydraDX</p>
          </div>
          <div className="text-right">
            <p className="text-[#E6007A] font-bold text-xl">$124.50</p>
            <p className="text-[#E0E0E0]/60 text-xs">Saved in this batch</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
