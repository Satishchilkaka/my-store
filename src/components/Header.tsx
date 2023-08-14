import { useState } from 'react';
import { Flex, Switch, useColorMode } from '@chakra-ui/react';
import {WeatherNavigation} from '@/components/WeatherNavigation';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toggleColorMode } = useColorMode();

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
    toggleColorMode();
  };

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
      bg={isDarkMode ? '#2C4377' : '#666666'}
    >
    <WeatherNavigation/>
    <h1>Weather </h1>
      <Switch isChecked={isDarkMode} onChange={handleToggle}  />
    </Flex>
  );
};


