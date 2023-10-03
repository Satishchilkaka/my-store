// import { Layout } from "@/components/Layout";
// import { Box, Grid, Input, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
// import products from "../products";
// import { useState } from "react";


// const productSearch = () => {
  




//     return (
//         <Layout title="Products" noHeader={false} withNoMenus={true}>
//           <Box p="4">
//             <Input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               mb={4}
//             />
//             <Tabs
//               isFitted
//               variant="enclosed"
//               onChange={(index) => {
//                 // Handle tab change here
//                 // You can update the selectedCategory state
//               }}
//             >
//               <TabList>
//                 <Tab>Veggies</Tab>
//                 <Tab>Produce</Tab>
//                 <Tab>Meat</Tab>
//               </TabList>
//               <TabPanels>
//                 <TabPanel>Content for Veggies</TabPanel>
//                 <TabPanel>Content for Produce</TabPanel>
//                 <TabPanel>Content for Meat</TabPanel>
//               </TabPanels>
//             </Tabs>
//             <Grid templateColumns="repeat(auto-fill, minmax(245px, 1fr))" gap={3}>
//   {/* {products
//     .filter((product) =>
//       selectedCategory ? product.category === selectedCategory : true
//     )
//     .filter((product) =>
//       product.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .map((product) => (
//       // Render product cards as before
//     ))} */}
// </Grid>

//           </Box>
//         </Layout>
//       );
      
// }