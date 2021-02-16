interface AssetMetadataTrait {
  // opensea, artblocks
  trait_type: string;
  value: string;

  // opensea
  display_type?: null;
  max_value?: null;
  trait_count?: number;
  order?: null;
}

interface AssetMetadataAttribute {
  key: string;
  trait_type: string; // usually === key? idk
  value: string;
}

// ERC721 / ERC1155 Metadata Standard & Extension
// TODO: maybe make this a union type on platform-specific schemas
// NOTE: only include properties relevant to authorial intent display
export interface AssetMetadata {
  // the officially supported well-specified fields
  name: string;
  description?: string;
  decimals?: number;
  image?: string;

  // opensea 'standard'
  external_url?: string;
  youtube_url?: string;
  animation_url?: string;
  background_color?: string;
  traits?: AssetMetadataTrait[];
  attributes?: AssetMetadataAttribute[];

  // artblocks
  // features?: string[];
}
