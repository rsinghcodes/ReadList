import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  fonts: {
    body: 'DM Sans',
    heading: 'DM Sans',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.50', '#011627')(props),
        color: mode('gray.700', 'whiteAlpha.900')(props),
      },
      '.prose': {
        h1: {
          fontSize: '4xl',
          lineHeight: '1.6',
          fontWeight: '700',
        },
        h2: {
          fontSize: { base: '2xl', md: '3xl' },
          lineHeight: '1.6',
          fontWeight: '700',
        },
        h3: {
          fontSize: '2xl',
          lineHeight: '1.6',
          fontWeight: '700',
        },
        p: {
          fontSize: { base: 'md', md: 'lg' },
          lineHeight: '1.6',
          my: '5',
        },
        ul: { my: '4' },
        ol: { my: '4' },
        li: {
          position: 'relative',
          pl: '2',
          ml: '5',
          my: '4',
          fontSize: { base: 'md', md: 'lg' },
          color: mode('gray.700', 'whiteAlpha.800')(props),
        },
        blockquote: {
          fontWeight: '500',
          fontStyle: 'italic',
          borderLeftWidth: '0.25rem',
          borderLeftColor: mode('gray.300', 'whiteAlpha.300')(props),
          my: '6',
          pl: '4',
        },
        a: {
          fontWeight: '500',
          color: mode('blue.600', 'blue.400')(props),
          _hover: {
            textDecoration: 'underline',
          },
        },
        code: {
          bg: mode('gray.200', 'gray.800')(props),
          color: mode('gray.900', 'whiteAlpha.800')(props),
          fontSize: '90%',
          p: '1',
          borderRadius: 'sm',
        },
        pre: {
          bg: mode('gray.200', 'gray.800')(props),
          borderRadius: 'md',
          p: '6',
          overflowX: 'scroll',
          '::-webkit-scrollbar': {
            display: 'none',
          },

          code: {
            color: mode('gray.900', 'whiteAlpha.800')(props),
            bg: 'transparent',
          },
        },

        'img, video': {
          w: '100%',
          h: '100%',
        },
      },
    }),
  },
  config: {
    useSystemColorMode: true,
  },
});

export default theme;
