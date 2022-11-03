const aws = require('aws-sdk');
require('dotenv').config();

aws.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const S3_BUCKET = process.env.BUCKET_NAME;

module.exports = { aws, s3UploadBucket: S3_BUCKET};