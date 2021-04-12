export interface Owner {
  id: string; // a CAIP-10 account id
  handle?: string; // a chain-specific or application-specific human-readable handle (i.e. ENS, OpenSea)
  image?: string; // a user's profile image, if exists
}

export interface Ownership {
  owner: Owner;
  balance: string; // BigNumberish
}

export type AssetOwnerships = Ownership[];
