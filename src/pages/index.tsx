import { NextPage } from 'next';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Layout } from '@/components/Layout'; // Import Layout component
import { Header } from '../components/Header';

// pages/index.tsx (Home page)
import React from 'react';

const Home: React.FC = () => {
  return (

    <ChakraProvider>
    <Layout>
      <h2>Home Page</h2>
    </Layout>
  </ChakraProvider>
    
  );
};

export default Home;
