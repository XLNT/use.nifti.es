// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-3.md
export type CAIP3NetworkId = string;

export const MAINNET_NETWORK_ID = 'eip155:1';
export const RINKEBY_NETWORK_ID = 'eip155:4';
export const GORLI_NETWORK_ID = 'eip155:5';

// TODO: make this more generic
export const isCAIP3NetworkId = (networkId: string): networkId is CAIP3NetworkId =>
  [MAINNET_NETWORK_ID, RINKEBY_NETWORK_ID, GORLI_NETWORK_ID].includes(networkId);
