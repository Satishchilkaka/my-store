import AWS from 'aws-sdk';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

const s3 = new AWS.S3();

export default s3;

