import React from 'react';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { WiCloud, WiTime1 } from 'react-icons/wi';
import { useRouter } from 'next/router';

export const WeatherNavigation = () => {
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
    <Flex h="100%">
      <Flex alignItems="center" display="flex" h={50} cursor="pointer" >
        {paths.map((item, index) => (
          <Flex alignItems="center" key={index} onClick={() => navigateTo(item.path)}>
            <IconButton aria-label={item.label} icon={<item.icon size={20} />} />
            <Text
              fontSize="20px"
              ml={1}
              mr={3}
              onClick={() => navigateTo(item.path)} 
            >
              {item.label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
