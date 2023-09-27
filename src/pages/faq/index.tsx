import { Layout } from '@/components/Layout';
import { Box, Flex, Heading } from '@chakra-ui/react';
import s3 from '../../util/awsConfig'
const FAQ = () => {
  const awss3 = s3
  console.log('awsConfig', awss3)
  async function testAWSConnection() {
    try {
      const data = await s3.listBuckets().promise();
  
      const buckets = data.Buckets ?? [];
  
      console.log('Connected to AWS. Buckets:');
      buckets.forEach((bucket) => {
        console.log(bucket.Name);
      });
    } catch (error) {
      console.error('Error connecting to AWS:', error);
    }
  }
  testAWSConnection()
  return (
    <Layout title="Products" noHeader={false} withNoMenus={true}>
<Box>
  
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
