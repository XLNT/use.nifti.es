import { CAIP3NetworkId, MAINNET_NETWORK_ID, RINKEBY_NETWORK_ID } from 'common/lib/CAIP3';
import { CAIP22AssetID, CAIP22AssetType } from 'common/lib/CAIP22';
import { CAIPXXAssetID, CAIPXXAssetType } from 'common/lib/CAIPXX';
import { OpenSeaAssetContract } from 'common/lib/OpenSeaCollection';

const BASE_URL = {
  [MAINNET_NETWORK_ID]: 'https://api.opensea.io/api/v1',
  [RINKEBY_NETWORK_ID]: 'https://rinkeby-api.opensea.io/api/v1/',
};

export function canFetchOpenSea(chainId: CAIP3NetworkId) {
  return Object.keys(BASE_URL).includes(chainId);
}

export async function getCollection({
  chainId,
  assetReference,
}: CAIP22AssetType | CAIPXXAssetType): Promise<OpenSeaAssetContract> {
  if (!canFetchOpenSea(chainId)) return undefined;

  const response = await fetch(`https://api.opensea.io/api/v1/asset_contract/${assetReference}`, {
    headers: {
      'User-Agent': 'use.nifti.es/1.0.0',
    },
  });

  const data = await response.json();

  return data;
}

export async function getAsset({
  chainId,
  assetReference,
  tokenId,
}: CAIP22AssetID | CAIPXXAssetID): Promise<any> {
  if (!canFetchOpenSea(chainId)) return undefined;

  const response = await fetch(`https://api.opensea.io/api/v1/asset/${assetReference}/${tokenId}`, {
    headers: {
      'User-Agent': 'use.nifti.es/1.0.0',
    },
  });

  const data = await response.json();

  return data;
}
