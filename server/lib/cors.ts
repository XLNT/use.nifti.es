import { NextApiResponse } from 'next';

export function setAllowedOrigins(res: NextApiResponse) {
  return res.setHeader('Access-Control-Allow-Origin', '*');
}
