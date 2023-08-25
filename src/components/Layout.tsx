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
import Head from 'next/head';

type PageProps = {
  children: ReactNode;
  noHeader: boolean
  withNoMenus: boolean
  title: string
};

export const Layout: React.FC<PageProps> = ({ children , noHeader, withNoMenus, title}) => {
  return (
    <>
    <Head>
<title> {title}</title>
<meta name='description' content=''/>
<meta name='viewport' content='width=device-width, initial-scale=1' />

    </Head>
    <>
    {!noHeader ? <Header withNoMenus={withNoMenus}/> : null}
    <div
    style={{
      width: '100%',
      maxWidth: '1800px',
      margin: 'auto',
      height: '100%',

    }}
    >
      {children}
    </div>
    </>
  </>
    
  );
};


// <ChakraProvider theme={theme}>

// <Flex flexDirection="column" minHeight="100vh">
//   <Header />
//   <Box flex="1" p={4}>
//     {children}
//   </Box>
// </Flex>
// </ChakraProvider>