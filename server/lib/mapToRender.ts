import { AssetMetadata } from 'common/types/AssetMetadata';
import { AssetID } from 'common/types/AssetReference';
import { RenderAsset, RenderType } from 'common/types/Render';

import { getOEmbedData } from './oembed';

const getAlt = (metadata: AssetMetadata) =>
  [metadata.name, metadata.description].filter(Boolean).join(' — ');

function renderGenericImage(metadata: AssetMetadata): RenderAsset {
  return {
    type: RenderType.Image,
    src: metadata.image,
    alt: getAlt(metadata),
    sources: [{ src: metadata.image }],
  };
}

export async function mapToRender(
  reference: AssetID,
  metadata: AssetMetadata,
): Promise<RenderAsset> {
  if (!metadata) return { type: RenderType.Empty };

  // handle opensea youtube urls
  if (metadata.youtube_url) {
    const data = await getOEmbedData(metadata.youtube_url);

    return {
      type: RenderType.OEmbed,
      data,
    };
  }

  return renderGenericImage(metadata);
}
