import { CAIP3ChainId } from './CAIP3';
import { CAIP19AssetType } from './CAIP19';
import { CAIP22TokenID, isCAIP22AssetReference, isCAIP22TokenID } from './CAIP22';

// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-29.md

export type CAIP29AssetNamespace = 'erc1155';

export const isCAIP29AssetNamespace = (
  assetNamespace: string,
): assetNamespace is CAIP29AssetNamespace => assetNamespace === 'erc1155';

export type CAIP29AssetReference = string;

export const isCAIP29AssetReference = (
  assetReference: string,
): assetReference is CAIP29AssetReference => isCAIP22AssetReference(assetReference);

export type CAIP29TokenID = CAIP22TokenID;

export const isCAIP29TokenID = (tokenId: any): tokenId is CAIP29TokenID => isCAIP22TokenID(tokenId);

export interface CAIP29AssetType extends CAIP19AssetType {
  chainId: CAIP3ChainId;
  assetNamespace: CAIP29AssetNamespace;
  assetReference: CAIP29AssetReference;
}

export interface CAIP29AssetID extends CAIP29AssetType {
  tokenId: CAIP29TokenID;
}

export const isCAIP29AssetID = (assetId: any): assetId is CAIP29AssetID => !!assetId.tokenId;
