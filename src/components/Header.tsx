import { useState } from 'react';
import { Flex, Switch, useColorMode } from '@chakra-ui/react';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

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
      bg={isDarkMode ? 'gray.800' : 'gray.200'}
    >
      <h1>My Website</h1>
      <Switch isChecked={isDarkMode} onChange={handleToggle} />
    </Flex>
  );
};

export default Header;
