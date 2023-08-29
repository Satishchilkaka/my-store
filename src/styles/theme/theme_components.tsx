import { ThemeComponents } from "@chakra-ui/react";

export const components: ThemeComponents = {
    Button: {
        baseStyle: {
            fontWeight: 'normal',
        },
        variants: {
            primary: {
                textTransform: 'uppercase',
                fontWeight: 'normal',
                letterSpacing: 'wide',
                bg: '#0D0D0D0D', // Reddish color
                color: '#FFFFFF', // White text
                _hover: {
                    bg: '#C53030', // Slightly darker on hover
                },
                _dark: {
                    bg: '#9B2C2C', // Darker background for dark mode
                }
            }
        }
    }
}
