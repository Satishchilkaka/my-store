import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;


// import { extendTheme } from '@chakra-ui/react';

// const config = {
//   initialColorMode: 'light', // Default color mode
//   useSystemColorMode: false, // Use the browser/system color mode
// };

// const theme = extendTheme({
//   config,
//   colors: {
//     light: {
//       // Light theme colors
//     },
//     dark: {
//       // Dark theme colors
//     },
//   },
//   fonts: {
//     // Define fonts
//   },
//   // Other Chakra UI theme settings
// });

// export default theme;
