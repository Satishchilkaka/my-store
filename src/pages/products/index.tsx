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
} from '@chakra-ui/react';
import { Layout } from '@/components/Layout';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
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

  console.log('products', products);

  return (
    <Layout title='Products' noHeader={false} withNoMenus={true}>
      <Box p="4">
       
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
          {products.map((product) => (
            <GridItem key={product._id}  p={4} borderRadius="md" boxShadow="md">
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                {product.name}
              </Text>
              <Text fontSize="md">Price: ${product.price}</Text>
              <Text fontSize="md">Quantity: {product.quantity}</Text>
              <Button mt={2}>
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
