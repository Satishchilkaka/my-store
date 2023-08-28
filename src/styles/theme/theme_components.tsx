import { ThemeComponents } from "@chakra-ui/react";

export const components: ThemeComponents = {
    Button: {
        baseStyle: {
            fonrWeight: 'normal',
        },
        variants: {
            primary: {
                textTransform: 'uppercase',
                fontWeight: 'normal',
                letterSpacing: 'wide',
                bg: '#2C3477',
                color:'#CCCCCC',
                _hover: {
                    bg: '#2F5C98',

                },
                _dark: {
                    _hover: {
                        bg:'#0D0D0D',
                    }
                }
            }
        }
    }
}