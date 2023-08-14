import { NextPage } from 'next';
import { ChakraProvider, Box } from '@chakra-ui/react';
import {Header} from '@/components/Header';
import Weather from './current';
import Footer from '@/components/Footer';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
   <>
   
    <Head>
      <title>Weather status</title>
    </Head>
    <main>
      <Header/>
    </main>
   
   </>
  );
};

export default Home;
