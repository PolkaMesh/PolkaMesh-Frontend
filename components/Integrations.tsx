"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const partners = [
  { name: "Phala Network", description: "Confidential Computing" },
  { name: "Acurast", description: "Decentralized Compute" },
  { name: "HydraDX", description: "Cross-Chain Liquidity" },
  { name: "Polkadex", description: "Orderbook DEX" },
  { name: "Robonomics", description: "IoT & Robotics" },
  { name: "Centrifuge", description: "Real-World Assets" },
];

export default function Integrations() {
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
            Ecosystem Integrations
          </h2>
          <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto">
            Partnering with leading Polkadot parachains for seamless interoperability
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-[#0A0A0F] rounded-2xl p-8 border border-[#E6007A]/20 hover:border-[#E6007A]/60 hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 rounded-xl bg-[#13131A]/50 flex items-center justify-center mb-4 group-hover:bg-gradient-to-r from-[#FF0080] to-[#E6007A] transition-colors duration-300">
                <span className="text-2xl font-bold text-white group-hover:text-white transition-colors duration-300">
                  {partner.name.charAt(0)}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {partner.name}
              </h3>
              
              <p className="text-sm text-[#E0E0E0]">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Polkadot Logo Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-[#0A0A0F] rounded-full border border-[#E6007A]/20 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#E6007A] flex items-center justify-center">
              <span className="text-white font-bold text-sm">●</span>
            </div>
            <span className="text-lg font-semibold text-white">
              Built on Polkadot
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
