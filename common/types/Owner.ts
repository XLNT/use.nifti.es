export interface Owner {
  id: string; // a CAIP-10 account id
  handle?: string; // a chain-specific or application-specific human-readable handle (i.e. ENS, OpenSea)
  img?: string; // a user's profile image, if exists
}
