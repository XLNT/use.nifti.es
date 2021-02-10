import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'client/lib/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          key="google"
          href="//fonts.googleapis.com/css2?family=DM+Mono&family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NextSeo
        title="🖼 use.nifti.es"
        description="A simple API that powers your universal NFT renderer."
        openGraph={{
          site_name: '🖼 use.nifti.es',
          // images: [
          //   {
          //     url: '',
          //     // width: 800,
          //     // height: 600,
          //     // alt: 'Og Image Alt',
          //   },
          // ],
        }}
        twitter={{
          handle: '@mattgcondon',
          cardType: 'summary_large_image',
        }}
      />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
