import { NextApiRequest, NextApiResponse } from 'next';

export function setCors(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET');
}
