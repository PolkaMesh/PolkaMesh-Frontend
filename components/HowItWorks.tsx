"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Upload, Cpu, CreditCard, Shield, Link2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Submit AI Job",
    description: "Upload inference or training tasks via SDK with simple API calls",
  },
  {
    icon: Cpu,
    title: "Decentralized Compute Execution",
    description: "Distributed across Phala and Acurast nodes for resilient processing",
  },
  {
    icon: CreditCard,
    title: "Cross-Chain Payment via XCM",
    description: "Pay with any parachain token using Polkadot's native interoperability",
  },
  {
    icon: Shield,
    title: "Privacy-Preserved Results",
    description: "Zero-knowledge proofs ensure data confidentiality throughout execution",
  },
  {
    icon: Link2,
    title: "Smart City/DeFi Integration",
    description: "Seamless integration with IoT networks and decentralized exchanges",
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-32 bg-[#0A0A0F]" ref={ref}>
      <div className="max-w-[1350px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6">
            How Polkadot AI Mesh Works
          </h2>
          <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto">
            Five-step process for decentralized AI compute execution
          </p>
        </motion.div>

        {/* Desktop: Horizontal Flow */}
        <div className="hidden lg:block relative">
          <div className="flex justify-between items-start">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex-1"
                >
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-[#0A84FF] to-transparent" />
                  )}
                  
                  <div className="relative z-10 bg-[#13131A] rounded-2xl p-6 border border-[#E6007A]/20 shadow-sm hover:shadow-md transition-all duration-300 mr-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF0080] to-[#E6007A] rounded-xl flex items-center justify-center mb-4 mx-auto shadow-[0_0_10px_rgba(230,0,122,0.3)]">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-[#E6007A] mb-2 text-center">
                      Step {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-base text-[#E0E0E0] text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet: Vertical Flow */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-12 bg-linear-to-b from-[#0A84FF] to-transparent" />
                )}
                
                <div className="relative z-10 bg-[#13131A] rounded-2xl p-6 border border-[#E6007A]/20 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF0080] to-[#E6007A] rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(230,0,122,0.3)]">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#E6007A] mb-2">
                        Step {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-base text-[#E0E0E0] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
