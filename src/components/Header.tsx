import { Box, Flex, Switch, useColorMode, Text } from "@chakra-ui/react";

import { WeatherNavigation } from "./WeatherNavigation";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  // const [isDarkMode, setIsDarkMode] = useState(colorMode === "dark");

  // useEffect(() => {
  //   setIsDarkMode(colorMode === "dark");
  // }, [colorMode]);

  return (



     <Flex>
      <Box justifyContent={'end'}>
      {/* <WeatherNavigation /> */}
      </Box>
      
   
    <Flex >
        <Box textAlign={'center'}  display={'flex'} alignItems={'center'}>
          <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
        </Box>
        </Flex>
      </Flex>
  );
};
