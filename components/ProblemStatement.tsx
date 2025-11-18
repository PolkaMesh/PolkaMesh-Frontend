"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Server, Database, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: Server,
    title: "Centralized Compute Bottlenecks",
    description: "Traditional cloud AI providers create single points of failure with limited geographic reach and vendor lock-in",
  },
  {
    icon: Database,
    title: "Siloed Smart City Data",
    description: "IoT sensor data remains isolated in proprietary systems, preventing monetization and cross-city intelligence sharing",
  },
  {
    icon: AlertTriangle,
    title: "MEV Exploitation in DeFi",
    description: "Frontrunning and sandwich attacks cost users billions annually due to transparent mempool visibility",
  },
];

export default function ProblemStatement() {
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
            The Challenge
          </h2>
          <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto">
            Current AI infrastructure faces critical limitations that prevent widespread adoption and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group glass-card rounded-2xl p-8 hover:scale-[1.02]"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#FF0080] to-[#E6007A] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_10px_rgba(230,0,122,0.25)] group-hover:shadow-[0_0_15px_rgba(230,0,122,0.4)] transition-all duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {problem.title}
                </h3>
                <p className="text-lg text-[#E0E0E0] leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
