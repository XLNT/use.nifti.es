import { AssetMetadata } from './AssetMetadata';
import { OpenSeaAssetContract } from './OpenSea';
import { AssetOwnerships } from './Ownership';
import { RenderAsset } from './Render';

// the collection an asset is a part of
export interface AssetCollectionResult {
  name: string;
  description: string;
  opensea: OpenSeaAssetContract;
}

// an individual asset
export interface AssetMetadataResult {
  render: RenderAsset;
  ownerships: AssetOwnerships;
  metadata: AssetMetadata;
}
