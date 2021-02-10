import { CAIP22AssetID } from 'common/lib/CAIP22';
import { CAIPXXAssetID } from 'common/lib/CAIPXX';
import { ethers } from 'ethers';

// ERC721 / ERC1155 Metadata Standard & Extension
export interface AssetMetadata {
  name: string;
  description?: string;
  decimals?: number;
  image?: string;
}

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

export async function getAssetMetadata({
  chainId,
  assetNamespace,
  assetReference,
  tokenId,
}: CAIP22AssetID | CAIPXXAssetID): Promise<AssetMetadata> {
  // TODO: validate chain Ids
  const ethereumChainId = parseInt(chainId.split(':')[1]);
  const provider = new ethers.providers.InfuraProvider(
    ethereumChainId,
    process.env.INFURA_PROJECT_ID,
  );

  // TODO: handle cryptokitties as an assetNamespace

  const contract = new ethers.Contract(
    assetReference,
    assetNamespace === 'erc721' ? ERC721Abi : ERC1155Abi,
    provider,
  );

  const [uri]: [string] =
    assetNamespace === 'erc721'
      ? await contract.functions.tokenURI(tokenId)
      : await contract.functions.uri(tokenId);

  // substitution
  const padded = ethers.utils.hexZeroPad(ethers.utils.arrayify(tokenId), 64).replace('0x', '');
  const resolved = uri.replace('{id}', padded);

  // now fetch that uri
  // TODO: URI decoder to support ipfs, etc
  const response = await fetch(resolved, {
    headers: {
      'User-Agent': 'use.nifti.es/1.0.0',
    },
  });

  const data = await response.json();

  return data as AssetMetadata;
}
