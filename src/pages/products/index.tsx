import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  ChakraProvider,
  CSSReset,
  Grid,
  GridItem,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image
} from '@chakra-ui/react';
import { Layout } from '@/components/Layout';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageURL: string;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
     
      try {
        // Fetch products from your backend API with the authorization header
        const response = await axios.get('http://localhost:3001/v1/products', {
        
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleIncreaseQuantity = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Function to handle quantity decrease
  const handleDecreaseQuantity = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId && product.quantity > 1 
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };
  const handleQuantityChange = (productId: string, newQuantity: string) => {
    const parsedQuantity = parseInt(newQuantity, 10);

    if (!isNaN(parsedQuantity) && parsedQuantity >= 1) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, quantity: parsedQuantity } : product
        )
      );
    }
  };

  return (
    <Layout title='Products' noHeader={false} withNoMenus={true}>
        <Box p="4">
      <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={4}>
        {products.map((product) => (
          <GridItem key={product._id} p={4} borderRadius="md" boxShadow="md">
            <Image
                src={product.imageURL}
                alt={product.name}
                maxH="150px"
                objectFit="cover"
              />
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              {product.name}
            </Text>
            <Text fontSize="md">Price: ${product.price}</Text>
            <Text fontSize="md">Quantity:</Text>
            <NumberInput
              minWidth="60px"
              maxWidth="80px"
              defaultValue={1}
              size="sm"
              min={1}
              onChange={(newQuantity) => handleQuantityChange(product._id, newQuantity)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button mt={2} colorScheme="teal">
              Add to cart
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Box>
   </Layout>
  );
}

export default ProductList;
