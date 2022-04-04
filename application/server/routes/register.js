const express = require("express");
const router = express();
const Validator = require('../validator/loginValidation');
var UserError = require("../error/userError");
const UserModel = require("../models/register");
/* var usernameValid = require('../validator/loginValidation').usernameValid;
var emailValid = require('../validator/loginValidation').emailValid;
var passwordValid = require('../validator/loginValidation').passwordValid;
var cpasswordValid = require('../validator/loginValidation').cpasswordValid; */
//will we be changing the user table so that it will have password and username instead of first name, last name?
router.post('/register', (req, res) => {
    //
    let username = req.body;//not sure what the id is right now
    let email = req.body;//not sure what the id is right now
    let password = req.body;//not sure what the id is right now
    let confirmPassword = req.body;//not sure what the id is right now

    Validator.usernameValid(username)
    .then((usernameOK) => {
        if(usernameOK){
            return Validator.emailValid(email);
        }else{
            throw new UserError("Enter a valid username", "/register", 200);
        }
    }).then((emailOK) => {
        if(emailOK){
            return Validator.passwordValid(password);
        }else{
            throw new UserError("Enter a valid SFSU email", "/register", 200);
        }
    }).then((passwordOK) => {
        if(passwordOK){
            return Validator.cpasswordValid(password, confirmPassword);
        }else{
            throw new UserError("Enter a valid password", "/register", 200);
        }
    }).then((bothPasswordsOK) => {
        if(bothPasswordsOK){
            return UserModel.usernameExist(username);
        }else{
            throw new UserError("Your passwords don't match", "/register", 200);
        }
    }).then((usernameExists) => {
        if(usernameExists){
            throw new UserError("This username already exists", "/register", 200);
        }else{
            return UserModel.emailExist(email);
        }
    }).then((emailExists) => {
        if(emailExists){
            throw new UserError("This email already exists", "/register", 200);
        }else{
            return UserModel.createAccount(username, password, email);
        }
    }).then((userId) => {
        if(userId < 0){
            throw new UserError("User could not be created", "/register", 200);
        }else{
            //do something?
        }
    })

});

module.exports = router;