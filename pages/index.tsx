import { Divider, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { Pill } from 'client/components/Pill';

export default function Home() {
  return (
    <>
      <VStack
        minHeight="100vh"
        py={16}
        spacing={16}
        width="full"
        maxWidth="2xl"
        mx="auto"
        overflowX="hidden"
        align="stretch"
      >
        <VStack px={8} spacing={16} align="stretch">
          <Heading as="h1" fontSize={['2xl', '3xl', '4xl', '5xl']}>
            <Pill prefix="🖼">use.nifti.es</Pill>
          </Heading>
          <Heading as="h2" fontSize={['md', 'lg', 'xl']} lineHeight="tall">
            A universal NFT metadata and rendering API.
          </Heading>
          <Heading as="h2" fontSize="md" lineHeight="tall">
            <Pill prefix="🖼">use.nifti.es</Pill> returns an NFT&apos;s metadata in a consistent,
            universal format, as well as domain-specific rendering logic in order to render
            arbitrary NFTs.
          </Heading>
        </VStack>
        <Divider />
        <VStack px={8} spacing={8} align="stretch" lineHeight="taller">
          <Heading as="h3">docs</Heading>
          <Text>
            View the documentation on{' '}
            <Link href="https://github.com/XLNT/use.nifti.es" isExternal>
              <Pill prefix="📂">GitHub</Pill>
            </Link>
            .
          </Text>
        </VStack>
        <Divider />
        <VStack align="stretch" spacing={4} px={8}>
          {/* <Heading as="h3">gotta hand it to &apos;em</Heading> */}
          <Text textStyle="highlightable" lineHeight="taller">
            <Pill prefix="🖼">use.nifti.es</Pill> is a{' '}
            <Link href="https://nifti.es" isExternal>
              <Pill prefix="❏">nifti.es</Pill>
            </Link>{' '}
            project by
            <Link href="https://twitter.com/mattgcondon" isExternal>
              <Pill prefix="🐦">Matt Condon</Pill>
            </Link>
            .
          </Text>
          <Text textStyle="highlightable" lineHeight="taller">
            You can view, edit, and audit the code on{' '}
            <Link href="https://github.com/XLNT/use.nifti.es" isExternal>
              <Pill prefix="📂">GitHub</Pill>
            </Link>
            .
          </Text>
        </VStack>
      </VStack>
    </>
  );
}
