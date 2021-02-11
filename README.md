# 🖼 use.nifti.es

> A universal NFT metadata and rendering API.

🖼 use.nifti.es returns an NFT's metadata in a consistent, universal format, as well as domain-specific rendering logic in order to render arbitrary NFTs.

🖼 use.nifti.es is a work-in-progress, and was written for [📦 drop.nifti.es](https://drop.nifti.es).

## Usage

`GET https://use.nifti.es/api/:id`

where `:id` is a [ChainAgnostic CAIP-19](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-19.md) identifier that follows the [CAIP-22](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-22.md) standard for ERC721 assets and a yet-specified (but very similar) CAIP-XX standard for ERC1155 assets.

```json
{
  "render": {
    "type": "image",
    "src": "https://themanymatts.lol/images/bagel.png",
    "alt": "bagel matt — matt's joy is your joy. grab a bagel and enjoi."
  },
  "metadata": {
    "name": "bagel matt",
    "description": "matt's joy is your joy. grab a bagel and enjoi.",
    "decimals": 2,
    "image": "https://themanymatts.lol/images/bagel.png"
  }
}
```

## Get Collection Metadata

You can request metadata on a collection with an id like `eip155:1/erc1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186`.

## Get Asset Metadata

You can request metadata on an asset with an id like `eip155:1/erc1155:0x28959Cf125ccB051E70711D0924a62FB28EAF186/0`.

# Support

🖼 use.nifti.es currently supports the following Ethereum networks:

- `eip155:1` — mainnet
- `eip155:4` — rinkeby
- `eip155:5` — görli

If you'd like to see support for more Ethereum-compatible networks, as well as other chains supported by CAIP addressing formats, please submit a PR to propose an integration.

🖼 use.nifti.es currently supports the `image` render type, with plans to support the wide range of render-able NFTs such as:

- `image` / `picture` / `gif` media
- `video` media
- `gltf` and other 3D media types
- `plaintext` and other textual media types
- `artblocks`
- `ethblocks`
- [`Autoglyphs`](https://larvalabs.com/autoglyphs)
- Urbit ID [`sigils`](https://urbit.org)

🖼 use.nifti.es plans to support all well-known NFT standards on Ethereum mainnet, such as:

- CryptoPunks
- CryptoKitties
- ERC721
- ERC1155

If you'd like to see support for more contract standards, please submit a PR to propose an integration.

## References

- [OpenSea metadata standard](https://docs.opensea.io/docs/metadata-standards)
- [a list of ethereum art projects](https://twitter.com/simondlr/status/1359599302193139716?s=12)
