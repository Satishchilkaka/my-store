import React from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/util/cartFunction";

const Cart = () => {
  const { cart, addToCart } = useCart();

  // Function to remove a product from the cart
  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
  };

  // Function to proceed to checkout
  const checkout = () => {
    // Implement the logic to proceed to checkout
  };

  return (
    <Layout title="Cart" noHeader={false} withNoMenus={true}>
      <Box p={4}>
        <Text fontSize="xl" fontWeight="bold">
          Shopping Cart
        </Text>

        <Box mt={4}>
          {cart.map((product) => (
            <Box
              key={product._id}
              border="1px solid #ccc"
              p={3}
              borderRadius="md"
              mb={4}
            >
              <Text fontSize="lg" fontWeight="bold">
                {product.name}
              </Text>
              <Image src={product.imageURL} alt={product.name} maxH="150px" objectFit="cover" mb={2} />
              <Text fontSize="md">Price: ${product.price}</Text>
              <Text fontSize="md">Quantity: {product.quantity}</Text>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => removeFromCart(product._id)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Box>

        <Button colorScheme="teal" mt={4} onClick={checkout}>
          Proceed to Checkout
        </Button>
      </Box>
    </Layout>
  );
};

export default Cart;
