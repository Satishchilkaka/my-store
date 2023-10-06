import { Box, Icon, Text, useColorMode } from "@chakra-ui/react";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
interface CartProps {
  itemCount: number;
}


export const Cart: React.FC<CartProps> = ({ itemCount }) => {
    const { colorMode } = useColorMode();
    const iconColor = colorMode === "dark" ? "white" : "black";

    return (
        <Box position="relative">
          <Icon as={FaShoppingCart} fontSize="24px" color={iconColor} />
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

