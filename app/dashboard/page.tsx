"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import WalletConnect from "@/components/WalletConnect";
import SubmitJobForm from "@/components/SubmitJobForm";
import JobStatusMonitor from "@/components/JobStatusMonitor";
import MEVSavingsDashboard from "@/components/MEVSavingsDashboard";
import AttestationVerifier from "@/components/AttestationVerifier";
import { LayoutDashboard, Send, Activity, Shield, ShieldCheck, Menu, X } from "lucide-react";

type TabType = "overview" | "submit" | "jobs" | "mev" | "attestation";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: LayoutDashboard },
    { id: "submit" as TabType, label: "Submit Job", icon: Send },
    { id: "jobs" as TabType, label: "My Jobs", icon: Activity },
    { id: "mev" as TabType, label: "MEV Protection", icon: Shield },
    { id: "attestation" as TabType, label: "Attestation", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Geometric Grid Background */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E6007A 1px, transparent 1px),
            linear-gradient(to bottom, #E6007A 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0F]/90 backdrop-blur-[30px] border-b border-[#E6007A]/15">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 text-[#E0E0E0] hover:text-[#E6007A] transition-colors duration-300"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <a href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF0080] to-[#E6007A] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(230,0,122,0.4)]">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-xl font-semibold text-white hidden sm:block">
                  PolkaMesh Dashboard
                </span>
              </a>
            </div>

            <a
              href="/"
              className="text-[#E0E0E0] hover:text-[#E6007A] transition-colors duration-300 font-medium"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <div className="flex pt-[73px]">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 bg-[#13131A]/80 backdrop-blur-[20px] border-r border-[#E6007A]/15 z-30 transition-transform duration-300 lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="p-6 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#FF0080]/20 to-[#E6007A]/20 border border-[#E6007A]/40 text-[#E6007A] shadow-[0_0_15px_rgba(230,0,122,0.2)]"
                      : "text-[#E0E0E0] hover:bg-[#E6007A]/10 hover:text-[#E6007A] border border-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 max-w-[1400px] mx-auto w-full">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                    Welcome to PolkaMesh
                  </h1>
                  <p className="text-xl text-[#E0E0E0]">
                    Your decentralized AI compute marketplace
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <WalletConnect />
                  <div className="glass-card rounded-2xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-[#0A0A0F]/50 rounded-xl border border-[#E6007A]/10">
                        <span className="text-[#E0E0E0]">Active Jobs</span>
                        <span className="text-2xl font-bold text-[#E6007A]">3</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-[#0A0A0F]/50 rounded-xl border border-[#E6007A]/10">
                        <span className="text-[#E0E0E0]">Total Spent</span>
                        <span className="text-2xl font-bold text-white">400 PAS</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-[#0A0A0F]/50 rounded-xl border border-[#E6007A]/10">
                        <span className="text-[#E0E0E0]">MEV Saved</span>
                        <span className="text-2xl font-bold text-green-500">1,172.50 PAS</span>
                      </div>
                    </div>
                  </div>
                </div>

                <JobStatusMonitor />
              </div>
            )}

            {activeTab === "submit" && <SubmitJobForm />}

            {activeTab === "jobs" && <JobStatusMonitor />}

            {activeTab === "mev" && <MEVSavingsDashboard />}

            {activeTab === "attestation" && <AttestationVerifier />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
