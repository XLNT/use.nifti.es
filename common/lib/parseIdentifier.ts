import { AnyID } from 'common/types/AssetReference';
import { ethers } from 'ethers';

import { isCAIP3ChainId } from './CAIP3';
import {
  CAIP22TokenID,
  isCAIP22AssetNamespace,
  isCAIP22AssetReference,
  isCAIP22TokenID,
} from './CAIP22';
import {
  CAIP29TokenID,
  isCAIP29AssetNamespace,
  isCAIP29AssetReference,
  isCAIP29TokenID,
} from './CAIP29';
import {
  isKittiesAndPunksAssetNamespace,
  isKittiesAndPunksAssetReference,
} from './KittiesAndPunks';

// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-19.md
export function parseIdentifier(id: string): AnyID {
  if (!id) throw new Error('No ID provided.');

  const [chainId, assetIdentifier, _tokenId] = id.split('/');

  if (!isCAIP3ChainId(chainId)) {
    throw new Error(`${chainId} is not a valid CAIP-3 Network Id`);
  }

  const [assetNamespace, assetReference] = assetIdentifier.split(':');

  if (
    !isCAIP22AssetNamespace(assetNamespace) &&
    !isCAIP29AssetNamespace(assetNamespace) &&
    !isKittiesAndPunksAssetNamespace(assetNamespace)
  ) {
    throw new Error(
      `${assetNamespace} is not a valid CAIP-22, CAIP-29, Kitty, or Punk Asset Namespace`,
    );
  }

  if (
    !isCAIP22AssetReference(assetReference) &&
    !isCAIP29AssetReference(assetReference) &&
    !isKittiesAndPunksAssetReference(assetReference)
  ) {
    throw new Error(`${assetReference} is not a valid CAIP-22 or CAIP-29 Asset Reference`);
  }

  let tokenId: CAIP22TokenID | CAIP29TokenID;
  if (_tokenId !== undefined) {
    try {
      tokenId = ethers.BigNumber.from(_tokenId);
    } catch (error) {
      throw new Error(`'${_tokenId}' is not a valid CAIP-19 Token Id`);
    }

    if (!isCAIP22TokenID(tokenId) && !isCAIP29TokenID(tokenId)) {
      throw new Error(`${tokenId} is not a valid CAIP-22 or CAIP-29 Token Id`);
    }
  }

  return {
    chainId,
    assetNamespace,
    assetReference,
    tokenId,
  };
}
