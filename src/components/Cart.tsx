import { Box, Icon, Text } from "@chakra-ui/react";
import { RiShoppingCartLine } from "react-icons/ri";

interface CartProps {
  itemCount: number;
}

export const Cart: React.FC<CartProps> = ({ itemCount }) => {
  return (
    <Box position="relative">
      <Icon as={RiShoppingCartLine} fontSize="24px" color="teal.500" />
      {itemCount > 0 && (
        <Box
          position="absolute"
          top="-4px"
          right="-4px"
          bg="red.500"
          borderRadius="50%"
          color="white"
          fontSize="sm"
          width="16px"
          height="16px"
          textAlign="center"
        >
          {itemCount}
        </Box>
      )}
    </Box>
  );
};

