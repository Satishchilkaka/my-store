import { Flex, Heading } from '@chakra-ui/react';

const FAQ = () => {
  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Heading as="h1" size="xl" mb={4}>
        FAQ Page
      </Heading>
      <p>This is the FAQ page content.</p>
    </Flex>
  );
};

export default FAQ;
