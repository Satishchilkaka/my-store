import React, { useState } from "react";
import {
  Flex,
  IconButton,
  useColorMode,
  Box,
  Text,
  useMediaQuery,
  Drawer,
  Button,
  VStack,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavigationItem } from '../types/navigationItems'; 

import {ProfileMenu} from '@/components/ProfileMenu'
const paths: NavigationItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Current Weather",
    path: "/current",
  },
  {
    label: "Forecast Weather",
    path: "/forecast",
  },
];

export const Header: React.FC = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getSelectedPath = () => {
    const route = router.pathname;
    return route;
  };
  const currentPath = getSelectedPath();

  const handlePathChange = (path: string) => {
    if (path !== router.pathname) {
      router.push(path);
      setIsDrawerOpen(false);
    }
  };

  const [isMobile] = useMediaQuery("(max-width: 600px)");

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={4}
      bg="#CCCCCC"
      display={"flex"}
   
    >
      {isMobile ? (
        <>
          <IconButton
            aria-label="Open Navigation"
            icon={<FaBars />}
            onClick={() => setIsDrawerOpen(true)}
            bgColor={"#999999"}
            _hover={{ bg: "#292929", color: "white" }}
          />
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            placement="left"
          >
            <DrawerOverlay>
              <DrawerContent>
                <DrawerHeader
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  Navigation
                  <IconButton
                    aria-label="Close Navigation"
                    icon={<FaTimes />}
                    onClick={() => setIsDrawerOpen(false)}
                  />
                </DrawerHeader>
                <DrawerBody>
                  <VStack align="stretch">
                    {paths.map((item) => (
                      <Button
                        key={item.path}
                        fontSize={["sm", "md"]}
                        size={["sm", "md"]}
                        onClick={() => handlePathChange(item.path)}
                        color={
                          item.path === router.pathname ? "black" : "inherit"
                        }
                        _hover={{ bg: "#292929", color: "white" }}
                        _dark={{
                          bg: "#999999",
                          _hover: {
                            bg: "#000000",
                          },
                        }}
                        bg={currentPath === item.path ? "#666666" : "grey"}
                        display="flex"
                      >
                        {item.label}
                      </Button>
                    ))}
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        
        </>
      ) : (
        <Flex alignItems="end" gap={1}>
          {paths.map((item) => (
            <Box
              key={item.path}
              fontSize="md"
              onClick={() => handlePathChange(item.path)}
              color={item.path === router.pathname ? "black" : "inherit"}
              cursor="pointer"
              _hover={{ bg: "#292929", color: "white" }}
              _dark={{
                bg: "#999999",
                _hover: {
                  bg: "#000000",
                },
              }}
              bg={currentPath === item.path ? "#666666" : "grey"}
              ml={1}
              mr={1}
              p={2}
              rounded="md"
              minHeight="40px"
            >
              <Text fontSize="20px" textTransform="uppercase">
                {item.label}
              </Text>
            </Box>
          ))}
     



        </Flex>
      )}
      
      <ProfileMenu/>
     
    </Flex>
    
  );
};
