import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import {theme} from '../styles/theme'
import { CartProvider } from '@/util/cartFunction';
const App =  ({ Component, pageProps, session }: any)  =>{
  return (
    <SessionProvider session={session} 
    refetchInterval={60 * 13}>
      <ChakraProvider theme={theme}>
      <CartProvider>
        <Component {...pageProps} />
     </CartProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;
