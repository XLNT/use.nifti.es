import { AnyID } from 'common/types/AssetReference';
import { ethers } from 'ethers';

import { isCAIP3NetworkId } from './CAIP3';
import {
  CAIP22TokenID,
  isCAIP22AssetNamespace,
  isCAIP22AssetReference,
  isCAIP22TokenID,
} from './CAIP22';
import {
  CAIPXXTokenID,
  isCAIPXXAssetNamespace,
  isCAIPXXAssetReference,
  isCAIPXXTokenID,
} from './CAIPXX';
import {
  isKittiesAndPunksAssetNamespace,
  isKittiesAndPunksAssetReference,
} from './KittiesAndPunks';

// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-19.md
export function parseIdentifier(id: string): AnyID {
  if (!id) throw new Error('No ID provided.');

  const [chainId, assetIdentifier, _tokenId] = id.split('/');

  if (!isCAIP3NetworkId(chainId)) {
    throw new Error(`${chainId} is not a valid CAIP-3 Network Id`);
  }

  const [assetNamespace, assetReference] = assetIdentifier.split(':');

  if (
    !isCAIP22AssetNamespace(assetNamespace) &&
    !isCAIPXXAssetNamespace(assetNamespace) &&
    !isKittiesAndPunksAssetNamespace(assetNamespace)
  ) {
    throw new Error(
      `${assetNamespace} is not a valid CAIP-22, CAIP-XX, Kitty, or Punk Asset Namespace`,
    );
  }

  if (
    !isCAIP22AssetReference(assetReference) &&
    !isCAIPXXAssetReference(assetReference) &&
    !isKittiesAndPunksAssetReference(assetReference)
  ) {
    throw new Error(`${assetReference} is not a valid CAIP-22 or CAIP-XX Asset Reference`);
  }

  let tokenId: CAIP22TokenID | CAIPXXTokenID;
  if (_tokenId !== undefined) {
    tokenId = ethers.BigNumber.from(_tokenId);
    if (!isCAIP22TokenID(tokenId) && !isCAIPXXTokenID(tokenId)) {
      throw new Error(`${tokenId} is not a valid CAIP-22 or CAIP-XX Token Id`);
    }
  }

  return {
    chainId,
    assetNamespace,
    assetReference,
    tokenId,
  };
}
