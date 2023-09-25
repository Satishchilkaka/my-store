import s3 from './awsConfig'

async function testAWSConnection() {
    try {
      // List S3 buckets as a test operation
      const data = await s3.listBuckets().promise();
  
      // Use the nullish coalescing operator to handle possible undefined value
      const buckets = data.Buckets ?? [];
  
      // If the operation is successful, log the bucket names
      console.log('Connected to AWS. Buckets:');
      buckets.forEach((bucket) => {
        console.log(bucket.Name);
      });
    } catch (error) {
      console.error('Error connecting to AWS:', error);
    }
  }

testAWSConnection();
