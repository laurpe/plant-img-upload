const dotenv = require("dotenv");
const AWS = require("aws-sdk");

dotenv.config();

const express = require("express");
const app = express();

const s3 = new AWS();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post(`/image_upload/upload`, (req, res) => {
    console.log(req);
});

app.listen(process.env.PORT);
