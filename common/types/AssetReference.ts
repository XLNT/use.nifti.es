import { CAIP22AssetID, CAIP22AssetType, isCAIP22AssetID } from 'common/lib/CAIP22';
import { CAIPXXAssetID, CAIPXXAssetType, isCAIPXXAssetID } from 'common/lib/CAIPXX';
import {
  isKittiesAndPunksAssetID,
  KittiesAndPunksAssetID,
  KittiesAndPunksAssetType,
} from 'common/lib/KittiesAndPunks';

export type AssetType = CAIP22AssetType | CAIPXXAssetType | KittiesAndPunksAssetType;
export type AssetID = CAIP22AssetID | CAIPXXAssetID | KittiesAndPunksAssetID;
export type AnyID = AssetType | AssetID;

export function isAssetIDReference(reference: AnyID): reference is AssetID {
  return (
    isCAIP22AssetID(reference) || isCAIPXXAssetID(reference) || isKittiesAndPunksAssetID(reference)
  );
}
