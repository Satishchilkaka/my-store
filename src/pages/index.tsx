import { NextPage } from 'next';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Layout } from '@/components/Layout'; // Import Layout component
import { Header } from '../components/Header';

import React from 'react';
import { SignInForm} from '@/components/forms/SignInForm';

const Home: React.FC = () => {
  return (

    <ChakraProvider>
    {/* <Layout>
      <h2>Home Page</h2>
    </Layout> */}
    <div className="App">
        <SignInForm />
      </div>
  </ChakraProvider>
    
  );
};

export default Home;
