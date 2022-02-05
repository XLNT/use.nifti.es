import { NextApiRequest, NextApiResponse } from 'next';
import { setCors } from 'server/cors';
import { guardOnlyGet, handler, yup } from 'server/handler';
import { setCacheControl } from 'server/httpCache';
import { resolve } from 'server/resolve';

export default handler(async function address(req: NextApiRequest, res: NextApiResponse) {
  setCors(res);
  guardOnlyGet(req, res);

  const id = (req.query.id as string[]).join('/');

  try {
    const metadata = await resolve(id);

    setCacheControl(res);

    return yup(res, metadata);
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch/parse metadata.');
  }
});
