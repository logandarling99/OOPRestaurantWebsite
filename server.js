const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const websiteBE = express();

websiteBE.use(bodyParser.urlencoded({extended: false}));
websiteBE.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
    .connect(
        db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

websiteBE.listen(port, () => console.log(`Server up and running on port ${port} !`));