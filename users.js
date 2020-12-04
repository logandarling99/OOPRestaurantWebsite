const express = require("express");

const keys = require("./keys");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

// user schema 
const User = require("./user-schema");

// check validation of register and login
const registerValidation = require("./registerValidation")
const loginValidation = require("./loginValidation");

//POSTS route to login.js, logs in user and return the jwt token for authentication
router.post("/login", (req, res) => {
  // Form validation

  const { errors, validLogin } = loginValidation(req.body);

  // Check validation
  if (!validLogin) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Searching for email in DB
  User.findOne({ email }).then(foundUser => {
    //Checking if we hit a match
    if (!foundUser) {
      return res.status(404).json({ emailnotfound: "Email was not found" });
    }

    //checking if the password inputted matched with password found
    bcrypt.compare(password, foundUser.password).then(passwordMatch => {
      //checking if the passwords matched
      if (passwordMatch) {
        //creating JSON Web Token info
        const userInfo = {
          id: foundUser.id,
          name: foundUser.name
        };

        //Adding info to token and creating bearer token and authenticating it
        jwt.sign(
          //the info user is passing to login
          userInfo,
          //my mongodb key
          keys.secretOrKey,
          //token expires in 6 months
          {
            expiresIn: 15552000
          },
          (error, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      }
      else {
        return res.status(400).json({ passwordincorrect: "Incorrect password" });
      }
    });
  });
});

//POST route to register.js, Sends validations and checks against existing users
router.post("/register", (req, res) => {
  //checking if registration passed validation
const { errors, validRegistration} = registerValidation(req.body);
  if (!validRegistration) {
    return res.status(400).json(errors);
  }

  //finding email entry then getting back emails user
User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(400).json({ email: "This email already exists" });
    } 
    else {

      //creating new user and adding in input info
      const usermodel= new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      //generating hash for password and storing it in db
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(usermodel.password, salt, (err, hash) => {
          if (err) throw err;
          usermodel.password = hash;
          usermodel
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//POST route to cart which will push new items into a users cart
router.post("/cart", (req, res) => {

  //using regex to decipher input
  console.log(JSON.stringify(req.body));
  body = JSON.stringify(req.body);
  var bodyArr = body.split(/[^A-Za-z0-9]/);
  const id = bodyArr[26];
  const name = bodyArr[10];
  const price = bodyArr[18];

  //creating new item to be inserted
  const inItem = {
    name: name,
    price: price
  }
  console.log(inItem);
  console.log(id);

  //sorting by user id and pushing new item onto cart
  User.findByIdAndUpdate(id,
    { $push: { "cart": inItem } },
    { safe: true, upsert: true },
    function (err, model) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(model);
    }
  );
});

//POSTS route to remove cart items WIP
router.post("/removecart", (req, res) => {

  //using regex to decipher input
  console.log(JSON.stringify(req.body));
  body = JSON.stringify(req.body);
  var bodyArr = body.split(/[^A-Za-z0-9]/).filter(Boolean);
  console.log(bodyArr);
  const id = bodyArr[1];
  const name = bodyArr[3];
  const price = bodyArr[5];

  //creating new search item
  const inItem = {
    name: name,
    price: price
  }
  console.log(inItem);
  console.log(id);
  /*
    User.findByIdAndUpdate(id,
        {$pop: {"cart": req.params.ite}},
          function(err, model){
            if(err){
              console.log(err);
              return res.send(err);
            }
            return res.json(model);
          }  
      );*/
});


//POST Route finding a cart from user using user id
router.get("/getCart/:_id", (req, res) => {
  console.log(req);
  console.log(req.params._id);
  //console.log(req);

  //getting user id from request info
  const id = req.params._id;
  console.log(id);

  //finding user id and returning cart item
  User.findById(id).then(user => {
    console.log(user.cart);
    return res.json(user.cart);
  }).catch(console.log("bad cart"));
});

module.exports = router;