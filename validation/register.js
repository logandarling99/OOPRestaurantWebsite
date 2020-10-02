const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    var errors = {};

    data.name = !isEmpty(data.name)?data.name:"";
    data.email = !isEmpty(data.email)?data.email:"";
    data.password = !isEmpty(data.password)?data.password:"";
    data.passwordConf = !isEmpty(data.passwordConf)?data.passwordConf:"";

    if(validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }
    else if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
    
    if(validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    if(validator.isEmpty(data.passwordConf)){
        errors.passwordConf = "Password confirmation is required";
    }

    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password must be at least 6 characters";
    }

    if(!validator.equals(data.password, data.passwordConf)){
        errors.passwordConf = "Passwords must match";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};