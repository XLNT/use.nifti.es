import { Agent, NftMetadata } from '@zoralabs/nft-metadata';
import { AssetId } from 'caip';
import { ethers } from 'ethers';

export async function resolve(id: string): Promise<NftMetadata> {
  const assetId = new AssetId(id);

  const provider = new ethers.providers.InfuraProvider(
    parseInt(assetId.chainId.reference),
    process.env.INFURA_PROJECT_ID,
  );

  const parser = new Agent({ provider });

  return await parser.fetchMetadata(assetId.assetName.reference, assetId.tokenId);
}
