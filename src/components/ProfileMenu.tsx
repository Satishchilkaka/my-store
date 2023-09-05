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

  interface userProfile {
    id: string;
    role: string;
    username: string; 
    profile: {
      firstName: string,
      lastName: string
    }
    
  }
    const getUserProfileData = auth.token ? (jwtDecode(auth.token) as userProfile) : null;
  const firstName = getUserProfileData ? getUserProfileData?.profile.firstName: null
  const lastName = getUserProfileData ? getUserProfileData?.profile.lastName: null;

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
           <Text ml={2}>{firstName} {lastName}</Text>     
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
