import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Grid,
  GridItem,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  Flex,
} from "@chakra-ui/react";
import { Layout } from "@/components/Layout";

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
  const api = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `${api}/v1/products`,
          {}
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
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
          product._id === productId
            ? { ...product, quantity: parsedQuantity }
            : product
        )
      );
    }
  };

  return (
    <Layout title="Products" noHeader={false} withNoMenus={true}>
      <Box p="4">
        <Grid templateColumns="repeat(auto-fill, minmax(245px, 1fr))" gap={3}>
          {products.map((product) => (
            <GridItem key={product._id} p={4} borderRadius="md" boxShadow="md">
              <Flex alignItems="center">
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {product.name}
                </Text>
              </Flex>
              <Image
                src={product.imageURL}
                alt={product.name}
                maxH="150px"
                objectFit="cover"
              />
              <Flex alignItems="center">
             
                <Text fontSize="md" fontWeight="bold" >
                  Price: ${product.price}
                </Text>
              </Flex>
<Box display={'flex'} alignItems='center' gap={2}>
<Text fontSize="md">Quantity:</Text>
              <NumberInput
                minWidth="60px"
                maxWidth="80px"
                defaultValue={1}
                size="sm"
                min={1}
                onChange={(newQuantity) =>
                  handleQuantityChange(product._id, newQuantity)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
</Box>
             
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


// TODO: import products and connect to S3
// TODO: add S3 s3://demo-bucket-sss/images/Broccoli.webp to mongoDB and retrieving