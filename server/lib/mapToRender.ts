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

  // TODO: what metadata schema is used for videos (not animated loops?)
  if (metadata.animation_url) {
    // TODO: true url parse
    const parts = metadata.animation_url.split('.');
    const ext = parts.length > 0 ? parts[parts.length - 1] : undefined;
    if (ext === 'gif') {
      // these are actually generic images in disguise, and we make sure to use the animation
      // url as the primary image
      return renderGenericImage({ ...metadata, image: metadata.animation_url });
    }

    return {
      type: RenderType.Video,
      animated: true,
      poster: metadata.image,
      sources: [{ src: metadata.animation_url }],
    };
  }

  return renderGenericImage(metadata);
}
