import { ThemeComponents } from "@chakra-ui/react";
import { SITECOLORS } from "./siteColors";

export const components: ThemeComponents = {
  Button: {
    baseStyle: {
      fontWeight: "normal",
    },
    variants: {
      primary: {
        textTransform: "uppercase",
        fontWeight: "normal",
        letterSpacing: "wide",
        bg: SITECOLORS.primary.darkGrey3,
        color:SITECOLORS.primary.white,
        _hover: {
          bg: SITECOLORS.primary.black,
        },
        _dark: {
          bg: SITECOLORS.primary.darkBlue2,
          _hover: {
            bg: SITECOLORS.primary.black,
          },
        },
      },
    },
  },
};
