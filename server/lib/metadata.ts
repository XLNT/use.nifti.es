import { MAINNET_NETWORK_ID, MATIC_NETWORK_ID, RINKEBY_NETWORK_ID } from 'common/lib/CAIP3';
import { resolveURI, resolveURIWithTokenId, rewriteToHTTPIfPossible } from 'common/lib/uri';
import { AssetMetadata } from 'common/types/AssetMetadata';
import { AssetID } from 'common/types/AssetReference';
import { ethers } from 'ethers';

import { canFetchURI, fetchURI } from './fetchers';
import { getAsset } from './opensea';

const ERC721Abi = [
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const ERC1155Abi = [
  {
    inputs: [{ internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ internalType: 'string', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const VALID_INFURA_NETWORK_IDS = [MAINNET_NETWORK_ID, RINKEBY_NETWORK_ID];

function providerForChain(chainId: string) {
  if (chainId === MATIC_NETWORK_ID) {
    return new ethers.providers.JsonRpcProvider('https://rpc-mainnet.matic.network');
  }

  if (!VALID_INFURA_NETWORK_IDS.includes(chainId)) {
    throw new Error(`Chain with ID ${chainId} is not a valid Infura chain id.`);
  }

  const ethereumChainId = parseInt(chainId.split(':')[1]);

  return new ethers.providers.InfuraProvider(ethereumChainId, process.env.INFURA_PROJECT_ID);
}

async function fetchAssetMetadata(identifier: AssetID): Promise<AssetMetadata> {
  const { chainId, assetNamespace, assetReference, tokenId } = identifier;

  switch (assetNamespace) {
    case 'cryptopunks':
    case 'cryptokitties': {
      // in the case of punks and kitties, instead of actually respecting their interfaces, we're
      // just going to query the opensea API for that info, format it as a standard ERC721/1155
      // metadata payload, and call it a day
      const opensea = await getAsset(identifier);

      return {
        name: opensea.name,
        description: opensea.description,
        image: opensea.image_original_url,
        decimals: opensea.decimals,
        youtube_url: opensea.youtube_url,
        external_url: opensea.external_link,
        animation_url: opensea.animation_original_url,
        background_color: opensea.background_color,
      };
    }
    default: {
      // conform to the ERC 721 / 1155 Metadata client standard by fetching and resolving metadata
      const provider = providerForChain(chainId);

      // TODO: check for supportsInterface and ERC721 / ERC1155 interfaceIds
      // ERC721 = 0x5b5e139f, ERC1155 = 0x0e89341c

      const contract = new ethers.Contract(
        assetReference,
        assetNamespace === 'erc721' ? ERC721Abi : ERC1155Abi,
        provider,
      );

      let uri: string;

      try {
        [uri] =
          assetNamespace === 'erc721'
            ? await contract.functions.tokenURI(tokenId)
            : await contract.functions.uri(tokenId);
      } catch (error) {
        // TODO: differentiate between token does not exist & token does not support metadata standard
        throw new Error(`Error fetching metadata URI from chain: ${error.message}`);
      }

      if (!uri) {
        throw new Error(`No URI returned from contract ${identifier}`);
      }

      // substitution
      const resolved = resolveURIWithTokenId(uri, tokenId);

      if (!canFetchURI(uri)) {
        throw new Error(`Unsupported URI scheme ${resolved}`);
      }

      const data = await fetchURI<AssetMetadata>(resolved);

      return data;
    }
  }
}

// TODO: resolve locale references & merge into top-level
async function localizeMetadata(
  { tokenId }: AssetID,
  metadata: AssetMetadata,
  locale: string,
): Promise<AssetMetadata> {
  // metadata does not support localization
  if (!metadata.localization) return metadata;

  // use the client's locale, then the metadata default, then english.
  const _locale = locale ?? metadata.localization.default ?? 'en';

  // error, not a supported locale for this asset
  if (!metadata.localization.locales?.includes(_locale)) return metadata;

  // resolve that uri
  const localizedMetadataURI = resolveURI(metadata.localization.uri, tokenId, _locale);

  // load it
  const localizedMetadata = await fetchURI<Partial<AssetMetadata>>(localizedMetadataURI);

  // TODO: deepmerge?
  return { ...metadata, ...localizedMetadata };
}

async function proxyNonHTTPURIs(metadata: AssetMetadata): Promise<AssetMetadata> {
  return {
    ...metadata,
    image: rewriteToHTTPIfPossible(metadata.image),
    external_url: rewriteToHTTPIfPossible(metadata.external_url),
    animation_url: rewriteToHTTPIfPossible(metadata.animation_url),
  };
}

export async function resolveAssetMetadata(
  identifier: AssetID,
  locale: string,
): Promise<AssetMetadata> {
  const metadata = await fetchAssetMetadata(identifier);
  const localized = await localizeMetadata(identifier, metadata, locale);
  const proxied = await proxyNonHTTPURIs(localized);

  return proxied;
}
