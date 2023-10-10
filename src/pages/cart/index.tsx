import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/util/cartFunction";

const Cart = () => {

    const { cart, addToCart } = useCart();
const item = cart[0].name

  return (
    <Layout title="Cart" noHeader={false} withNoMenus={true}>

    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold">
        Shopping Cart
      </Text>
      <Text>{item}</Text>
    </Box>
    </Layout>
  );

};

export default Cart;
