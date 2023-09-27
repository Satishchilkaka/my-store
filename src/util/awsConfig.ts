import AWS from 'aws-sdk';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION
const bucketName = process.env.AWS_BUCKET_NAME


const config = {
bucketName: bucketName,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
};

const s3 = new AWS.S3();

export default s3;

