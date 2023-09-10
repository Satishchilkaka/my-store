


import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '@/components/Header';
import LoginPage from './login';
import Products from './products';

const Home = () => {

  return (
    <>
    <Head>
    <title></title>
  </Head>
<main>
{/* <LoginPage/> */}
<Products/>
</main>
    </>
  )
}

export default Home;