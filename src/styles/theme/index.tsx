import { extendTheme } from '@chakra-ui/react';
import { components} from '@/styles/theme/theme_components'

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
    background: 'IAIAIA', 
    text: 'white', 
  },
};
export const theme = extendTheme({
  colors: {
    light: lightTheme,
    dark: darkTheme,
  },
  components
});
