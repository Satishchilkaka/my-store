import { Layout } from '@/components/Layout';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { s3, bucketName, region } from '../../util/awsConfig';

const FAQ = () => {
  console.log('aws', s3);

  const listObjectsParams = {
    Bucket: bucketName, // Use the imported bucketName here
  };

  s3.listObjects(listObjectsParams, (err, data) => {
    if (err) {
      console.error('Error listing objects:', err);
    } else {
      data.Contents.forEach((object) => {
        const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${object.Key}`;
        console.log('Image URL:', imageUrl);
      });
    }
  });

  return (
    <Layout title="Products" noHeader={false} withNoMenus={true}>
      <Box></Box>
      <Flex direction="column" align="center" justify="center" h="100vh">
        <Heading as="h1" size="xl" mb={4}>
          FAQ Page
        </Heading>
        <p>This is the FAQ page content.</p>
      </Flex>
    </Layout>
  );
};

export default FAQ;
