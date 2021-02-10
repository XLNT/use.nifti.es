import { NextApiResponse } from 'next';

// TODO: how long should responses be cached?
const CACHE_DURATION_SECONDS = 60 * 60;

export function setCacheControl(res: NextApiResponse) {
  return res.setHeader(
    'Cache-Control',
    `s-maxage=${CACHE_DURATION_SECONDS}, stale-while-revalidate`,
  );
}
