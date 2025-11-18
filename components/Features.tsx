"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Network, Database, ShieldCheck, Code } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Cross-Chain AI Compute Mesh",
    description: "Submit AI inference and training jobs to a decentralized network. Pay with any token via XCM. Web2 UX, Web3 infrastructure.",
    link: "#compute",
  },
  {
    icon: Database,
    title: "DePIN Smart City Data",
    description: "Cities monetize IoT sensor data through on-chain data NFTs. Privacy-preserving telemetry for traffic, energy, weather analysis.",
    link: "#depin",
  },
  {
    icon: ShieldCheck,
    title: "MEV-Resistant DeFi",
    description: "AI-powered transaction routing and analytics. OpenGov integration for community-driven anti-MEV policies.",
    link: "#mev",
  },
  {
    icon: Code,
    title: "Developer SDK",
    description: "TypeScript SDK for building AI copilots and automation agents. Plug-and-play modules for the entire parachain ecosystem.",
    link: "#sdk",
  },
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-32 bg-[#0A0A0F]" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6">
            Key Features
          </h2>
          <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto">
            Four pillars powering the next generation of decentralized AI infrastructure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass-card rounded-2xl p-10 hover:scale-[1.02]"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF0080] to-[#E6007A] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_10px_rgba(230,0,122,0.25)] group-hover:shadow-[0_0_15px_rgba(230,0,122,0.4)] transition-all duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-3xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-lg text-[#E0E0E0] leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <a
                  href={feature.link}
                  className="inline-flex items-center text-[#E6007A] font-medium hover:gap-2 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(230,0,122,0.6)]"
                >
                  Learn more
                  <svg
                    className="w-5 h-5 ml-1 group-hover:ml-2 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
