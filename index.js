const dotenv = require("dotenv");
const express = require("express");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const { Readable } = require("stream");
const cors = require("cors");

exports.handler = function (event, context, callback) {
    dotenv.config();

    const app = express();

    app.use(cors());

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
    });

    console.log(JSON.stringify(event));

    app.post(
        "/api/upload",
        bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }),
        (req, res) => {
            const fileStream = Readable.from(req.body);

            const imgName = uuidv4();

            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: imgName,
                Body: fileStream,
            };

            s3.upload(params, (error, data) => {
                if (error) {
                    callback({
                        message: "Could not upload image",
                        error: error,
                    });
                } else {
                    callback({ imgName: imgName });
                }
            });
        }
    );
};
