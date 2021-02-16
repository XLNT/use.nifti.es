import { rewriteToHTTPIfPossible } from 'common/lib/uri';

export type Fetcher = <T>(uri: string) => Promise<T>;

export const isHTTPURI = (uri: string) => uri.startsWith('http://') || uri.startsWith('https://');
export const isIPFSURI = (uri: string) => uri.startsWith('ipfs://');
export const canFetchURI = (uri: string) => isHTTPURI(uri) || isIPFSURI(uri);

const fetchHTTP: Fetcher = async (uri: string) => {
  const response = await fetch(uri, { headers: { 'User-Agent': 'use.nifti.es/1.0.0' } });

  if (!response.ok) throw new Error(`Invalid response: ${response.statusText}`);
  const data = await response.json();

  return data;
};

const fetchIPFS: Fetcher = async (uri: string) => {
  return fetchHTTP(rewriteToHTTPIfPossible(uri));
};

export const fetchURI: Fetcher = async (uri: string) => {
  if (isHTTPURI(uri)) return fetchHTTP(uri);
  if (isIPFSURI(uri)) return fetchIPFS(uri);

  throw new Error(`Unable to fetch uri: ${uri}`);
};
