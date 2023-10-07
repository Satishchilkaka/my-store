// CartIcon.tsx
import React from "react";
import { Box, Flex, Icon, Spacer, Text, useColorMode } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";


interface CartIconProps {
  itemCount: number;
}

export const CartIcon: React.FC<CartIconProps> = ({ itemCount }) => {
  const { colorMode } = useColorMode();
  const iconColor = colorMode === "dark" ? "light" : "black";


  return (
    <Flex justifyContent="flex-end">
       <Spacer />
    <Box position="relative" justifyContent="flex-end">
   
      <Icon as={FaShoppingCart} fontSize="26px" color="white" mt={"8px"}/>
      {itemCount > 0 && (
        <Box
          position="absolute"
          top="-2px"
          right="-15px"
          bg="red.500"
          borderRadius="100%"
          color="white"
          fontSize="sm"
          width="23px"
          height="23px"
          textAlign="center"
        >
          {itemCount}
        </Box>
      )}
    </Box>
    </Flex>
  );
};

