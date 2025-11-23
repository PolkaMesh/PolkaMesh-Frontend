"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import {
  Cpu, Database, Shield, Star, Zap,
  Server, HardDrive, Activity, ExternalLink,
  Filter, Search, TrendingUp
} from 'lucide-react';
import api from '@/lib/api';

interface Provider {
  id: string;
  name: string;
  address: string;
  capabilities: string[];
  reputation: number;
  totalJobs: number;
  successRate: number;
  pricePerHour: string;
  status: 'online' | 'offline' | 'busy';
  location?: string;
}

interface DataNFT {
  id: string;
  name: string;
  description: string;
  dataType: string;
  pricePerAccess: string;
  totalSubscribers: number;
  privacyLevel: 'Public' | 'Private' | 'Confidential';
}

// Mock data for demo
const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Phala TEE Worker #1',
    address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    capabilities: ['GPU', 'TEE', 'ML Inference'],
    reputation: 98,
    totalJobs: 1245,
    successRate: 99.2,
    pricePerHour: '2.5',
    status: 'online',
    location: 'US-WEST'
  },
  {
    id: '2',
    name: 'Acurast Node Alpha',
    address: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
    capabilities: ['CPU', 'Data Processing'],
    reputation: 95,
    totalJobs: 892,
    successRate: 98.5,
    pricePerHour: '1.2',
    status: 'online',
    location: 'EU-WEST'
  },
  {
    id: '3',
    name: 'HydraDX Compute Pool',
    address: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
    capabilities: ['GPU', 'TPU', 'Training'],
    reputation: 92,
    totalJobs: 567,
    successRate: 97.8,
    pricePerHour: '4.0',
    status: 'busy',
    location: 'AP-SOUTHEAST'
  },
  {
    id: '4',
    name: 'Moonbeam ML Worker',
    address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    capabilities: ['CPU', 'ML Inference'],
    reputation: 89,
    totalJobs: 234,
    successRate: 96.5,
    pricePerHour: '1.8',
    status: 'online',
    location: 'US-EAST'
  }
];

