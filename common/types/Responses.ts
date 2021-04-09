import { AssetMetadata } from './AssetMetadata';
import { OpenSeaAssetContract } from './OpenSea';
import { Owner } from './Owner';
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
  owner?: Owner;
  metadata: AssetMetadata;
}
