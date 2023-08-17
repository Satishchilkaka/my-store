import React, { ReactNode } from 'react';
import { WeatherNavigation } from '@/components/WeatherNavigation';
import { Header } from '@/components/Header';
import Head from 'next/head';
import { Box, Flex } from '@chakra-ui/react';

type PageProps = {
  children: ReactNode;
};

export const Layout = ({ children }: PageProps) => {
  return (
    <>
      <Head>
        <title>Weather</title>
      </Head>
      <Flex justifyContent="space-between" alignItems="center" h={50} bgColor="gray">
        <WeatherNavigation />
        <Header />
      </Flex>
      <div>{children}</div>
    </>
  );
};
