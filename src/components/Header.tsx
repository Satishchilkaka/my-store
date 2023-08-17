import React from 'react';
import { Box, Flex, IconButton, Switch, Text, useColorMode } from '@chakra-ui/react';
import { WiCloud, WiTime1 } from 'react-icons/wi';
import { FaSun, FaMoon } from 'react-icons/fa'; 
import { useRouter } from 'next/router';

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const paths = [
    {
      label: 'Current Weather',
      path: '/current',
      icon: WiCloud,
    },
    {
      label: 'Forecast Weather',
      path: '/forecast',
      icon: WiTime1,
    }
  ];

  return (
    <Flex h={50} alignItems="center" bgColor="gray" justifyContent="space-between" px={4}>
      <Flex alignItems="center" cursor={'pointer'}>
        {paths.map((item, index) => (
          <Flex alignItems="center" bgColor="gray.600" rounded="md" ml={3} key={index} onClick={() => navigateTo(item.path)}>
            <IconButton aria-label={item.label} icon={<item.icon size={20} />} />
            <Text fontSize="20px" ml={1} onClick={() => navigateTo(item.path)}>
              {item.label}
            </Text>
          </Flex>
        ))}
      </Flex>
      
      <Box display="flex" alignItems="center">
        <IconButton
          aria-label="Toggle Theme"
          icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />} 
          onClick={toggleColorMode}
        />
      </Box>
    </Flex>
  );
};
