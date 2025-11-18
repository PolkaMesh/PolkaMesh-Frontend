"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const nodeCount = 50;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes with pink glow
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node with pink glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#FF0080";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255, 0, 128, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections with pink gradient
      nodes.forEach((node1, i) => {
        nodes.slice(i + 1).forEach((node2) => {
          const dx = node1.x - node2.x;
          const dy = node1.y - node2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.strokeStyle = `rgba(230, 0, 122, ${0.3 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0F] pt-20">
      {/* Geometric Grid Background */}
      <div className="absolute inset-0 opacity-[0.05]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #E6007A 1px, transparent 1px),
            linear-gradient(to bottom, #E6007A 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Animated Pink Mesh Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.25 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
            Decentralized AI Compute<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0080] via-[#E6007A] to-[#FF006B]">for Smart Cities & DeFi</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-[#E0E0E0] max-w-[1200px] mx-auto mb-12 leading-relaxed"
        >
          A privacy-first, cross-chain AI marketplace powered by Polkadot's multichain architecture. 
          Deploy AI agents, monetize IoT data, and protect against MEV—all on a permissionless mesh network.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF0080] to-[#E6007A] text-white text-lg font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(230,0,122,0.3)] hover:shadow-[0_0_25px_rgba(230,0,122,0.5)]">
            View Documentation
            <FileText className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button className="group flex items-center gap-3 px-8 py-4 bg-transparent text-[#E6007A] text-lg font-medium rounded-xl border-2 border-[#E6007A] hover:bg-[#E6007A]/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(230,0,122,0.4)]">
            Request Demo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#E6007A]/40 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#E6007A] rounded-full shadow-[0_0_10px_rgba(230,0,122,0.8)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
