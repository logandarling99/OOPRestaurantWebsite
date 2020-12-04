const Validator = require("validator");
const empty = require("is-empty");



module.exports = function validateRegisterInput(input) {
  let errors = {};

//checking if input contains empty elements and if they are empty make sure they are only empty strings
function emptyCheck(inputPara){
  if(!empty(inputPara)){
    return inputPara;
  }
  else{
    return "";
  }
}
  //checking the emptiness of each individual input
  input.name = emptyCheck(input.name);
  input.email = emptyCheck(input.email);
  input.password = emptyCheck(input.password);
  input.passwordConf = emptyCheck(input.passwordConf);

  //checking name empty/length
  if (Validator.isEmpty(input.name)) {
    errors.name = "Name is required";
  }

  if (!Validator.isLength(input.name, {min:1, max: 40 })) {
    errors.name = "Name must be less than 40 characters";
  }

  //checking email empty, not correct email, length
  if (Validator.isEmpty(input.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(input.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isLength(input.email, {min:1, max: 30 })) {
    errors.email = "Email must be less than 30 characters";
  }

  // checking password empty, not matching to conf, length
  if (Validator.isEmpty(input.password)) {
    errors.password = "Password is required";
  }

  if (Validator.isEmpty(input.passwordConf)) {
    errors.passwordConf = "Confirm password is required";
  }

  if (!Validator.isLength(input.password, {min:1, max: 20 })) {
    errors.password = "Password must be less than 20 characters";
  }

  if (!Validator.equals(input.password, input.passwordConf)) {
    errors.passwordConf = "Passwords must match";
  }

  return {
    errors,
    validRegistration: empty(errors)
  };
};