import { Image, ImageProps } from '@chakra-ui/image';
import { RenderAsset } from 'common/types/Render';

export function RenderNiftyAsset({ render, ...delegated }: ImageProps & { render: RenderAsset }) {
  // TODO: render more than just images
  const renderData = render.type === 'image' ? render : render.fallback;

  if (!renderData) {
    return null;
  }

  // TODO: use picture element
  return (
    <Image
      {...delegated}
      src={renderData.src}
      alt={renderData.alt}
      objectFit="contain"
      objectPosition="center"
      pointerEvents="none"
      draggable={false}
    />
  );
}
