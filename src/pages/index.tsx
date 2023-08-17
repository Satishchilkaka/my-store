import { NextPage } from 'next';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Layout } from '@/components/Layout'; // Import Layout component
import { Header } from '../components/Header';

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <Layout> 
        {/* Content of the Home page */}
        <Box>
          {/* page content */}
        </Box>
      </Layout>
    </ChakraProvider>
  );
};

export default Home;
