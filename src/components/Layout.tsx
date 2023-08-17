import React, { ReactNode } from 'react';
import { WeatherNavigation } from './WeatherNavigation';
import { Header } from '@/components/Header';
import Head from 'next/head';

type PageProps = {
  children: ReactNode;
};

export const Layout = ({ children }: PageProps) => {
  return (
    <>
      <Head>
        <title>Weather</title>
      </Head>
      <div>
      <Header /> 
        <WeatherNavigation />
        {children}
      </div>
    </>
  );
};
