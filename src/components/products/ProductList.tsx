
import { Box, Text, VStack } from '@chakra-ui/react';
import { Product } from '../../interface/products';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    console.log('Product', products);
  return (
    <VStack spacing={4}>
      {products.map((product) => (
        <Box key={product._id} borderWidth="1px" p={4} borderRadius="md">
          <Text fontWeight="bold">{product.name}</Text>
          <Text>Category: {product.category}</Text>
          <Text>Price: ${product.price.toFixed(2)}</Text>
          <Text>Quantity: {product.quantity}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default ProductList;
