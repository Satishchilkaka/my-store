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
} from "@chakra-ui/react";
import { observer } from 'mobx-react-lite';
import { useRouter } from "next/router";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavigationItem } from '../interface/navigationItems';
import { ProfileMenu } from '@/components/ProfileMenu';
import { AuthProvider } from '../pages/api/auth';
import Link from "next/link"; 
import { CartIcon } from '@/components/CartIcon'
import { useCart } from  '../util/cartFunction';
const paths: NavigationItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "orders",
    path: "/orders",
  },
];

interface Props {
  withNoMenus?: boolean;
}

export const Header: React.FC<Props> = observer(({ withNoMenus }: Props) => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const { colorMode } = useColorMode();
  const { cart } = useCart();

  const items = cart.length
  console.log('items', items);

  const handlePathChange = (path: string) => {
    if (path !== router.pathname) {
      router.push(path);
      setIsDrawerOpen(false);
    }
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={4}
      bg={colorMode === "dark" ?'#0D0D0D': '#292929' }
      display="flex"
      maxHeight="45px"
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
                        bg={router.pathname === item.path ? "#666666" : "grey"}
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
          {paths.map((item) => {
            const isCurrentPath = router.pathname === item.path;
            const isDarkMode = colorMode === "dark";
            const backgroundColor =
              isCurrentPath && isDarkMode
                ? "#333333"
                : isCurrentPath
                ? "#0D0D0D"
                : isDarkMode
                ? "#0D0D0D"
                : "#333333";
            const hoverBackgroundColor =
              isDarkMode
                ? "#666666"
                : "#0D0D0D"; 

            return (
              <Box
                key={item.path}
                fontSize="md"
                onClick={() => handlePathChange(item.path)}
                color={isCurrentPath ? "#666666" : "inherit"}
                bg={backgroundColor}
                cursor="pointer"
                _hover={{
                  bg: hoverBackgroundColor,
                }}
                ml={1}
                mr={1}
                p={2}
                rounded="md"
              >
                <Text
                  fontSize="15px"
                  textTransform="uppercase"
                  color= '#FFFFFF'
                >
                  {item.label}
                </Text>
              </Box>
            );
          })}
        </Flex>
      )}
      <AuthProvider>
       
      <Link href="/cart">
     
          <CartIcon itemCount= {cart.length}/>
      
      </Link>
        <ProfileMenu />
      </AuthProvider>
    </Flex>
  );
});
