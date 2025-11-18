"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Building2, TrendingUp } from "lucide-react";
import { useState } from "react";

const useCases = [
  {
    icon: Code2,
    persona: "For Developers",
    title: "Deploy AI Agents with SDK",
    benefits: [
      "TypeScript-first SDK with full type safety",
      "Pre-built templates for common AI workflows",
      "Seamless integration with all parachains",
      "Built-in monitoring and analytics dashboard",
    ],
    flow: ["Install SDK → Configure API Keys → Deploy Agent → Monitor Performance"],
  },
  {
    icon: Building2,
    persona: "For Smart Cities",
    title: "Monetize IoT Data Streams",
    benefits: [
      "Privacy-preserving data marketplace",
      "Automated revenue sharing via smart contracts",
      "Real-time traffic, energy, and weather insights",
      "Interoperable with existing city infrastructure",
    ],
    flow: ["Connect Sensors → Mint Data NFTs → Set Pricing → Earn Revenue"],
  },
  {
    icon: TrendingUp,
    persona: "For DeFi Users",
    title: "Access Anti-MEV Protection",
    benefits: [
      "AI-powered transaction routing optimization",
      "Real-time MEV risk assessment",
      "Community governance for anti-MEV policies",
      "Cross-DEX arbitrage protection",
    ],
    flow: ["Connect Wallet → Enable Protection → Trade Safely → Review Savings"],
  },
];

export default function UseCases() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-32 bg-[#0A0A0F]" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6">
            Use Cases
          </h2>
          <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto">
            Built for three key personas across the Web3 ecosystem
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "bg-gradient-to-r from-[#FF0080] to-[#E6007A] text-white shadow-lg scale-105"
                    : "bg-[#13131A]/50 text-[#E0E0E0] hover:bg-[#E6007A]/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                {useCase.persona}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#13131A] rounded-2xl p-10 md:p-12 border border-[#E6007A]/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Title & Benefits */}
            <div>
              <h3 className="text-4xl font-semibold text-white mb-6">
                {useCases[activeTab].title}
              </h3>
              
              <div className="space-y-4">
                {useCases[activeTab].benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF0080] to-[#E6007A] bg-opacity-10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-[#E6007A]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-lg text-[#E0E0E0]">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: User Flow Diagram */}
            <div className="bg-[#0A0A0F] rounded-xl p-8 border border-[#E6007A]/20">
              <h4 className="text-xl font-semibold text-white mb-6">
                User Flow
              </h4>
              
              <div className="space-y-4">
                {useCases[activeTab].flow[0].split(" → ").map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative"
                  >
                    {index < useCases[activeTab].flow[0].split(" → ").length - 1 && (
                      <div className="absolute left-4 top-14 w-0.5 h-6 bg-[#E8E8ED]" />
                    )}
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF0080] to-[#E6007A] text-white flex items-center justify-center font-semibold shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-lg text-white font-medium">
                        {step}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
