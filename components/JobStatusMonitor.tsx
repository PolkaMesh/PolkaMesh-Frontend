"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, CheckCircle, XCircle, Clock, Loader, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type JobStatus = "Registered" | "Assigned" | "InProgress" | "Completed" | "Failed";

interface Job {
  id: string;
  description: string;
  status: JobStatus;
  owner: string;
  budget: string;
  computeType: string;
  provider?: string;
  createdAt: number;
  completedAt?: number;
  resultHash?: string;
}

const mockJobs: Job[] = [
  {
    id: "1",
    description: "Image classification - ResNet50 inference",
    status: "Completed",
    owner: "5GrwvaEF...utQY",
    budget: "100",
    computeType: "GPU",
    provider: "5FHneW...7MZg",
    createdAt: Date.now() - 3600000,
    completedAt: Date.now() - 1800000,
    resultHash: "0x7a3c...92ef",
  },
  {
    id: "2",
    description: "LLM inference - GPT-2 text generation",
    status: "InProgress",
    owner: "5GrwvaEF...utQY",
    budget: "250",
    computeType: "GPU",
    provider: "5DfhGw...9Kpl",
    createdAt: Date.now() - 900000,
  },
  {
    id: "3",
    description: "Data preprocessing pipeline",
    status: "Assigned",
    owner: "5GrwvaEF...utQY",
    budget: "50",
    computeType: "CPU",
    provider: "5EkQtp...4Xbv",
    createdAt: Date.now() - 300000,
  },
];

export default function JobStatusMonitor() {
  const [jobs] = useState<Job[]>(mockJobs);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case "Registered":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "Assigned":
        return <Activity className="w-5 h-5 text-blue-500" />;
      case "InProgress":
        return <Loader className="w-5 h-5 text-[#E6007A] animate-spin" />;
      case "Completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case "Registered":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "Assigned":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "InProgress":
        return "bg-[#E6007A]/10 text-[#E6007A] border-[#E6007A]/30";
      case "Completed":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "Failed":
        return "bg-red-500/10 text-red-500 border-red-500/30";
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const toggleExpand = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
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
          <Activity className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-white">Job Status Monitor</h2>
          <p className="text-[#E0E0E0] mt-1">Track your submitted jobs in real-time</p>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-[#E6007A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-10 h-10 text-[#E6007A]/40" />
          </div>
          <p className="text-[#E0E0E0] text-lg">No jobs submitted yet</p>
          <p className="text-[#E0E0E0]/60 text-sm mt-2">Submit your first AI job to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#0A0A0F]/50 rounded-xl border border-[#E6007A]/10 overflow-hidden hover:border-[#E6007A]/30 transition-all duration-300"
            >
              {/* Job Header */}
              <div
                className="p-5 cursor-pointer"
                onClick={() => toggleExpand(job.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {getStatusIcon(job.status)}
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-lg mb-1">
                        {job.description}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-[#E0E0E0]">
                        <span>Job #{job.id}</span>
                        <span>•</span>
                        <span>{job.computeType}</span>
                        <span>•</span>
                        <span>{job.budget} PAS</span>
                        <span>•</span>
                        <span>{formatTimestamp(job.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-lg border text-sm font-medium ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                    {expandedJob === job.id ? (
                      <ChevronUp className="w-5 h-5 text-[#E0E0E0]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#E0E0E0]" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-[#E6007A]/10"
                  >
                    <div className="p-5 space-y-4">
                      {/* Job Details Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#13131A]/50 rounded-lg p-4">
                          <p className="text-sm text-[#E0E0E0]/60 mb-1">Owner</p>
                          <p className="text-white font-mono text-sm">{job.owner}</p>
                        </div>

                        {job.provider && (
                          <div className="bg-[#13131A]/50 rounded-lg p-4">
                            <p className="text-sm text-[#E0E0E0]/60 mb-1">Provider</p>
                            <p className="text-white font-mono text-sm">{job.provider}</p>
                          </div>
                        )}

                        <div className="bg-[#13131A]/50 rounded-lg p-4">
                          <p className="text-sm text-[#E0E0E0]/60 mb-1">Created</p>
                          <p className="text-white text-sm">
                            {new Date(job.createdAt).toLocaleString()}
                          </p>
                        </div>

                        {job.completedAt && (
                          <div className="bg-[#13131A]/50 rounded-lg p-4">
                            <p className="text-sm text-[#E0E0E0]/60 mb-1">Completed</p>
                            <p className="text-white text-sm">
                              {new Date(job.completedAt).toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Result Hash */}
                      {job.resultHash && (
                        <div className="bg-[#13131A]/50 rounded-lg p-4 border border-green-500/20">
                          <p className="text-sm text-[#E0E0E0]/60 mb-2">Result Hash</p>
                          <p className="text-green-500 font-mono text-sm break-all">{job.resultHash}</p>
                        </div>
                      )}

                      {/* Progress Timeline */}
                      <div className="relative pt-4">
                        <div className="flex justify-between items-center">
                          {(["Registered", "Assigned", "InProgress", "Completed"] as JobStatus[]).map((stage, idx) => {
                            const stageIndex = ["Registered", "Assigned", "InProgress", "Completed"].indexOf(job.status);
                            const currentIndex = ["Registered", "Assigned", "InProgress", "Completed"].indexOf(stage);
                            const isCompleted = currentIndex <= stageIndex;
                            const isCurrent = currentIndex === stageIndex;

                            return (
                              <div key={stage} className="flex flex-col items-center flex-1 relative">
                                {idx > 0 && (
                                  <div
                                    className={`absolute top-4 left-0 right-1/2 h-0.5 -z-10 ${
                                      isCompleted ? "bg-[#E6007A]" : "bg-[#E0E0E0]/20"
                                    }`}
                                  />
                                )}
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    isCompleted
                                      ? "bg-[#E6007A] border-[#E6007A] shadow-[0_0_15px_rgba(230,0,122,0.4)]"
                                      : "bg-[#0A0A0F] border-[#E0E0E0]/20"
                                  }`}
                                >
                                  {isCompleted && (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  )}
                                </div>
                                <p
                                  className={`text-xs mt-2 ${
                                    isCurrent ? "text-[#E6007A] font-semibold" : "text-[#E0E0E0]/60"
                                  }`}
                                >
                                  {stage}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
