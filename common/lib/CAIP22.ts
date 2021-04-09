import { BigNumber, ethers, utils } from 'ethers';

import { CAIP3ChainId } from './CAIP3';
import { CAIP19AssetType } from './CAIP19';

// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-22.md#erc721-asset-namespace
export type CAIP22AssetNamespace = 'erc721';

export const isCAIP22AssetNamespace = (
  assetNamespace: string,
): assetNamespace is CAIP22AssetNamespace => assetNamespace === 'erc721';

// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-22.md#asset-reference-definition
export type CAIP22AssetReference = string;

export const isCAIP22AssetReference = (
  assetReference: string,
): assetReference is CAIP22AssetReference => utils.isAddress(assetReference);

// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-22.md#token-id-definition
export type CAIP22TokenID = BigNumber;

export const isCAIP22TokenID = (tokenId: any): tokenId is CAIP22TokenID =>
  ethers.BigNumber.isBigNumber(tokenId);

export interface CAIP22AssetType extends CAIP19AssetType {
  chainId: CAIP3ChainId;
  assetNamespace: CAIP22AssetNamespace;
  assetReference: CAIP22AssetReference;
}

export interface CAIP22AssetID extends CAIP22AssetType {
  tokenId: CAIP22TokenID;
}

export const isCAIP22AssetID = (assetId: any): assetId is CAIP22AssetID => !!assetId.tokenId;
