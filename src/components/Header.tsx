import React from "react";
import {
  Flex,
  IconButton,
  Switch,
  useColorMode,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useRouter } from "next/router";

type NavigationItem = {
  label: string;
  path: string;
};

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
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const getSelectedPath = () => { 
    const route = router.pathname 
    return route

  }
const currentPath = getSelectedPath();

  const handlePathChange = (path: string) => {
    if (path !== router.pathname) {
      router.push(path);
    }
  };

  console.log('path', currentPath)
  return (
    <Flex justifyContent="space-between" alignItems="center" p={4} bg="#CCCCCC">
      <Flex alignItems="end" gap={1}>
        {paths.map((item) => (
          <Flex
            alignItems={"center"}
            
            minWidth={200}
            h={14}
            mr={1}
            ml={1}
            border={'md'}
            rounded={'md'}
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
            
bg={
  currentPath == item.path ?
  '#666666' : 'grey'
}


          >
            <Text fontSize={"20px"} textTransform={"uppercase"} ml={3} mr={2}>
              {" "}
              {item.label}
            </Text>
          </Flex>
        ))}
        <IconButton
          aria-label="Toggle Theme"
          icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
          onClick={toggleColorMode}
        />
      </Flex>
    </Flex>
  );
};
