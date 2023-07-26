
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Set initial color mode here
    useSystemColorMode: false, // Set to true to enable system color mode detection
  },
});

export default theme;
