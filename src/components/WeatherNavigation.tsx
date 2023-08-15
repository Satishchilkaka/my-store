import React from 'react';
import Link from 'next/link';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import NextLink from "next/link";
export const WeatherNavigation = () => {
  return (
    <Flex>
      <HStack>
      <Box>
      <NextLink href="/current">
        <Box
          as="a"
          display="block"
          px={4}
          py={2}
          rounded="md"
       
          _hover={{ color: "blue.500"}}
        >
          <Text>Current Weather</Text>
        </Box>
      </NextLink>
    </Box>
     
      <Box>

    
      <Link href="/forecast">
      
          <Text
            display="block"
          
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


