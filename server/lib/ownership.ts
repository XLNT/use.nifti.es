import { encodeCAIP10AccountId } from 'common/lib/CAIP10';
import { AssetID } from 'common/types/AssetReference';
import { AssetOwnerships } from 'common/types/Ownership';

import { getAsset } from './opensea';

// NOTE: this assumes a lot of eth-specific functionality
export async function fetchAssetOwnerships(identifier: AssetID): Promise<AssetOwnerships> {
  const { chainId } = identifier;

  // for now, just use opensea
  const asset = await getAsset(identifier);

  // null = unowned?
  if (!asset.top_ownerships) return null;
  if (asset.top_ownerships.length === 0) return null;

  return asset.top_ownerships.map((ownership) => ({
    owner: {
      id: encodeCAIP10AccountId({ accountAddress: ownership.owner.address, chainId }),
      handle: ownership.owner.user.username,
      image: ownership.owner.profile_img_url,
    },
    balance: ownership.quantity,
  }));
}
