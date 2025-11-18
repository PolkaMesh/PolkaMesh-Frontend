"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const layers = [
  {
    name: "Compute Layer",
    tech: "Phala Network, Acurast",
    description: "Confidential computing nodes execute AI workloads in trusted execution environments (TEEs)",
    color: "#0A84FF",
  },
  {
    name: "Data Layer",
    tech: "Robonomics, Centrifuge, DePIN Networks",
    description: "IoT sensor data streams, on-chain data NFTs, and privacy-preserving telemetry aggregation",
    color: "#34C759",
  },
  {
    name: "Privacy Layer",
    tech: "Zero-Knowledge Proofs, Aleph Zero",
    description: "zkSNARKs ensure data confidentiality and verifiable computation without revealing sensitive inputs",
    color: "#FF9500",
  },
  {
    name: "DeFi Layer",
    tech: "HydraDX, Polkadex, XCM",
    description: "Cross-chain payment rails, MEV-resistant trading, and automated liquidity routing",
    color: "#E6007A",
  },
];

export default function Architecture() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
            Technical Architecture
          </h2>
          <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto">
            Four interconnected layers powering decentralized AI infrastructure
          </p>
        </motion.div>

        <div className="max-w-[1200px] mx-auto space-y-4">
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connecting Arrow */}
              {index < layers.length - 1 && (
                <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 z-10">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#D2D2D7]"
                  >
                    <path
                      d="M12 5v14m0 0l-4-4m4 4l4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              <div
                className="bg-[#13131A] rounded-2xl border border-[#E6007A]/20 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div
                  className="p-8 flex items-center justify-between"
                  style={{
                    borderLeft: `4px solid ${layer.color}`,
                  }}
                >
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {layer.name}
                    </h3>
                    <p className="text-lg text-[#E0E0E0] font-medium">
                      {layer.tech}
                    </p>
                  </div>
                  
                  <button className="ml-4 w-10 h-10 rounded-full bg-[#13131A]/50 flex items-center justify-center hover:bg-[#E6007A]/10 transition-colors duration-300">
                    {expandedIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIndex === index ? "auto" : 0,
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 pt-0">
                    <p className="text-lg text-[#E0E0E0] leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Schematic Diagram for Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:block mt-20 bg-[#0A0A0F] rounded-2xl p-12 border border-[#E6007A]/20 shadow-sm"
        >
          <div className="flex items-center justify-center gap-8">
            {layers.map((layer, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-40 h-24 rounded-xl flex items-center justify-center text-white font-semibold text-center px-4 shadow-md"
                  style={{ backgroundColor: layer.color }}
                >
                  {layer.name}
                </div>
                {index < layers.length - 1 && (
                  <div className="mx-4 text-[#D2D2D7]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14m0 0l-4-4m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
