import { NextPage } from 'next';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Layout } from '@/components/Layout'; // Import Layout component
import { Header } from '../components/Header';

import React from 'react';
import { SignInPage } from './SignInPage';

const Home: React.FC = () => {
  return (

    <ChakraProvider>
    {/* <Layout>
      <h2>Home Page</h2>
    </Layout> */}
    <div className="App">
        <SignInPage />
      </div>
  </ChakraProvider>
    
  );
};

export default Home;
