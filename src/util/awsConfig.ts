import AWS from 'aws-sdk';

const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const region = process.env.NEXT_PUBLIC_AWS_REGION;
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME


AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

// Create an S3 instance
const s3 = new AWS.S3();

export { s3, bucketName, region };
