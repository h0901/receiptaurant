const express = require("express");
const s3Request = require("../s3.js");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const router = express.Router();

const bucketName = "receiptaurant-images";
const region = "us-east-2";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

router.get("/", async (req, res) => {
    try {
        const url = await s3Request.generateUploadURL(); 
        res.send({ url });
      } catch (error) {
        console.error("Error generating S3 URL:", error);
        res.status(500).send({ error: "Failed to generate S3 URL" });
      }
});

async function generateViewImageURL(imageKey) {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: imageKey,
    });

    const imageURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    return imageURL;
}

router.get("/viewImage/:imageKey", async (req, res) => {
    try {
        const { imageKey } = req.params;
        const imageUrl = await generateViewImageURL(imageKey);
        res.send({ imageUrl });
    } catch (error) {
        console.error("Error fetching image URL:", error);
        res.status(500).send({ error: "Failed to fetch image URL" });
    }
});

module.exports = router;