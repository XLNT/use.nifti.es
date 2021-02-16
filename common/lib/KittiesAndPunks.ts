import { CAIP3NetworkId } from './CAIP3';
import { CAIP19AssetType } from './CAIP19';
import { CAIP22TokenID, isCAIP22AssetReference, isCAIP22TokenID } from './CAIP22';

// represents a potential CAIP for identifying CryptoKitties, CryptoPunks

export type KittiesAndPunksAssetNamespace = 'cryptokitties' | 'cryptopunks';

export const isKittiesAndPunksAssetNamespace = (
  assetNamespace: string,
): assetNamespace is KittiesAndPunksAssetNamespace =>
  ['cryptokitties', 'cryptopunks'].includes(assetNamespace);

export type KittiesAndPunksAssetReference = string;

export const isKittiesAndPunksAssetReference = (
  assetReference: string,
): assetReference is KittiesAndPunksAssetReference => isCAIP22AssetReference(assetReference);

export type KittiesAndPunksTokenID = CAIP22TokenID;

export const isKittiesAndPunksTokenID = (tokenId: any): tokenId is KittiesAndPunksTokenID =>
  isCAIP22TokenID(tokenId);

export interface KittiesAndPunksAssetType extends CAIP19AssetType {
  chainId: CAIP3NetworkId;
  assetNamespace: KittiesAndPunksAssetNamespace;
  assetReference: KittiesAndPunksAssetReference;
}

export interface KittiesAndPunksAssetID extends KittiesAndPunksAssetType {
  tokenId: KittiesAndPunksTokenID;
}

export const isKittiesAndPunksAssetID = (assetId: any): assetId is KittiesAndPunksAssetID =>
  !!assetId.tokenId;
