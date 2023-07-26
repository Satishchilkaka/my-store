import { ChakraProvider } from '@chakra-ui/react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <ChakraProvider>
      <Header />
      {children}
      {/* You can include other common layout elements here */}
    </ChakraProvider>
  );
};

export default Layout;
