import { NextPage } from 'next';
import { ChakraProvider, Box } from '@chakra-ui/react';
import {Header} from '../components/Header';

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <Box>
        <Header />
     
       
      </Box>
    </ChakraProvider>
  );
};

export default Home;
