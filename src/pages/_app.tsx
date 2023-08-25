

import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

const App =  ({ Component, pageProps, session }: any)  =>{
  return (
    <SessionProvider session={session} 
    refetchInterval={60 * 13}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;
