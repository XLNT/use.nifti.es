import { parseIdentifier } from 'common/lib/parseIdentifier';
import { AssetMetadata } from 'common/types/AssetMetadata';
import { isAssetIDReference } from 'common/types/AssetReference';
import { OpenSeaAssetContract } from 'common/types/OpenSea';
import { RenderAsset } from 'common/types/Render';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCacheControl } from 'server/lib/cache';
import { guardOnlyGet, handler, yup } from 'server/lib/handler';
import { mapToRender } from 'server/lib/mapToRender';
import { resolveAssetMetadata } from 'server/lib/metadata';
import { getCollection } from 'server/lib/opensea';

// the collection an asset is a part of
interface AssetCollectionResponse {
  name: string;
  description: string;
  opensea: OpenSeaAssetContract;
}

// an individual asset
interface AssetMetadataResponse {
  render: RenderAsset;
  metadata: AssetMetadata;
}

export default handler(async function address(req: NextApiRequest, res: NextApiResponse) {
  guardOnlyGet(req, res);
  setCacheControl(res);

  const idString = (req.query.id as string[]).join('/');
  const locale = req.query.locale as string;

  // parse the identifier from the passed string
  const identifier = parseIdentifier(idString);

  if (isAssetIDReference(identifier)) {
    const metadata = await resolveAssetMetadata(identifier, locale);
    const render = await mapToRender(identifier, metadata);

    return yup<AssetMetadataResponse>(res, {
      render,
      metadata,
    });
  } else {
    const opensea = await getCollection(identifier);

    return yup<AssetCollectionResponse>(res, {
      name: opensea.name,
      description: opensea.description,
      opensea,
    });
  }
});
