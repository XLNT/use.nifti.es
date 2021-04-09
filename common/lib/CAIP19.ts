import { CAIP3ChainId } from './CAIP3';

// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-19.md#semantics
export type AssetNamespace = string;

// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-19.md#semantics
export type AssetReference = string;

// unspecified
export type TokenId = string;

// implements https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-19.md
export interface CAIP19AssetType {
  chainId: CAIP3ChainId;
  assetNamespace: AssetNamespace;
  assetReference: AssetReference;
}

// implements https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-19.md
export interface CAIP19AssetID extends CAIP19AssetType {
  tokenId: TokenId;
}

export const isCAIP19AssetID = (assetId: any): assetId is CAIP19AssetID => !!assetId.tokenId;
