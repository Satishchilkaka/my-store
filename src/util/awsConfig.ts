import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
  region: 'your-region',
});

const s3 = new AWS.S3();

export default s3;
