import { parseIdentifier } from 'common/lib/parseIdentifier';
import { stringifyIdentifier } from 'common/lib/stringifyIdentifier';
import { isAssetIDReference } from 'common/types/AssetReference';
import { AssetCollectionResult, AssetMetadataResult } from 'common/types/Responses';

import { mapToRender } from './lib/mapToRender';
import { cache } from './lib/metaCache';
import { resolveAssetMetadata } from './lib/metadata';
import { getCollection } from './lib/opensea';
import { fetchAssetOwnerships } from './lib/ownership';

export async function resolve(
  id: string,
  locale = 'en',
): Promise<AssetMetadataResult | AssetCollectionResult> {
  // parse the identifier from the passed string
  const identifier = parseIdentifier(id);
  const normalizedIdString = stringifyIdentifier(identifier);
  const key = `${normalizedIdString}-${locale}`;

  if (isAssetIDReference(identifier)) {
    const metadata = await cache.maybe(`m-${key}`, () => {
      return resolveAssetMetadata(identifier, locale);
    });

    const ownerships = await cache.maybe(`o-${key}`, () => {
      return fetchAssetOwnerships(identifier);
    });

    const render = await cache.maybe(`r-${key}`, () => {
      return mapToRender(identifier, metadata);
    });

    return {
      render,
      ownerships,
      metadata,
    };
  } else {
    const opensea = await cache.maybe(`c-${key}`, () => getCollection(identifier));

    return {
      name: opensea.name,
      description: opensea.description,
      opensea,
    };
  }
}
