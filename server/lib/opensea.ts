import { CAIP3NetworkId, MAINNET_NETWORK_ID, RINKEBY_NETWORK_ID } from 'common/lib/CAIP3';
import { AssetID, AssetType } from 'common/types/AssetReference';
import { OpenSeaAsset, OpenSeaAssetContract } from 'common/types/OpenSea';

import { fetchURI } from './fetchers';

const BASE_URL = {
  [MAINNET_NETWORK_ID]: 'https://api.opensea.io/api/v1',
  [RINKEBY_NETWORK_ID]: 'https://rinkeby-api.opensea.io/api/v1',
};

export function canFetchOpenSea(chainId: CAIP3NetworkId) {
  return Object.keys(BASE_URL).includes(chainId);
}

export async function getCollection({
  chainId,
  assetReference,
}: AssetType): Promise<OpenSeaAssetContract> {
  if (!canFetchOpenSea(chainId)) return undefined;

  const data = await fetchURI<OpenSeaAssetContract>(
    `${BASE_URL[chainId]}/asset_contract/${assetReference}`,
  );

  return data;
}

export async function getAsset({
  chainId,
  assetReference,
  tokenId,
}: AssetID): Promise<OpenSeaAsset> {
  if (!canFetchOpenSea(chainId)) return undefined;

  const data = await fetchURI<OpenSeaAsset>(
    `${BASE_URL[chainId]}/asset/${assetReference}/${tokenId}`,
  );

  return data;
}
