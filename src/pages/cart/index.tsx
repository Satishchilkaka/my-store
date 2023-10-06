import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";

const Cart: React.FC = () => {



  return (
    <Layout title="Cart" noHeader={false} withNoMenus={true}>

    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold">
        Shopping Cart
      </Text>
    </Box>
    </Layout>
  );

};

export default Cart;
