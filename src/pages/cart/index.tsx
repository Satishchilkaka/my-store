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

  useEffect(() => {
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
    const updatedCart = localCart.filter(
      (product) => product._id !== productId
    );
    setLocalCart(updatedCart);

    removeFromCart(productId);
  };

  const getTotalPrice = (product: Product) => {
    return product.price * product.quantity;
  };

  const getTotalCartPrice = () => {
    return localCart.reduce(
      (total, product) => total + getTotalPrice(product),
      0
    );
  };

  const checkout = () => {
    // Implement checkout logic
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
            p={3}
            borderRadius="md"
            ml={3}
            alignItems="center"
          >
            <Box>
              <Image
                src={product.imageURL}
                alt={product.name}
                maxH="100px"
                maxW="150px"
                objectFit="cover"
                mb={2}
              />
            </Box>
            <Box ml={"40px"}>
              <Text fontSize="lg" fontWeight="bold">
                {product.name}
              </Text>
              <Text fontSize="md">Price: ${product.price}</Text>
              <Text fontSize="md">Quantity: {product.quantity}</Text>
              <Text fontSize="md">Total: ${getTotalPrice(product)}</Text>
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
        <Box ml={"70px"}>
          <Text fontSize="lg" fontWeight="bold" mt={5}>
            Total : ${getTotalCartPrice()}
          </Text>
          <Button colorScheme="teal" mt={4} onClick={checkout}>
            Proceed to Checkout
          </Button>
        </Box>
      </Flex>
    </Layout>
  );
};

export default Cart;
