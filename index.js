const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_SECRET,
});

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.listen(process.env.PORT);
