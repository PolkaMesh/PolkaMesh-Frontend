"use client";

import { motion } from "framer-motion";
import { Wallet, LogOut, Copy, Check, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { connectWallet, getBalance, formatBalance, initializeApi } from "../lib/polkadot";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface WalletConnectProps {
  onConnect?: (account: InjectedAccountWithMeta) => void;
  onDisconnect?: () => void;
}

export default function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [balance, setBalance] = useState("0");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize API on component mount
    initializeApi().catch(err => {
      console.error("Failed to initialize API:", err);
      setError("Failed to connect to blockchain");
    });
  }, []);

  useEffect(() => {
    // Update balance when account changes
    if (account) {
      updateBalance();
      // Update balance every 10 seconds
      const interval = setInterval(updateBalance, 10000);
      return () => clearInterval(interval);
    }
  }, [account]);

  const updateBalance = async () => {
    if (!account) return;
    try {
      const bal = await getBalance(account.address);
      setBalance(formatBalance(bal));
    } catch (err) {
      console.error("Failed to fetch balance:", err);
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    setError("");

    try {
      // Connect to Polkadot.js extension
      const accounts = await connectWallet();

      if (accounts.length === 0) {
        throw new Error("No accounts found in wallet");
      }

      // Use first account
      const selectedAccount = accounts[0];
      setAccount(selectedAccount);
      setIsConnected(true);

      // Get balance
      const bal = await getBalance(selectedAccount.address);
      setBalance(formatBalance(bal));

      // Notify parent
      onConnect?.(selectedAccount);
    } catch (err: any) {
      console.error("Wallet connection failed:", err);
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAccount(null);
    setBalance("0");
    onDisconnect?.();
  };

  const copyAddress = () => {
    if (!account) return;
    navigator.clipboard.writeText(account.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-2xl p-8"
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0080] to-[#E6007A] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(230,0,122,0.5)]">
            <Wallet className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-2xl font-semibold text-white mb-3">
            Connect Your Wallet
          </h3>
          <p className="text-[#E0E0E0] mb-8">
            Connect your Polkadot wallet to start using PolkaMesh
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-500 text-sm text-left">{error}</p>
            </div>
          )}

          <button
            onClick={handleConnect}
            disabled={loading}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF0080] to-[#E6007A] text-white rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,0,122,0.6)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wallet className="w-5 h-5" />
            {loading ? "Connecting..." : "Connect Polkadot.js"}
          </button>

          <p className="text-[#E0E0E0]/60 text-sm mt-6">
            Make sure you have{" "}
            <a
              href="https://polkadot.js.org/extension/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6007A] hover:underline"
            >
              Polkadot.js extension
            </a>{" "}
            installed
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF0080] to-[#E6007A] rounded-full flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-[#E0E0E0]/60">Connected</p>
            <p className="text-white font-medium">
              {account?.meta.name || "Account"}
            </p>
          </div>
        </div>

        <button
          onClick={handleDisconnect}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          title="Disconnect"
        >
          <LogOut className="w-5 h-5 text-[#E0E0E0]" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="p-4 bg-[#0A0A0F]/50 rounded-xl">
          <p className="text-sm text-[#E0E0E0]/60 mb-1">Address</p>
          <div className="flex items-center justify-between gap-2">
            <code className="text-white font-mono text-sm">
              {account && shortenAddress(account.address)}
            </code>
            <button
              onClick={copyAddress}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              title="Copy address"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-[#E0E0E0]" />
              )}
            </button>
          </div>
        </div>

        <div className="p-4 bg-[#0A0A0F]/50 rounded-xl">
          <p className="text-sm text-[#E0E0E0]/60 mb-1">Balance</p>
          <p className="text-white font-semibold text-lg">{balance} PAS</p>
        </div>
      </div>
    </motion.div>
  );
}
