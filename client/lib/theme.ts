import { extendTheme, ThemeOverride } from '@chakra-ui/react';

const highlightable = { _selection: { backgroundColor: 'highlight' } };

const override: ThemeOverride = {
  fonts: {
    body: "'DM Sans', sans-serif",
    heading: "'DM Sans', sans-serif",
    mono: "'DM Mono', monospace",
  },
  fontSizes: {
    subtext: '0.75rem',
    base: '0.93rem',
    h4: '1.172rem',
    h3: '1.172rem',
    h2: '1.465rem',
    h1: '2.289rem',
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  colors: {
    // transparent: 'rgba(1, 1, 1, 0)',
    gesso: '#FFFFFF',
    drywall: '#F8F8F8',
    smudge: '#E8E9F1',
    concrete: '#9C9CA5',
    bruise: '#010024',
    tomato: '#FF3333',
    blackout: '#000000',
    highlight: '#FF00FF',
    // success: '#00B733',
  },
  textStyles: {
    highlightable,
  },
  styles: {
    global: {
      body: {
        fontFamily: 'body',
        color: 'bruise',
        bg: 'drywall',
        overflowX: 'hidden',
        lineHeight: 'normal',
      },
      '.particle': {
        pointerEvents: 'none',
        position: 'absolute',
        willChange: 'transform',
      },
      sup: {
        ...highlightable,
      },
      li: {
        ...highlightable,
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        ...highlightable,
      },
    },
    Link: {
      baseStyle: {
        textDecoration: 'underline',
        _hover: { color: 'concrete' },
        ...highlightable,
      },
    },
    Code: {
      baseStyle: {
        backgroundColor: 'smudge',
        borderRadius: 4,
        ...highlightable,
      },
    },
  },
};

export const theme = extendTheme(override);
