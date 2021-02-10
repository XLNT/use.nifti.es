import { isCAIP22AssetID } from 'common/lib/CAIP22';
import { isCAIPXXAssetID } from 'common/lib/CAIPXX';
import { OpenSeaAssetContract } from 'common/lib/OpenSeaCollection';
import { parseIdentifier } from 'common/lib/parseIdentifier';
import { Render, RenderType } from 'common/lib/Render';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCacheControl } from 'server/lib/cache';
import { guardOnlyGet, handler, nope, yup } from 'server/lib/handler';
import { AssetMetadata, getAssetMetadata } from 'server/lib/metadata';
import { getAsset, getCollection } from 'server/lib/opensea';

// TODO: consider defining a standard representation for a collection and merging opensea/rarible

// the collection an asset is a part of
interface AssetCollectionResponse {
  opensea?: OpenSeaAssetContract;
}

// an individual asset
interface AssetMetadataResponse {
  render: Render;
  metadata: AssetMetadata;
  opensea?: any;
}

export default handler(async function address(req: NextApiRequest, res: NextApiResponse) {
  guardOnlyGet(req, res);
  setCacheControl(res);

  const id = (req.query.id as string[]).join('/');

  let reference: ReturnType<typeof parseIdentifier>;
  try {
    reference = parseIdentifier(id);
  } catch (error) {
    return nope(res, 400, error.message);
  }

  if (isCAIP22AssetID(reference) || isCAIPXXAssetID(reference)) {
    const metadata = await getAssetMetadata(reference);
    // const opensea = await getAsset(reference);
    // TODO: render logic
    // fetch asset-specific metadata
    const response: AssetMetadataResponse = {
      render: {
        type: RenderType.Image,
        src: metadata.image,
        alt: [metadata.name, metadata.description].filter(Boolean).join(' — '),
      },
      // opensea,
      metadata,
    };
    return yup(res, response);
  } else {
    // fetch collection metadata
    const response: AssetCollectionResponse = {
      // opensea: await getCollection(reference),
    };

    return yup(res, response);
  }
});
