# 🖼 use.nifti.es

> A universal NFT metadata and rendering API.

🖼 use.nifti.es returns an NFT's metadata in a consistent, universal format, as well as domain-specific rendering logic in order to render arbitrary NFTs. It's like [Noembed](https://noembed.com/) but for digital assets.

🖼 use.nifti.es is a work-in-progress, and was written for [📦 drop.nifti.es](https://drop.nifti.es).

## Usage

First, refer to your asset or collection using a [ChainAgnostic CAIP-19](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-19.md) identifier that follows the [CAIP-22](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-22.md) or [CAIP-29](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-29.md) standard for Ethereum-chain assets (ERC721 or ERC1155).

It looks something like `eip155:1/erc1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186/0`.

Then, fetch consistent metadata like so:

`GET https://use.nifti.es/api/:id`

```json
{
  "render": {
    "type": "image",
    "src": "https://themanymatts.lol/images/bagel.png",
    "alt": "bagel matt — matt's joy is your joy. grab a bagel and enjoi.",
    "sources": [{ "src": "https://themanymatts.lol/images/bagel.png" }]
  },
  "metadata": {
    "name": "bagel matt",
    "description": "matt's joy is your joy. grab a bagel and enjoi.",
    "decimals": 2,
    "image": "https://themanymatts.lol/images/bagel.png"
  }
}
```

You can also **view** an arbitrary asset by removing the `/api` subpath like:

```
https://use.nifti.es/eip155:1/erc1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186/0
```

(this might be useful if you want to show a user a full detail page, but without rendering the entire thing yourself)

## Asset References (CAIP-19)

You can refer to a **collection** with an id like `eip155:1/erc1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186`.

You can refer to an **asset** with an id like `eip155:1/erc1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186/0`.

Check out [CAIP-19](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-19.md) and [CAIP-22](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-22.md) for more specifics, but it's basically `chainId/assetStandard:contractAddress/tokenId`.

# Support

🖼 use.nifti.es supports the following Ethereum networks:

- `eip155:1` — mainnet
- `eip155:4` — rinkeby
- `eip155:137` — matic
- 🔜 `eip155:5` — görli

If you'd like to see support for more Ethereum-compatible networks, as well as other chains supported by CAIP addressing formats, please submit a PR to propose an integration.

🖼 use.nifti.es currently supports the following render types:

- `empty` (i.e. no metadata available)
- `image` (i.e. `<img />`, `<picture />`, `.gif`)
- `oembed` (i.e. any embedded media like youtube, vimeo, and other sites supported on [noembed.com](https://noembed.com/))
- `video` (i.e. `<video />` or looping silent mp4 )
- `audio` (i.e. `<audio />`)
- `model` 3D models in gltf / glb formats, displayed via `<model-viewer />`
- 🔜 `plaintext` and other textual media types
- 🔜 `artblocks`
- 🔜 `ethblocks`
- 🔜 native rendering of [`Autoglyphs`](https://larvalabs.com/autoglyphs)
- 🔜 Urbit ID [`sigils`](https://urbit.org)

see [common/types/Render.ts](common/types/Render.ts) for specifics

🖼 use.nifti.es supports well-known asset standards on Ethereum mainnet, namely:

- ERC1155
- ERC721
- CryptoPunks
- CryptoKitties
- 🔜 ERC20

If you'd like to see support for another contract standard, please submit a PR to propose an integration.

🖼 use.nifti.es supports the following URI schemas, but always rewrites them through an https proxy for ease-of-use:

- `http[s]://`
- `ipfs://`
- 🔜 `dat://`

## References

- [OpenSea metadata standard](https://docs.opensea.io/docs/metadata-standards)
- [a list of ethereum art projects](https://twitter.com/simondlr/status/1359599302193139716?s=12)

## Examples

Try out these asset references

- `eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/27853175353995272517766450193869818424107874020190547876689048355767578525697`
- `eip155:1/cryptokitties:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/771769`
- `eip155:1/cryptopunks:0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/1`
- `eip155:1/erc721:0x059edd72cd353df5106d2b9cc5ab83a52287ac3a/9083`
- `eip155:1/erc1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186/0`
