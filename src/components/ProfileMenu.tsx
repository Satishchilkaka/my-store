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
} from '@chakra-ui/react';
import { useAuth } from '@/pages/useAuth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export const ProfileMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const uniqueId = 'user-profile-menu';
  const router = useRouter();
  const auth = useAuth(); // Assuming you have the `auth` object from your context

  const handleLogout = () => {
    auth.logout(); // This will clear the JWT token
    router.push('/login'); // Redirect to the login page after sign-out
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="User Profile"
        icon={<Avatar size="sm" src={auth.user?.avatarUrl} />}
        variant="ghost"
        id={uniqueId}
      />
      <MenuList aria-labelledby={uniqueId}>
        <MenuItem>
          <Flex alignItems="center">
            <Avatar size="sm" src={auth.user?.avatarUrl} />
            <Text ml={2}>{auth.user?.username}</Text>
          </Flex>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
        <MenuItem>
          <Flex alignItems="center">
            <Text mr={2}>Light Mode</Text>
            <Switch
              isChecked={colorMode === 'dark'}
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
