"use client";

import { motion } from "framer-motion";
import { Github, Twitter, MessageCircle, FileText } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Documentation", href: "#docs" },
    { name: "SDK", href: "#sdk" },
    { name: "Pricing", href: "#pricing" },
  ],
  resources: [
    { name: "GitHub", href: "https://github.com" },
    { name: "Whitepaper", href: "#whitepaper" },
    { name: "Blog", href: "#blog" },
    { name: "API Reference", href: "#api" },
  ],
  community: [
    { name: "Discord", href: "https://discord.com" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "Forum", href: "#forum" },
    { name: "Events", href: "#events" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "Security", href: "#security" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: MessageCircle, href: "https://discord.com", label: "Discord" },
  { icon: FileText, href: "#docs", label: "Documentation" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0F] text-white py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF0080] to-[#E6007A] flex items-center justify-center shadow-[0_0_20px_rgba(230,0,122,0.5)]">
                <div className="w-6 h-6 border-2 border-white rounded-full" />
              </div>
              <span className="text-xl font-semibold">Polkadot AI Mesh</span>
            </div>
            <p className="text-[#E0E0E0] text-sm leading-relaxed mb-6">
              Decentralized AI compute infrastructure for the next generation of Smart Cities and DeFi applications.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-[#2D2D2F] flex items-center justify-center hover:bg-gradient-to-br hover:from-[#FF0080] hover:to-[#E6007A] transition-all duration-300 hover:shadow-[0_0_20px_rgba(230,0,122,0.6)]"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#E0E0E0] hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#E0E0E0] hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#E0E0E0] hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#E0E0E0] hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-[#2D2D2F] pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-[#E0E0E0] mb-6">
              Get the latest updates on Polkadot AI Mesh development and ecosystem news
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-[#2D2D2F] border border-[#3D3D3F] text-white placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0A84FF] focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#FF0080] to-[#E6007A] text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(230,0,122,0.3)] hover:shadow-[0_0_25px_rgba(230,0,122,0.5)] hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2D2D2F] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#E0E0E0] text-sm">
            © {new Date().getFullYear()} Polkadot AI Mesh. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#E6007A] flex items-center justify-center">
              <span className="text-white text-xs font-bold">●</span>
            </div>
            <span className="text-[#E0E0E0] text-sm">Built on Polkadot</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
