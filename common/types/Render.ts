import { NoEmbedData } from './OEmbed';

export enum RenderType {
  Empty = 'empty', // we have no information to display
  Image = 'image', // <img /> and <picture /> rendering
  Animated = 'animated', // html5 gifs aka `<video autoPlay loop muted playsInline controls={false} disablePictureInPicture />`
  Video = 'video', // <video /> rendering for mp4, webm, etc
  OEmbed = 'oembed', // an oEmbed-compatible embed, see https://oembed.com/
  Audio = 'audio', // <audio /> rendering for mp3, wav, ogg, etc
  SVG = 'svg', // <svg /> rendering
  Model = 'model', // <model-viewer /> rendering for gltf / glb files
}

// corresponds to the html5 <source /> tag
// we support a subset of the source properties, primarily to handle multiple source types
// TODO: support resolution switching in srcset
interface Source {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture#the_srcset_attribute
  src: string;
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture#the_type_attribute
  type?: string;
}

export interface RenderEmpty {
  type: RenderType.Empty;
}

export interface RenderImage {
  type: RenderType.Image;
  src: string;
  alt: string;
  sources: Source[];
  backgroundColor?: string;
}

export interface RenderVideo {
  type: RenderType.Video;
  sources: Source[];
  backgroundColor?: string;
}

export interface RenderAnimated {
  type: RenderType.Animated;
  sources: Source[];
  backgroundColor?: string;
}

export interface RenderOEmbed {
  type: RenderType.OEmbed;
  data: NoEmbedData;
}

export interface RenderAudio {
  type: RenderType.Audio;
}

export interface RenderSVG {
  type: RenderType.SVG;
}

// here we only provide properties of expected authorial intent that should be respected by renderers
// and assume that the platform determines other properties
// https://modelviewer.dev/docs/
export interface RenderModel {
  type: RenderType.Model;
  // https://modelviewer.dev/docs/#loading-attributes
  src: string;
  alt: string;
  poster?: string;
  posterColor?: string;
  // https://modelviewer.dev/docs/#augmentedreality-attributes
  ar: boolean;
  iosSrc?: string;
  arPlacement?: 'floor' | 'wall';
  // https://modelviewer.dev/docs/#lightingandenv-attributes
  skyboxImage?: string;
}

export type RenderAsset =
  | RenderEmpty
  | RenderImage
  | RenderAnimated
  | RenderVideo
  | RenderOEmbed
  | RenderAudio
  | RenderSVG
  | RenderModel;
