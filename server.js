const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const websiteBE = express();
websiteBE.use(bodyParser.urlencoded({extended: false}));
websiteBE.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
    .connect(
        db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));

websiteBE.use(passport.initialize());

require("./config/passport")(passport);

websiteBE.use("/api/users", users);

//loads the website on localhost after running server
const port = process.env.PORT || 5000;
websiteBE.listen(port, () => console.log(`Server up and running on port ${port}!`));