import { BigNumberish, utils } from 'ethers';
import { proxyThroughPublicGateway } from 'server/lib/ipfs';

// https://eips.ethereum.org/EIPS/eip-1155
export function resolveURIWithTokenId(uri: string, tokenId: BigNumberish) {
  const paddedTokenId = utils.hexZeroPad(utils.arrayify(tokenId), 32).replace('0x', '');
  // NOTE: replaceAll is not supported by nodejs12 (vercel runtime) so use global .replace instead
  return uri.replace(/\{id\}/gi, paddedTokenId);
}

// https://eips.ethereum.org/EIPS/eip-1155
export function resolveURIWithLocale(uri: string, locale: string) {
  return uri.replace(/\{locale\}/gi, locale);
}

export function resolveURI(uri: string, tokenId: BigNumberish, locale: string) {
  return resolveURIWithLocale(resolveURIWithTokenId(uri, tokenId), locale);
}

export function rewriteToHTTPIfPossible(uri: string) {
  if (!uri) return uri;

  if (uri.startsWith('http://')) return uri;
  if (uri.startsWith('https://')) return uri;
  if (uri.startsWith('ipfs://')) return proxyThroughPublicGateway(uri);

  return uri;
}
