import { encodeCAIP10AccountId } from 'common/lib/CAIP10';
import { AssetID } from 'common/types/AssetReference';
import { Owner } from 'common/types/Owner';

import { getAsset } from './opensea';

// NOTE: this assumes a lot of eth-specific functionality
export async function fetchAssetOwner(identifier: AssetID): Promise<Owner> {
  const { chainId } = identifier;

  // for now, just use opensea
  const asset = await getAsset(identifier);
  if (!asset?.owner) return undefined;

  return {
    id: encodeCAIP10AccountId({ accountAddress: asset.owner.address, chainId }),
    handle: asset.owner.user.username,
    img: asset.owner.profile_img_url,
  };
}
