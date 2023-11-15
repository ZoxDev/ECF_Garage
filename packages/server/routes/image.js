const express = require("express");
const app = express();
const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const fileUpload = require("express-fileupload");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// ADD IMAGES SYSTEME
// S3
app.use(express.json());
app.use(fileUpload());

require("dotenv").config();

// Expliquer tout ce qui se passe ici + les autorisation du bucket pour récup le lien image
const s3Config = {
    region: 'eu-west-3',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const s3Client = new S3Client(s3Config);

// Post image
router.post("", authorization, async (req, res) => {
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
});

module.exports = router;