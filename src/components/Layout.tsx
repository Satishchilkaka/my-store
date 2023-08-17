import React, { ReactNode } from 'react';
import { WeatherNavigation } from './WeatherNavigation';
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
   
        <WeatherNavigation />
        {children}
      </div>
    </>
  );
};
