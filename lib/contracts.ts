// Contract addresses for PolkaMesh on Paseo Testnet
// Deployed: November 16, 2024

export const PASEO_RPC = "wss://rpc1.paseo.popnetwork.xyz";
export const BACKEND_API = "http://localhost:3000";

export interface ContractInfo {
  name: string;
  address: string;
  codeHash: string;
}

// All 6 deployed contracts
export const contracts = {
  paymentEscrow: {
    name: "payment_escrow",
    address: "0x5a86a13ef7fc1c5e58f022be183de015dfb702ae",
    codeHash: "0x7bffbcb4",
  },
  aiJobQueue: {
    name: "ai_job_queue",
    address: "0xa44639cd0d0e6c6607491088c9c549e184456122",
    codeHash: "0xbcfb61e4",
  },
  computeProvider: {
    name: "compute_provider_registry",
    address: "0x2c6fc00458f198f46ef072e1516b83cd56db7cf5",
    codeHash: "0xbec95ea6",
  },
  dataNFT: {
    name: "data_nft_registry",
    address: "0x6dc84ddeffccb19ed5285cf3c3d7b03a57a9a4b1",
    codeHash: "0x039a3e14",
  },
  phalaJobProcessor: {
    name: "phala_job_processor",
    address: "5HrKZAiTSAFcuxda89kSD77ZdygRUkufwRnGKgfGFR4NC2np",
    codeHash: "0x7086c9d6",
  },
  mevProtection: {
    name: "mev_protection",
    address: "5DTPZHSHydkPQZbTFrhnHtZiDER7uoKSzdYHuCUXVAtjajXs",
    codeHash: "0x99495233",
  },
} as const;

export function getContractInfo(name: keyof typeof contracts): ContractInfo {
  return contracts[name];
}
