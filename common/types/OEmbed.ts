export enum NoEmbedType {
  Video = 'video',
}

export enum NoEmbedProviderName {
  YouTube = 'YouTube',
}

export interface NoEmbedData {
  version: string;
  type: NoEmbedType;
  provider_name: NoEmbedProviderName;
  url: string;
  html: string;
  title: string;
  height: 113;
  width: 200;
  provider_url: string;
  thumbnail_url: string;
  thumbnail_width: 480;
  thumbnail_height: 360;
  author_name: string;
  author_url: string;
}
