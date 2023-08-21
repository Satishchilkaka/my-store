// import React, { ReactNode } from 'react';
// import { WeatherNavigation } from '@/components/WeatherNavigation';
// import { Header } from '@/components/Header';
// import Head from 'next/head';
// import { Box, Flex } from '@chakra-ui/react';

// type PageProps = {
//   children: ReactNode;
// };

// export const Layout = ({ children }: PageProps) => {
//   return (
//     <>
//       <Head>
//         <title>Weather</title>
//       </Head>
//       <Flex justifyContent="space-between" alignItems="center" h={50} bgColor="gray">
//         <WeatherNavigation />
//         <Header />
//       </Flex>
//       <div>{children}</div>
//     </>
//   );
// };


import React, { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Box, ChakraProvider, CSSReset, Flex, theme } from '@chakra-ui/react';

type PageProps = {
  children: ReactNode;
};

export const Layout: React.FC<PageProps> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>

      <Flex flexDirection="column" minHeight="100vh">
        <Header />
        <Box flex="1" p={4}>
          {children}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};
