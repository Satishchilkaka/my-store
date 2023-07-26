import { NextPage } from 'next';
import { Box, ChakraProvider } from '@chakra-ui/react';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <Box>
        <Header />
        {/* Add the rest of your page content here */}
      </Box>
    </ChakraProvider>
  );
};

export default Home;
