import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  ChakraProvider,
  CSSReset,
} from '@chakra-ui/react';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

function ProductList() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function fetchProducts() {
      const token = localStorage.getItem('token'); // Replace with your actual token key
      console.log(token);
      if (!token) {
        // Handle the case where the token is not available in localStorage
        console.error('Token not found in localStorage');
        return;
      }

      try {
        // Fetch products from your backend API with the authorization header
        const response = await axios.get('http://localhost:3001/v1/products', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  console.log('products', products)

  return (
    <ChakraProvider>
      <CSSReset />
      <Box p="4">
        <Text fontSize="2xl" fontWeight="bold" mb="4">Product List</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* {products.map((product) => (
              <Tr key={product._id}>
                <Td>{product.name}</Td>
                <Td>{product.category}</Td>
                <Td>${product.price.toFixed(2)}</Td>
                <Td>{product.quantity}</Td>
              </Tr>
            ))} */}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
}

export default ProductList;
