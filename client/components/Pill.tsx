import { Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export function Pill({ prefix, children }: PropsWithChildren<{ prefix: string }>) {
  return (
    <Text
      as="span"
      bg="smudge"
      p={1}
      borderRadius={4}
      textStyle="highlightable"
      whiteSpace="nowrap"
      _before={{
        content: `"${prefix}"`,
        display: 'inline-block',
        textDecoration: 'none',
        paddingRight: 1,
      }}
    >
      {children}
    </Text>
  );
}
