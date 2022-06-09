const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post(`/image_upload/upload`, (req, res) => {
    console.log(req);
});

app.listen(process.env.PORT);
