import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

import { AppProps } from 'next/app'; 
import { SessionProvider } from 'next-auth/react';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    //    <SessionProvider session={pageProps.session}>
    //    <Component {...pageProps} />
    //  </SessionProvider>
  );
}

export default MyApp;
