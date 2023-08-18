import React from 'react';
import { Flex, IconButton, Switch, useColorMode, Text,Link as ChakraLink } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useRouter } from 'next/router';

type NavigationItem = {
  label: string;
  path: string;
};

const paths: NavigationItem[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Current Weather',
    path: '/current',
  },
  {
    label: 'Forecast Weather',
    path: '/forecast',
  },
];

export const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const handlePathChange = (path: string) => {
    if (path !== router.pathname) {
      router.push(path);
    }
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" p={4} bg="#CCCCCC">
      <Flex alignItems="center" gap={4}>
        {paths.map((item) => (
          <Flex alignItems={'center'}
          w={200}
          h={50}
          ml={1}
mr={1}
            key={item.path}
            fontSize="md"
            onClick={() => handlePathChange(item.path)}
            color={item.path === router.pathname ? '#000000' : 'inherit'}
            cursor="pointer"
            _hover={{ bg: '#292929',
          color: 'white' }}
          >
          <Text fontSize={'20px'} textTransform={'uppercase'}> {item.label}</Text>  
          </Flex>
        ))}
        <IconButton
          aria-label="Toggle Theme"
          icon={colorMode === 'dark' ? <FiSun /> : <FiMoon />}
          onClick={toggleColorMode}
        />
      </Flex>
    </Flex>
  );
};
