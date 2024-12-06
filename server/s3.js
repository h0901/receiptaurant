const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");
require("dotenv").config();

const region = "us-east-2";
const bucketName = "receiptaurant-images";
const accessKeyId = "AKIA4WJPWKRLYJUQIVMK"; //process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = "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"; //process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function generateUploadURL() {
  const rawBytes = crypto.randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: imageName,
  });

  const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  return uploadURL;
}

module.exports = { generateUploadURL };
