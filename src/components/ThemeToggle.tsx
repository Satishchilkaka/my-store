import React from 'react';
import { useColorMode, IconButton, Tooltip } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip
      label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      hasArrow
      placement="left"
    >
      <IconButton
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle Theme"
      />
    </Tooltip>
  );
};


