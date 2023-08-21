// import { useState } from "react";
// import {
//   Box,
//   Flex,
//   Text,
//   IconButton,
//   Icon,
//   Collapse,
//   VStack,
// } from "@chakra-ui/react";
// import { FaChevronDown } from "react-icons/fa";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { NavigationItem } from '../types/navigationItems';

// interface SecondaryMenuProps {
//   paths: NavigationItem[];
// }

// export const SecondaryMenu: React.FC<SecondaryMenuProps> = ({ paths }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [selectedPath, setSelectedPath] = useState<string | null>(null);

//   const handleOptionClick = (path: string) => {
//     setSelectedPath(path);
//     setIsMenuOpen(false);
//   };

//   return (
//     <Flex align="center" justify="flex-end">
//       <IconButton
//         aria-label="Toggle Menu"
//         icon={<Icon as={GiHamburgerMenu} />}
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         mr={2}
//       />
//       <Collapse in={isMenuOpen} animateOpacity>
//         <VStack
//           align="stretch"
//           p={2}
//           mt={2}
//           bg="white"
//           boxShadow="md"
//           borderRadius="md"
//         >
//           {paths.map((item) => (
//             <Box
//               key={item.path}
//               py={1}
//               cursor="pointer"
//               onClick={() => handleOptionClick(item.path)}
//             >
//               <Text
//                 as="a"
//                 href={item.path}
//                 textDecoration="none"
//                 color={selectedPath === item.path ? "blue.500" : "black"}
//               >
//                 {item.label}
//               </Text>
//             </Box>
//           ))}
//         </VStack>
//       </Collapse>
//       <IconButton
//         aria-label="Expand Menu"
//         icon={<Icon as={FaChevronDown} />}
//         ml={2}
//       />
//     </Flex>
//   );
// };
