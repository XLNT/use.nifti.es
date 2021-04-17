import { encodeCAIP10AccountId } from 'common/lib/CAIP10';
import { AssetID } from 'common/types/AssetReference';
import { OpenSeaAsset } from 'common/types/OpenSea';
import { AssetOwnerships } from 'common/types/Ownership';

import { getAsset } from './opensea';

// NOTE: this assumes a lot of eth-specific functionality
export async function fetchAssetOwnerships(identifier: AssetID): Promise<AssetOwnerships> {
  const { chainId } = identifier;

  // for now, just use opensea
  let asset: OpenSeaAsset;
  try {
    asset = await getAsset(identifier);
  } catch (error) {
    // error fetching opensea data, we can assume that nobody owns this token yet, so opensea
    // doesn't know about it
    // but log it anyway
    console.error(error);
    return null;
  }

  // null = unowned?
  if (!asset.top_ownerships) return null;
  if (asset.top_ownerships.length === 0) return null;

  return asset.top_ownerships.map((ownership) => ({
    owner: {
      id: encodeCAIP10AccountId({ accountAddress: ownership.owner.address, chainId }),
      handle: ownership.owner.user?.username,
      image: ownership.owner.profile_img_url,
    },
    balance: ownership.quantity,
  }));
}
