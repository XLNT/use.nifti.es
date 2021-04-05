import { parseIdentifier } from 'common/lib/parseIdentifier';
import { isAssetIDReference } from 'common/types/AssetReference';
import { AssetCollectionResult, AssetMetadataResult } from 'common/types/Responses';

import { mapToRender } from './lib/mapToRender';
import { cache } from './lib/metaCache';
import { resolveAssetMetadata } from './lib/metadata';
import { getCollection } from './lib/opensea';

export async function resolve(
  id: string,
  locale = 'en',
): Promise<AssetMetadataResult | AssetCollectionResult> {
  // parse the identifier from the passed string
  const identifier = parseIdentifier(id);

  if (isAssetIDReference(identifier)) {
    const metadataKey = `${id}-${locale}`;
    const metadata = await cache.maybe(`m-${metadataKey}`, () => {
      return resolveAssetMetadata(identifier, locale);
    });

    const render = await cache.maybe(`r-${metadataKey}`, () => {
      return mapToRender(identifier, metadata);
    });

    return {
      render,
      metadata,
    };
  } else {
    const opensea = await cache.maybe(`c-${id}`, () => getCollection(identifier));

    return {
      name: opensea.name,
      description: opensea.description,
      opensea,
    };
  }
}
