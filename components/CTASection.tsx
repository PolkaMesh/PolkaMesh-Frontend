"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send } from "lucide-react";
import { useState } from "react";

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    useCase: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-32 bg-[#0A0A0F]" ref={ref}>
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6">
            Ready to Build on the Mesh?
          </h2>
          <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto">
            Submit your proposal and join the next generation of decentralized AI infrastructure
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#13131A] rounded-2xl p-10 md:p-12 border border-[#E6007A]/20 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E6007A]/20 bg-[#13131A] text-white focus:outline-none focus:ring-2 focus:ring-[#E6007A] focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E6007A]/20 bg-[#13131A] text-white focus:outline-none focus:ring-2 focus:ring-[#E6007A] focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-white mb-2"
              >
                Organization
              </label>
              <input
                type="text"
                id="organization"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E6007A]/20 bg-[#13131A] text-white focus:outline-none focus:ring-2 focus:ring-[#E6007A] focus:border-transparent transition-all duration-300"
                placeholder="Your company or project"
              />
            </div>

            <div>
              <label
                htmlFor="useCase"
                className="block text-sm font-medium text-white mb-2"
              >
                Use Case
              </label>
              <select
                id="useCase"
                required
                value={formData.useCase}
                onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E6007A]/20 bg-[#13131A] text-white focus:outline-none focus:ring-2 focus:ring-[#E6007A] focus:border-transparent transition-all duration-300 appearance-none"
              >
                <option value="">Select your use case</option>
                <option value="developer">AI Agent Development</option>
                <option value="city">Smart City Integration</option>
                <option value="defi">DeFi/MEV Protection</option>
                <option value="enterprise">Enterprise Solutions</option>
                <option value="research">Research & Academic</option>
                <option value="other">Other</option>
              </select>
            </div>

                        <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF0080] to-[#E6007A] text-white text-lg font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(230,0,122,0.3)] hover:shadow-[0_0_25px_rgba(230,0,122,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitted ? (
                <>
                  <svg
                    className="w-6 h-6"
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
                  Submitted Successfully
                </>
              ) : (
                <>
                  Submit Proposal
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-[#E0E0E0] mt-6"
        >
          By submitting this form, you agree to our Privacy Policy and Terms of Service
        </motion.p>
      </div>
    </section>
  );
}
