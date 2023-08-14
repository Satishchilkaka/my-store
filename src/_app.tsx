import React from 'react';
import { ChakraProvider, Box, CSSReset, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import {ThemeToggle} from './components/ThemeToggle';
import { WeatherNavigation } from '@/components/WeatherNavigation';

const theme = extendTheme({
  // Your Chakra UI theme configuration
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box>
        {/* <WeatherNavigation /> */}
        <Component {...pageProps} />
      </Box>
      <Box position="fixed" bottom={4} right={4}>
        <ThemeToggle />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
