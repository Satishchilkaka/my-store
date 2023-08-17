import React from 'react';
import { Box, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex h={50} bgColor="gray" justifyContent="flex-end" px={4} alignItems="center">
      <Box>
        <IconButton
          aria-label="Toggle Theme"
          icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
          onClick={toggleColorMode}
        />
      </Box>
    </Flex>
  );
};
