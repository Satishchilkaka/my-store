import { NextPage } from 'next';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <Box>
        <Header />
        <Home/>
      </Box>
    </ChakraProvider>
  );
};

export default Home;
