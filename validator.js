const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(input){
    var errors = {};

    input.name = !isEmpty(input.name)?input.name:"";
    input.email = !isEmpty(input.email)?input.email:"";
    input.password = !isEmpty(input.password)?input.password:"";
    input.passwordConf = !isEmpty(input.passwordConf)?input.passwordConf:"";

    if(validator.isEmpty(input.email)){
        errors.email = "Email field is required";
    }
    else if(!validator.isEmail(input.email)){
        errors.email = "Email is invalid";
    }
    
    if(validator.isEmpty(input.password)){
        errors.password = "Password field is required";
    }

    if(validator.isEmpty(input.passwordConf)){
        errors.passwordConf = "Password confirmation is required";
    }

    if(!validator.isLength(input.password, {max: 20})){
        errors.password = "Password must be at least 6 characters";
    }

    if(!validator.isLength(input.email, {max: 20})){
        errors.password = "Password must be at least 6 characters";
    }
    if(!validator.isLength(input.name, {max: 20})){
        errors.password = "Password must be at least 6 characters";
    }

    if(!validator.equals(input.password, input.passwordConf)){
        errors.passwordConf = "Passwords must match";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};


module.exports = function validateLoginInput(input){
    var errors = {};

    input.email = !isEmpty(input.email)?input.email:"";
    input.password = !isEmpty(input.password)?input.password:"";

    if(validator.isEmpty(input.email)){
        errors.email = "Email field is required";
    }
    else if(!validator.isEmail(input.email)){
        errors.email = "Email is invalid";
    }

    if(validator.isEmpty(input.password)){
        errors.password = "Password field is required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};