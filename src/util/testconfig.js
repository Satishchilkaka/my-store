import s3 from './awsConfig'

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

testAWSConnection();
