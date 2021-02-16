type Address = string;

enum AssetContractType {
  Fungible = 'fungible',
  NonFungible = 'non-fungible',
  SemiFungible = 'semi-fungible',
}

enum SchemaName {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

interface Trait {
  min: string;
  max: string;
}

interface Stats {
  seven_day_volume: number;
  total_volume: number;
  seven_day_change: number;
  seven_day_sales: number;
  total_sales: number;
  total_supply: number;
  count: number;
  num_owners: number;
  seven_day_average_price: number;
  average_price: number;
  market_cap: number;
}

enum CardDisplayStyle {
  Padded = 'padded',
  Contain = 'contain',
  Cover = 'cover',
}

enum SafelistRequestStatus {
  NotRequested = 'not_requested',
  Approved = 'approved',
}

export interface OpenSeaCollection {
  slug: string;
  name: string;
  description: null | string;
  short_description: null | string;

  image_url: null | string;
  large_image_url: null | string;
  banner_image_url: null | string;

  external_url: null | string;
  chat_url: null | string;
  default_to_fiat: boolean;
  discord_url: null | string;
  telegram_url: null | string;
  twitter_username: null | string;
  wiki_url: null | string;
  medium_username: null | string;

  traits: { [key: string]: Trait };
  stats: Stats;

  display_data: {
    card_display_style: CardDisplayStyle;
    images: string[];
  };

  featured: boolean;
  featured_image_url: null | string;
  hidden: boolean;
  safelist_request_status: SafelistRequestStatus;
  is_subject_to_whitelist: boolean;

  only_proxied_transfers: boolean;
  dev_buyer_fee_basis_points: number | string;
  dev_seller_fee_basis_points: number | string;
  opensea_buyer_fee_basis_points: number | string;
  opensea_seller_fee_basis_points: number | string;
  payout_address: null | string;
  require_email: boolean;

  owned_asset_count: number | string;

  created_date: string;
}

export interface OpenSeaAssetContract {
  collection: OpenSeaCollection;

  address: Address;
  asset_contract_type: AssetContractType;
  created_date: string;
  name: string;
  nft_version: null | string;
  opensea_version: null | string;
  owner: null | number;
  schema_name: SchemaName;
  symbol: string;
  total_supply: null | number | string;
  description: null | string;
  external_link: null | string;
  image_url: null | string;
  default_to_fiat: boolean;
  dev_buyer_fee_basis_points: number;
  dev_seller_fee_basis_points: number;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: number;
  opensea_seller_fee_basis_points: number;
  buyer_fee_basis_points: number;
  seller_fee_basis_points: number;
  payout_address: null | string;
}

export interface OpenSeaAsset {
  token_id: string;
  background_color: null | string; // a2c2eb
  image_url: null | string;
  image_preview_url: null | string;
  image_thumbnail_url: null | string;
  image_original_url: null | string;
  animation_url: null | string;
  youtube_url: null | string;
  animation_original_url: null;
  name: string;
  description: string;
  external_link: null | string;
  asset_contract: OpenSeaAssetContract;
  permalink: null | string;
  collection: OpenSeaCollection;
  decimals: null | number;
  sell_orders: null;
  traits: {
    trait_type: string;
    value: string;
    display_type: null;
    max_value: null;
    trait_count: number;
    order: null;
  }[];
  last_sale: any;
  top_bid: null;
  listing_date: null;
  is_presale: false;
  transfer_fee_payment_token: null;
  transfer_fee: null;
  related_assets: any[];
  orders: any[];
  auctions: null;
  supports_wyvern: true;
  ownership: null;
  highest_buyer_commitment: null;
}
