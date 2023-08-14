import React from 'react';
import Link from 'next/link';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';

export const WeatherNavigation = () => {
  return (
    <Flex>
      <HStack>
        <Box>

      
      <Link href="/current">
      
          <Text
            display="block"
            color="gray.600"
            _hover={{ color: 'blue.500' }}
            p={2}
          >
            Current Weather
          </Text>
      
      </Link>
      </Box>
     
      <Box>

    
      <Link href="/forecast">
      
          <Text
            display="block"
            color="gray.600"
            _hover={{ color: 'blue.500' }}
            p={2}
          >
            Forecast Weather
          </Text>
      
      </Link>
      </Box>
      </HStack>
    </Flex>
  );
};


