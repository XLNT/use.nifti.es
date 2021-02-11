// how should this NFT be rendered, optimizing for specificity and web environments?
// opensea file types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
export enum RenderType {
  Image = 'image', // `<img />`, includes .gif filetypes
  Picture = 'picture', // webp
  Gif = 'gif', // `<video autoPlay loop muted playsInline controls={false} disablePictureInPicture />`, html5 gifs
  Video = 'video', // `<video />`
}

interface Source {
  srcset: string;
  media: string;
}

export interface RenderImage {
  type: RenderType.Image;
  src: string;
  alt: string;
}

export interface RenderPicture {
  type: RenderType.Picture;
  src: string;
  alt: string;
  sources: Source[];
}

export type Render = RenderImage | RenderPicture;
