import React, { useEffect, useState } from "react";
import { Box, Text, Button, Image, Flex, HStack } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/util/cartFunction";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageURL: string;
}

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const [localCart, setLocalCart] = useState<Product[]>([]);

  // Initialize localCart with cart data
  useEffect(() => {
    // Consolidate items with the same product ID
    const consolidatedCart: Product[] = [];

    cart.forEach((product) => {
      const existingProduct = consolidatedCart.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        consolidatedCart.push({ ...product });
      }
    });

    setLocalCart(consolidatedCart);
  }, [cart]);

  const handleRemoveFromCart = (productId: string) => {
    // Update the cart locally
    const updatedCart = localCart.filter((product) => product._id !== productId);
    setLocalCart(updatedCart);

    // Update the cart globally
    removeFromCart(productId);
    // You may also want to update the cart in localStorage
  };

  const checkout = () => {
    // Implement your checkout logic here
    // Clear the cart data in localStorage (if needed)
  };

  return (
    <Layout title="Cart" noHeader={false} withNoMenus={true}>
      <Flex direction="column">
        <Text fontSize="xl" fontWeight="bold">
          Shopping Cart
        </Text>
        {localCart.map((product) => (
          <HStack
            key={product._id}
            border="1px solid #ccc"
            p={3}
            borderRadius="md"
            mb={4}
            alignItems="center"
          >
            <Box>
              <Image
                src={product.imageURL}
                alt={product.name}
                maxH="100px"
                objectFit="cover"
                mb={2}
              />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                {product.name}
              </Text>
              <Text fontSize="md">Price: ${product.price}</Text>
              <Text fontSize="md">Quantity: {product.quantity}</Text>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => handleRemoveFromCart(product._id)}
              >
                Remove
              </Button>
            </Box>
          </HStack>
        ))}
        <Button colorScheme="teal" mt={4} onClick={checkout}>
          Proceed to Checkout
        </Button>
      </Flex>
    </Layout>
  );
};

export default Cart;
