// via https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema

import { AnySchemaObject } from 'ajv';

export const ERC1155MetadataSchema: AnySchemaObject = {
  title: 'Token Metadata',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Identifies the asset to which this token represents',
    },
    decimals: {
      type: 'integer',
      description:
        'The number of decimal places that the token amount should display - e.g. 18, means to divide the token amount by 1000000000000000000 to get its user representation.',
    },
    description: {
      type: 'string',
      description: 'Describes the asset to which this token represents',
    },
    image: {
      type: 'string',
      description:
        'A URI pointing to a resource with mime type image/* representing the asset to which this token represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive.',
    },
    animation_url: {
      type: 'string',
      description: 'An animation, most likely a .mp4',
    },
    external_url: {
      type: 'string',
      description: 'An external URL that can represent the asset',
      format: 'uri',
    },
    properties: {
      type: 'object',
      description: 'Arbitrary properties. Values may be strings, numbers, object or arrays.',
    },
    attributes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          key: { type: 'string' },
          value: { type: 'string' },
        },
        required: ['key', 'value'],
      },
    },
    localization: {
      type: 'object',
      required: ['uri', 'default', 'locales'],
      properties: {
        uri: {
          type: 'string',
          description:
            'The URI pattern to fetch localized data from. This URI should contain the substring `{locale}` which will be replaced with the appropriate locale value before sending the request.',
        },
        default: {
          type: 'string',
          description: 'The locale of the default data within the base JSON',
        },
        locales: {
          type: 'array',
          description:
            'The list of locales for which data is available. These locales should conform to those defined in the Unicode Common Locale Data Repository (http://cldr.unicode.org/).',
        },
      },
    },
  },
};
