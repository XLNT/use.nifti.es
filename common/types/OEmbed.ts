export enum NoEmbedType {
  Video = 'video',
  // TODO: others
}

export enum NoEmbedProviderName {
  YouTube = 'YouTube',
  // TODO: others
}

export interface NoEmbedData {
  version: string;
  type: NoEmbedType;
  provider_name: NoEmbedProviderName;
  url: string;
  html: string;
  title: string;
  height: number;
  width: number;
  provider_url: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  author_name: string;
  author_url: string;
}
