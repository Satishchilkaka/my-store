import { Layout } from '@/components/Layout';
import { Box, Center, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';


const Orders = () => {
  return (
    <Layout title="Products" noHeader={false} withNoMenus={true}>
    <Container maxW="xl">
      <Heading as="h1" mt={6} mb={4}>
        Recent Orders
      </Heading>
      <SimpleGrid columns={1} spacing={4}>
        <Text> This is orders list</Text>
        {/* {orders.map((order) => (
          <Box key={order.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Text fontSize="lg">Order ID: {order.id}</Text>
            <Text>Date: {order.date}</Text>
            <Text>Total: ${order.total}</Text>
          </Box>
        ))} */}
        
      </SimpleGrid>
    </Container>
</Layout>
  );
};

export default Orders;
