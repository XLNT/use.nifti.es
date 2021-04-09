// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-3.md
export type CAIP3ChainId = string;

export const MAINNET_NETWORK_ID = 'eip155:1';
export const RINKEBY_NETWORK_ID = 'eip155:4';
export const GORLI_NETWORK_ID = 'eip155:5';
export const MATIC_NETWORK_ID = 'eip155:137';

// TODO: make this more generic
export const isCAIP3ChainId = (chainId: string): chainId is CAIP3ChainId =>
  [MAINNET_NETWORK_ID, RINKEBY_NETWORK_ID, GORLI_NETWORK_ID, MATIC_NETWORK_ID].includes(chainId);
