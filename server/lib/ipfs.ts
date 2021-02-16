export function proxyThroughPublicGateway(uri: string) {
  return uri.replace('ipfs://', 'https://ipfs.io/');
}
