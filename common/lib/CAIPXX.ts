import { CAIP3NetworkId } from './CAIP3';
import { CAIP19AssetType } from './CAIP19';
import { CAIP22TokenID, isCAIP22AssetReference, isCAIP22TokenID } from './CAIP22';

// represents a potential CAIP for identifying ERC1155 assets

export type CAIPXXAssetNamespace = 'erc1155';

export const isCAIPXXAssetNamespace = (
  assetNamespace: string,
): assetNamespace is CAIPXXAssetNamespace => assetNamespace === 'erc1155';

export type CAIPXXAssetReference = string;

export const isCAIPXXAssetReference = (
  assetReference: string,
): assetReference is CAIPXXAssetReference => isCAIP22AssetReference(assetReference);

export type CAIPXXTokenID = CAIP22TokenID;

export const isCAIPXXTokenID = (tokenId: any): tokenId is CAIPXXTokenID => isCAIP22TokenID(tokenId);

export interface CAIPXXAssetType extends CAIP19AssetType {
  chainId: CAIP3NetworkId;
  assetNamespace: CAIPXXAssetNamespace;
  assetReference: CAIPXXAssetReference;
}

export interface CAIPXXAssetID extends CAIPXXAssetType {
  tokenId: CAIPXXTokenID;
}

export const isCAIPXXAssetID = (assetId: any): assetId is CAIPXXAssetID => !!assetId.tokenId;
