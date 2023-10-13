// Cart.tsx
import React, { useEffect, useState } from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";
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
  const { cart, addToCart } = useCart();
  const [localCart, setLocalCart] = useState<Product[]>([]);

  // Initialize localCart with cart data
  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  // Function to remove a product from the cart and localStorage
  const removeFromCart = (productId: string) => {
    const updatedCart = localCart.filter((product) => product._id !== productId);
    setLocalCart(updatedCart);
    // Update localStorage with the new cart data
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const checkout = () => {
    // Implement your checkout logic here
    // Clear the cart data in localStorage
    localStorage.removeItem('cart');
  };

  return (
    <Layout title="Cart" noHeader={false} withNoMenus={true}>
      <Box p={4}>
        <Text fontSize="xl" fontWeight="bold">
          Shopping Cart
        </Text>

        <Box mt={4}>
          {localCart.map((product) => (
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
              <Image
                src={product.imageURL}
                alt={product.name}
                maxH="150px"
                objectFit="cover"
                mb={2}
              />
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
