import { resolveAlt } from 'common/resolveAlt';
import { AssetMetadata } from 'common/types/AssetMetadata';
import { AssetID } from 'common/types/AssetReference';
import { RenderAsset, RenderImage, RenderType } from 'common/types/Render';

import { getOEmbedData } from './oembed';

async function mapToGenericImage(metadata: AssetMetadata): Promise<RenderImage> {
  return {
    type: RenderType.Image,
    src: metadata.image,
    alt: await resolveAlt(metadata),
    sources: [{ src: metadata.image }],
  };
}

export const mapToFallback = (reference: AssetID, metadata: AssetMetadata) =>
  mapToGenericImage(metadata);

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
      fallback: {
        type: RenderType.Image,
        src: data.thumbnail_url,
        alt: await resolveAlt(metadata),
        sources: [{ src: data.thumbnail_url }],
      },
    };
  }

  const fallback = await mapToFallback(reference, metadata);

  // TODO: what metadata schema is used for videos (not animated loops?)
  if (metadata.animation_url) {
    // TODO: true url parse
    const parts = metadata.animation_url.split('.');
    const ext = parts.length > 0 ? parts[parts.length - 1] : undefined;
    if (ext === 'gif') {
      // these are actually generic images in disguise, and we make sure to use the animation
      // url as the primary image
      return {
        ...mapToGenericImage({ ...metadata, image: metadata.animation_url }),
        fallback,
      };
    }

    return {
      type: RenderType.Video,
      animated: true,
      poster: metadata.image,
      sources: [{ src: metadata.animation_url }],
      fallback,
    };
  }

  return {
    ...fallback,
    fallback,
  };
}
