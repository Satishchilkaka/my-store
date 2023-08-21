import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  IconButton,
  Flex,
  useColorMode,
  Switch,
} from "@chakra-ui/react";

export const ProfileMenu = () => {
  const user = {
    name: "John Doe",
    avatarUrl: "URL_TO_AVATAR",
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const uniqueId = "user-profile-menu"; // Generate a unique ID
  const [isClient, setIsClient] = useState(false)
 
 
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="User Profile"
        icon={<Avatar size="sm" src={user.avatarUrl} />}
        variant="ghost"
        id={uniqueId} // Use the unique ID here
      />
      <MenuList aria-labelledby={uniqueId}> {/* Use the unique ID as aria-labelledby */}
        <MenuItem>
          <Flex alignItems="center">
            <Avatar size="sm" src={user.avatarUrl} />
            <Text ml={2}>{user.name}</Text>
          </Flex>
        </MenuItem>
        <MenuItem>
          <Flex alignItems="center">
            <Text mr={2}>Light Mode</Text>
            <Switch
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
              size="lg"
              colorScheme="blue"
            />
            <Text ml={2}>Dark Mode</Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
