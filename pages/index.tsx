import { NftMetadata } from '@zoralabs/nft-metadata';
import { GetStaticProps } from 'next';
import { ComponentProps } from 'react';
import { resolve } from 'server/resolve';

const EXAMPLE_ASSET_ID = `eip155:1/eip721:0x231D41A72E81fB4493908715CB77BCaCF0ce40b1/0`;

export default function Home({ example }: { example: NftMetadata }) {
  return (
    <div>
      <h1>
        <span>🖼️</span> use.nifti.es
      </h1>
      <h3>
        A universal NFT metadata and rendering API, powered by{' '}
        <a href="https://zora.co" rel="noopener noreferrer" target="_blank">
          Zora
        </a>
        .
      </h3>

      <p>
        use.nifti.es returns an NFT&apos;s metadata in a consistent, universal format. view the
        documentation on{' '}
        <a href="https://github.com/XLNT/use.nifti.es" rel="noopener noreferrer" target="_blank">
          GitHub
        </a>
        .
      </p>

      <p>
        by{' '}
        <a href="https://twitter.com/1ofthemanymatts" rel="noopener noreferrer" target="_blank">
          one of the many matts
        </a>{' '}
        for{' '}
        <a href="https://use.nifti.es" rel="noopener noreferrer" target="_blank">
          nifti.es
        </a>
        .
      </p>

      <h2>Example</h2>
      <code>https://use.nifti.es/api/{EXAMPLE_ASSET_ID}</code>
      <pre>{JSON.stringify(example, null, 2)}</pre>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ComponentProps<typeof Home>> = async (ctx) => {
  const example = await resolve(EXAMPLE_ASSET_ID);
  return { props: { example } };
};
