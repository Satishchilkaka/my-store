import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { s3, bucketName, region } from '../../util/awsConfig';

const FAQ = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    listS3Objects();
  }, []);

  const listS3Objects = () => {
    if (!bucketName) {
      console.error('AWS_BUCKET_NAME is not defined');
      return;
    }

    const listObjectsParams = {
      Bucket: bucketName,
    };

    // s3.listObjects(listObjectsParams, (err, data) => {
    //   if (err) {
    //     console.error('Error listing objects:', err);
    //   } else {
    //     // Construct image URLs and store them in state
    //     const urls = data.Contents.map((object) => {
    //       return `https://${bucketName}.s3.${region}.amazonaws.com/${object.Key}`;
    //     });
    //     setImageUrls(urls);
    //   }
    // });
  };

  return (
    <Layout title="Products" noHeader={false} withNoMenus={true}>
      <Box>
        
        {imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index}`} />
        ))}
      </Box>
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
