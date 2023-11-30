const fileUpload = require("express-fileupload");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const express = require("express");
const app = express();

app.use(express.json());
app.use(fileUpload());

require("dotenv").config();

const s3Config = {
    region: 'eu-west-3',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const s3Client = new S3Client(s3Config);

const postImage = async (req, res) => {
    const image = req.files.image;
    const imageName = req.files.image.name

    const bucketParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName,
        Body: image.data,
    }

    try {
        const data = await s3Client.send(new PutObjectCommand(bucketParams));
        res.send(data)
    } catch (err) {
        console.log("Error", err)
    }
};

module.exports = postImage;