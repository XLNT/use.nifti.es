import { Alert } from '@chakra-ui/alert';
import { AspectRatio, Container, Heading, VStack } from '@chakra-ui/layout';
import { RenderNiftyAsset } from 'client/components/RenderNiftyAsset';
import { toPlainText } from 'common/toPlainText';
import type { AssetMetadataResult } from 'common/types/Responses';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import { NextSeo } from 'next-seo';
import type { ComponentPropsWithoutRef } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { resolve } from 'server/resolve';

function View({
  result,
  error,
  meta,
}: {
  result?: AssetMetadataResult;
  error?: string;
  meta: { title: string; description: string; image?: string; alt?: string };
}) {
  const { isFallback } = useRouter();

  if (isFallback) return null;

  return (
    <>
      <NextSeo
        title={meta.title ?? 'Not Found'}
        description={meta.description}
        openGraph={
          meta.image && {
            images: [{ url: meta.image, alt: meta.alt }],
          }
        }
        twitter={{ cardType: 'summary_large_image', site: 'use.nifti.es', handle: '@mattgcondon' }}
      />

      <Container py="4">
        <VStack align="start" spacing={8}>
          {error ? (
            <Alert status="error">{error}</Alert>
          ) : (
            <>
              <AspectRatio ratio={1} w="full">
                <RenderNiftyAsset render={result.render} />
              </AspectRatio>
              <Heading>{result.metadata.name}</Heading>
              <VStack align="start" spacing="1">
                <ReactMarkdown plugins={[gfm]}>{result.metadata.description}</ReactMarkdown>
              </VStack>
            </>
          )}
        </VStack>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps<ComponentPropsWithoutRef<typeof View>> = async (
  ctx,
) => {
  if (ctx.params.id.length !== 3) return { notFound: true, revalidate: 60 };

  const id = (ctx.params.id as string[]).join('/');
  let result: AssetMetadataResult;
  try {
    result = (await resolve(id)) as AssetMetadataResult;
  } catch (error) {
    return {
      props: {
        error: error.message,
        meta: {
          title: 'Error',
          description: error.message,
        },
      },
      revalidate: 60,
    };
  }

  const metaTitle = `${result?.metadata.name || 'An Unnammed Object'}`;
  const metaDescription = await toPlainText(result?.metadata.description ?? '');
  const metaImage = result?.render.fallback.src;
  const metaAlt = result?.render.fallback.alt;

  return {
    props: {
      result,
      meta: {
        title: metaTitle,
        description: metaDescription,
        image: metaImage,
        alt: metaAlt,
      },
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export default View;
