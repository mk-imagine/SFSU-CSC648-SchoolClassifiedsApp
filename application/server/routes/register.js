const express = require("express");
const router = express();
const Validator = require('../validator/loginValidation');
var UserError = require("../error/userError");
const UserModel = require("../models/register");
const errorPrinter = require("../error/debugprinters");

//will we be changing the user table so that it will have password and username instead of first name, last name?
router.post('/register', (req, res) => {
    //
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;//not sure what the id is right now
    let email = req.body.email;//not sure what the id is right now
    let password = req.body.password;//not sure what the id is right now
    let confirmPassword = req.body.confirmPassword;//not sure what the id is right now

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
            return UserModel.createAccount(firstname, lastname, username, password, email);
        }
    }).then((userId) => {
        if(userId < 0){
            throw new UserError("User could not be created", "/register", 200);
        }else{
            console.log('User successfuly created!');
            res.redirect('/login');
        }
    })
    .catch((err) => {
        errorPrinter.errorPrint("user could not be made", err);
        if (err instanceof UserError) {
          errorPrinter.errorPrint(err.getMessage());
          req.flash('error', err.getMessage());//get error message from object
          res.status(err.getStatus());
          res.redirect(err.getRedirectURL());
        } else {
          next(err);
        }
      });

});

module.exports = router;