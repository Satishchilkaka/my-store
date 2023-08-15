import { extendTheme } from '@chakra-ui/react';

const colors = {
  primary: {
    50: '#E3F2FD',
  },
};

const lightTheme = {
  colors: {
    ...colors,
    background: 'white', 
    text: 'black', 
  },
};

const darkTheme = {
  colors: {
    ...colors,
    background: '#121212', 
    text: 'white', 
  },
};
export const theme = extendTheme({
  colors: {
    light: lightTheme,
    dark: darkTheme,
  },
});
