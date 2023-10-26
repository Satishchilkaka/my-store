import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Grid,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  Flex,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/util/cartFunction";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number; // Add quantity to track individual product quantity
  imageURL: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const api = process.env.NEXT_PUBLIC_API_URL;

  const { cart, addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${api}/v1/products`, {});
        setProducts(
          response.data.map((product: Product) => ({
            ...product,
            quantity: 1, 
          }))
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [api]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const handleAddToCart = (product: Product) => {
    if (product.quantity >= 1) {
      addToCart({ ...product });
      handleQuantityChange(product._id, 1);
    }
  };

  return (
    <Layout title="Products" noHeader={false} withNoMenus={true}>
      {isLoading ? (
        <Spinner size="xl" color="teal" />
      ) : (
        <Box p="4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            mb={4}
          />
          <Tabs
            isFitted
            variant="soft-rounded"
            colorScheme="green"
            border={"medium"}
            borderColor="#999999"
            onChange={(index) => {}}
          >
            <TabList>
              <Tab
                onClick={() => setSelectedCategory(null)}
                sx={{ fontWeight: "bold", fontSize: "xl" }}
              >
                All
              </Tab>
              <Tab
                onClick={() => setSelectedCategory("Vegetables")}
                sx={{ fontWeight: "bold", fontSize: "xl" }}
              >
                Vegetables
              </Tab>
              <Tab
                onClick={() => setSelectedCategory("Fruits")}
                sx={{ fontWeight: "bold", fontSize: "xl" }}
              >
                Fruits
              </Tab>
              <Tab
                onClick={() => setSelectedCategory("Meat")}
                sx={{ fontWeight: "bold", fontSize: "xl" }}
              >
                Meat
              </Tab>
            </TabList>
            <TabPanels></TabPanels>
          </Tabs>

          <Grid templateColumns="repeat(auto-fill, minmax(245px, 1fr))" gap={3}>
            {products
              .filter((product) =>
                selectedCategory && selectedCategory !== "All"
                  ? product.category === selectedCategory
                  : true
              )
              .filter((product) =>
                searchQuery && typeof searchQuery === "string" && product.name
                  ? product.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  : true
              )
              .map((product) => (
                <GridItem
                  key={product._id}
                  p={4}
                  borderRadius="md"
                  boxShadow="md"
                >
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
                    <Text fontSize="md" fontWeight="bold">
                      Price: ${product.price}
                    </Text>
                  </Flex>
                  <Flex display={"flex"} alignItems="center" gap={2}>
                    <Text fontSize="md">Quantity:</Text>
                    <NumberInput
                      minWidth="60px"
                      maxWidth="80px"
                      value={product.quantity}
                      size="sm"
                      min={1}
                      onChange={(newQuantityString) => {
                        const newQuantity = parseInt(newQuantityString, 10);
                        handleQuantityChange(product._id, newQuantity);
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                  <Button mt={2} colorScheme="teal" onClick={() => handleAddToCart(product)}>
                    Add to cart
                  </Button>
                </GridItem>
              ))}
          </Grid>
        </Box>
      )}
    </Layout>
  );
};

export default ProductList;
