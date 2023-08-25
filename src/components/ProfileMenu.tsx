import React from 'react';
import jwtDecode from 'jwt-decode'; 
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

import { MdPerson } from 'react-icons/md';


export const ProfileMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const uniqueId = 'user-profile-menu';
  const router = useRouter();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    router.push('/');
  };

  interface DecodedToken {
    id: string;
    role: string;
    username: string; // Add the 'username' property
    
  }
    const decodedToken = auth.token ? (jwtDecode(auth.token) as DecodedToken) : null;
  const username = decodedToken ? decodedToken?.username : null;

  console.log(username);
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
           <Text ml={2}>{username}</Text>     {/*Display user name from token */}
          </Flex>
        </MenuItem>
        
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
        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};
