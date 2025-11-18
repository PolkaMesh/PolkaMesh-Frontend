"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const stats = [
  { value: 100, suffix: "+", label: "Compute Nodes" },
  { value: 15, suffix: "", label: "Parachains" },
  { value: 99.9, suffix: "%", label: "Uptime" },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="py-32 bg-[#0A0A0F]" ref={ref}>
      <div className="max-w-[1300px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6">
            Network Metrics
          </h2>
          <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto">
            Real-time performance statistics from the Polkadot AI Mesh network
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="text-7xl md:text-8xl font-bold text-[#E6007A] mb-4">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-2xl text-[#E0E0E0] font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-[#13131A] rounded-2xl p-8 border border-[#E6007A]/20"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Global Coverage
            </h3>
            <p className="text-lg text-[#E0E0E0] leading-relaxed">
              Compute nodes distributed across 25+ countries ensuring low-latency 
              AI inference and data processing for smart cities worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-[#13131A] rounded-2xl p-8 border border-[#E6007A]/20"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Energy Efficient
            </h3>
            <p className="text-lg text-[#E0E0E0] leading-relaxed">
              75% lower energy consumption compared to traditional cloud AI 
              providers through optimized parachain execution and resource sharing.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
