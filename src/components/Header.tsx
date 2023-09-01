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
import { NavigationItem } from '../types/navigationItems';
import { ProfileMenu } from '@/components/ProfileMenu';
import { AuthProvider } from '../pages/api/auth';

const paths: NavigationItem[] = [
  {
    label: "Current Weather",
    path: "/current",
  },
  {
    label: "Forecast Weather",
    path: "/forecast",
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
      bg={colorMode === "dark" ? "#999999" : "#CCCCCC"}
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
        {paths.map((item) => (
          <Box
            key={item.path}
            fontSize="sm"
            onClick={() => handlePathChange(item.path)}
            color={router.pathname === item.path ? "white" : "inherit"}
            bg={
              colorMode === "dark"
                ? router.pathname === item.path
                  ? "#292929"
                  : "#1A202C" 
                : router.pathname === item.path
                ? "#2C3477"
                : "#EDF2F7" 
            }
            cursor="pointer"
            _hover={{
              bg: colorMode === "dark" ? "#999999" : "#2F5C98",
              color: colorMode === "dark" ? "#000000" : "#FFFFFF",
            }}
            ml={1}
            mr={1}
            p={2}
            rounded="md"
          >
            <Text
              fontSize="15px"
              textTransform="uppercase"
              color={router.pathname === item.path ? "white" : "inherit"}
            >
              {item.label}
            </Text>
          </Box>
        ))}
      </Flex>
      )}
      <AuthProvider>
        <ProfileMenu />
      </AuthProvider>
    </Flex>
  );
});

