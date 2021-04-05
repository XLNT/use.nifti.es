import { NextApiRequest, NextApiResponse } from 'next';
import { setCors } from 'server/lib/cors';
import { guardOnlyGet, handler, yup } from 'server/lib/handler';
import { setCacheControl } from 'server/lib/httpCache';
import { cache } from 'server/lib/metaCache';
import { resolve } from 'server/resolve';

// should be fine, idk
cache.init().catch(console.error.bind(console));

export default handler(async function address(req: NextApiRequest, res: NextApiResponse) {
  setCors(res);
  guardOnlyGet(req, res);
  setCacheControl(res);

  const id = (req.query.id as string[]).join('/');
  const locale = req.query.locale as string;

  const response = await resolve(id, locale);

  return yup(res, response);
});
