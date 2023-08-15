import { useState } from 'react';
import { Box, Flex, Switch, useColorMode , Text} from '@chakra-ui/react';
import {WeatherNavigation} from '@/components/WeatherNavigation';



export const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Box>
        <Text textTransform={'uppercase'}> Dark Mode</Text>
      </Box>
      <Box>
        <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
      </Box>
    </Box>
  )
}


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
    // bg={isDarkMode ? '#2C4377' : '#666666'}
    >
      
    <WeatherNavigation/>
    <h1>Weather </h1>
    <ThemeSwitch/>
      
    </Flex>
  );
};


