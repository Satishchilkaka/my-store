import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './styles/theme';
import { Header } from '@/components/Header';
import { AppProps } from 'next/app'; 
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
