import { useState } from 'react';
import { Flex, Switch, useColorMode } from '@chakra-ui/react';

const Header = () => {
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
      <h1>Weather report</h1>
      <Switch isChecked={isDarkMode} onChange={handleToggle} />
    </Flex>
  );
};

export default Header;
