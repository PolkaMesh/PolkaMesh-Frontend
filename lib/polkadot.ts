import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { PASEO_RPC, contracts } from './contracts';

let api: ApiPromise | null = null;

// Check if we're in the browser
const isBrowser = typeof window !== 'undefined';

/**
 * Initialize Polkadot.js API connection
 */
export async function initializeApi(): Promise<ApiPromise> {
  if (api) return api;

  const provider = new WsProvider(PASEO_RPC);
  api = await ApiPromise.create({ provider });

  return api;
}

/**
 * Get the initialized API instance
 */
export function getApi(): ApiPromise {
  if (!api) {
    throw new Error('API not initialized. Call initializeApi() first.');
  }
  return api;
}

/**
 * Connect to Polkadot.js extension wallet
 */
export async function connectWallet(): Promise<InjectedAccountWithMeta[]> {
  if (!isBrowser) {
    throw new Error('Wallet connection is only available in the browser');
  }

  // Dynamically import extension-dapp (client-side only)
  const { web3Accounts, web3Enable } = await import('@polkadot/extension-dapp');

  // Enable extension
  const extensions = await web3Enable('PolkaMesh');

  if (extensions.length === 0) {
    throw new Error('No Polkadot.js extension found. Please install it first.');
  }

  // Get accounts
  const accounts = await web3Accounts();

  if (accounts.length === 0) {
    throw new Error('No accounts found in wallet.');
  }

  return accounts;
}

/**
 * Get signer for an account
 */
export async function getSigner(address: string) {
  if (!isBrowser) {
    throw new Error('Signer is only available in the browser');
  }

  // Dynamically import extension-dapp (client-side only)
  const { web3FromAddress } = await import('@polkadot/extension-dapp');

  const injector = await web3FromAddress(address);
  return injector.signer;
}

/**
 * Get account balance
 */
export async function getBalance(address: string): Promise<string> {
  const api = getApi();
  const { data: balance }: any = await api.query.system.account(address);
  return balance.free.toString();
}

/**
 * Format balance from blockchain units to human-readable
 */
export function formatBalance(balance: string, decimals: number = 12): string {
  const num = BigInt(balance);
  const divisor = BigInt(10 ** decimals);
  const whole = num / divisor;
  const fraction = num % divisor;
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 4);
  return `${whole}.${fractionStr}`;
}

/**
 * Parse human-readable amount to blockchain units
 */
export function parseAmount(amount: string, decimals: number = 12): string {
  const [whole, fraction = '0'] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0');
  return (BigInt(whole) * BigInt(10 ** decimals) + BigInt(paddedFraction)).toString();
}

/**
 * Create contract instance
 */
export async function getContract(
  contractKey: keyof typeof contracts,
  abi: any
): Promise<ContractPromise> {
  const api = getApi();
  const contractInfo = contracts[contractKey];
  return new ContractPromise(api, abi, contractInfo.address);
}

/**
 * Disconnect from blockchain
 */
export async function disconnect() {
  if (api) {
    await api.disconnect();
    api = null;
  }
}
