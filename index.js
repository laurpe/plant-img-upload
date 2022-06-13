const dotenv = require("dotenv");
const express = require("express");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const { Readable } = require("stream");

dotenv.config();

const app = express();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

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
                console.log(error);
            } else {
                console.log(data);
                res.send({ imgName: imgName });
            }
        });
    }
);

// app.post("/api/upload", (req, res) => {

//     const imgName = uuidv4();

//     fs.stat(req.body, (err, file_info) => {
//         const bodyStream = fs.createReadStream(req.body);

//         upload(imgName, bodyStream, file_info.size);
//     });

//     TODO: how to pass binary data to bucket?

//     try {
//         upload(imgName, file);
//         res.send("img uuid");
//     } catch (error) {
//         res.status(500);
//         res.send("Could not upload image");
//     }
// });

app.listen(process.env.PORT);
