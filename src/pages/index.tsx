import { NextPage } from 'next';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Header from '../components/Header';
import Weather from './weather';
import Footer from '@/components/Footer';

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <Box>
        <Header />
        <Weather/>
       
      </Box>
      
    </ChakraProvider>
  );
};

export default Home;
