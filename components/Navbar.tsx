"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0F]/90 backdrop-blur-[30px] shadow-lg border-b border-[#E6007A]/15"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1350px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden">
              <Image
                src="/logopolkadot.jpeg"
                alt="Polkasmesh Logo"
                width={40}
                height={40}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  // Fallback to favicon if logo.svg doesn't exist
                  e.currentTarget.src = "/favicon.ico";
                }}
              />
            </div>
            <span className="text-xl font-semibold text-white">
              Polkasmesh
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-[#E0E0E0] hover:text-[#E6007A] transition-colors duration-300 font-medium hover:drop-shadow-[0_0_15px_rgba(230,0,122,0.6)]"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-[#E0E0E0] hover:text-[#E6007A] transition-colors duration-300 font-medium hover:drop-shadow-[0_0_15px_rgba(230,0,122,0.6)]"
            >
              How It Works
            </a>
            <a
              href="/marketplace"
              className="text-[#E0E0E0] hover:text-[#E6007A] transition-colors duration-300 font-medium hover:drop-shadow-[0_0_15px_rgba(230,0,122,0.6)]"
            >
              Marketplace
            </a>
            <a
              href="/phala-status"
              className="text-[#E0E0E0] hover:text-[#E6007A] transition-colors duration-300 font-medium hover:drop-shadow-[0_0_15px_rgba(230,0,122,0.6)]"
            >
              Phala TEE
            </a>
            <a
              href="/dashboard"
              className="px-6 py-2 bg-gradient-to-r from-[#FF0080] to-[#E6007A] text-white rounded-lg transition-all duration-300 font-medium shadow-[0_0_15px_rgba(230,0,122,0.3)] hover:shadow-[0_0_25px_rgba(230,0,122,0.5)] hover:scale-105"
            >
              Launch App
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