const mockDataNFTs: DataNFT[] = [
  {
    id: '1',
    name: 'Smart City Traffic Data',
    description: 'Real-time traffic sensor data from 500+ intersections',
    dataType: 'IoT Sensor',
    pricePerAccess: '0.5',
    totalSubscribers: 45,
    privacyLevel: 'Private'
  },
  {
    id: '2',
    name: 'DeFi Price Feeds',
    description: 'Aggregated price data from 20+ DEXes',
    dataType: 'Financial',
    pricePerAccess: '0.1',
    totalSubscribers: 234,
    privacyLevel: 'Public'
  },
  {
    id: '3',
    name: 'Healthcare Research Dataset',
    description: 'Anonymized patient records for ML training',
    dataType: 'Healthcare',
    pricePerAccess: '5.0',
    totalSubscribers: 12,
    privacyLevel: 'Confidential'
  },
  {
    id: '4',
    name: 'Weather Station Network',
    description: 'Global weather data from 10,000+ stations',
    dataType: 'Environmental',
    pricePerAccess: '0.25',
    totalSubscribers: 89,
    privacyLevel: 'Public'
  }
];

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState<'providers' | 'data'>('providers');
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [dataNFTs, setDataNFTs] = useState<DataNFT[]>(mockDataNFTs);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try to fetch real data from backend
    const fetchData = async () => {
      setLoading(true);
      try {
        const [providersRes, dataNFTsRes] = await Promise.all([
          api.listProviders(),
          api.listDataNFTs()
        ]);

        // Map backend provider format to frontend format
        if (providersRes?.providers?.length > 0) {
          const mappedProviders = providersRes.providers.map((p: any, index: number) => ({
            id: String(index + 1),
            name: `${p.location || 'Global'} Provider #${index + 1}`,
            address: p.address,
            capabilities: p.computeTypes || [],
            reputation: Math.round((p.reputation || 4.5) * 20), // Convert 5-star to 100 scale
            totalJobs: p.jobsCompleted || 0,
            successRate: 95 + Math.random() * 4.9, // Mock success rate
            pricePerHour: (Number(p.pricePerHour) / 1e12).toFixed(2), // Convert from planck
            status: p.available ? 'online' : 'offline',
            location: p.location
          }));
          setProviders(mappedProviders);
        }

        // Map backend data NFTs if available
        if (dataNFTsRes?.dataNfts?.length > 0) {
          const mappedNFTs = dataNFTsRes.dataNfts.map((d: any, index: number) => ({
            id: String(index + 1),
            name: d.name || `Data NFT #${d.tokenId}`,
            description: d.description || 'IoT Data Stream',
            dataType: d.dataType || 'Sensor Data',
            pricePerAccess: (Number(d.pricePerAccess || 0) / 1e12).toFixed(2),
            totalSubscribers: d.subscriberCount || 0,
            privacyLevel: d.privacyLevel || 'Public'
          }));
          setDataNFTs(mappedNFTs);
        }
      } catch (err) {
        console.log('Using mock data - backend may not be running');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPrivacyColor = (level: string) => {
    switch (level) {
      case 'Public': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Private': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Confidential': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#E6007A]/30">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <Navbar />

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Marketplace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#E0E0E0]/60 mt-2 text-lg"
          >
            Discover compute providers and data assets on PolkaMesh
          </motion.p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E0E0E0]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search providers or data assets..."
              className="w-full pl-12 pr-4 py-3 bg-[#0A0A0F]/50 border border-[#E6007A]/20 rounded-xl text-white placeholder-[#E0E0E0]/40 focus:border-[#E6007A] focus:outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0F]/50 border border-[#E6007A]/20 rounded-xl text-[#E0E0E0] hover:border-[#E6007A]/40 transition-all">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('providers')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'providers'
                ? 'bg-gradient-to-r from-[#FF0080] to-[#E6007A] text-white shadow-[0_0_15px_rgba(230,0,122,0.3)]'
                : 'bg-[#0A0A0F]/50 text-[#E0E0E0] border border-[#E6007A]/20 hover:border-[#E6007A]/40'
            }`}
          >
            <Server className="w-5 h-5" />
            Compute Providers
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'data'
                ? 'bg-gradient-to-r from-[#FF0080] to-[#E6007A] text-white shadow-[0_0_15px_rgba(230,0,122,0.3)]'
                : 'bg-[#0A0A0F]/50 text-[#E0E0E0] border border-[#E6007A]/20 hover:border-[#E6007A]/40'
            }`}
          >
            <Database className="w-5 h-5" />
            Data NFTs
          </button>
        </div>

        {/* Content */}
        {activeTab === 'providers' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:border-[#E6007A]/40 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF0080] to-[#E6007A] rounded-xl flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#E6007A] transition-colors">
                        {provider.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(provider.status)}`} />
                        <span className="text-sm text-[#E0E0E0]/60 capitalize">{provider.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">{provider.reputation}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="px-3 py-1 bg-[#E6007A]/10 text-[#E6007A] text-xs rounded-full border border-[#E6007A]/20"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-[#0A0A0F]/50 rounded-lg">
                    <p className="text-[#E0E0E0]/60 text-xs mb-1">Jobs</p>
                    <p className="text-white font-semibold">{provider.totalJobs}</p>
                  </div>
                  <div className="text-center p-3 bg-[#0A0A0F]/50 rounded-lg">
                    <p className="text-[#E0E0E0]/60 text-xs mb-1">Success</p>
                    <p className="text-green-500 font-semibold">{provider.successRate}%</p>
                  </div>
                  <div className="text-center p-3 bg-[#0A0A0F]/50 rounded-lg">
                    <p className="text-[#E0E0E0]/60 text-xs mb-1">Price/hr</p>
                    <p className="text-white font-semibold">{provider.pricePerHour} PAS</p>
                  </div>
                </div>

                <button className="w-full py-3 bg-[#E6007A]/10 text-[#E6007A] rounded-xl font-medium border border-[#E6007A]/20 hover:bg-[#E6007A]/20 transition-all">
                  Select Provider
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:border-[#E6007A]/40 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#E6007A] transition-colors">
                        {nft.name}
                      </h3>
                      <span className="text-sm text-[#E0E0E0]/60">{nft.dataType}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full border ${getPrivacyColor(nft.privacyLevel)}`}>
                    {nft.privacyLevel}
                  </span>
                </div>

                <p className="text-[#E0E0E0]/80 text-sm mb-4 line-clamp-2">
                  {nft.description}
                </p>

                <div className="flex justify-between items-center mb-4 p-3 bg-[#0A0A0F]/50 rounded-lg">
                  <div>
                    <p className="text-[#E0E0E0]/60 text-xs mb-1">Price per Access</p>
                    <p className="text-white font-semibold">{nft.pricePerAccess} PAS</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#E0E0E0]/60 text-xs mb-1">Subscribers</p>
                    <p className="text-[#E6007A] font-semibold">{nft.totalSubscribers}</p>
                  </div>
                </div>

                <button className="w-full py-3 bg-[#E6007A]/10 text-[#E6007A] rounded-xl font-medium border border-[#E6007A]/20 hover:bg-[#E6007A]/20 transition-all">
                  Subscribe to Data
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-8 bg-gradient-to-r from-[#E6007A]/10 to-purple-500/10 rounded-2xl border border-[#E6007A]/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4</p>
              <p className="text-[#E0E0E0]/60 text-sm">Active Providers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4</p>
              <p className="text-[#E0E0E0]/60 text-sm">Data NFTs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#E6007A]">2,938</p>
              <p className="text-[#E0E0E0]/60 text-sm">Jobs Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">98.5%</p>
              <p className="text-[#E0E0E0]/60 text-sm">Avg Success Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
