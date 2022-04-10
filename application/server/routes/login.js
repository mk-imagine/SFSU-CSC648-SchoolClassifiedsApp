const express = require("express");
const router = express();
const Validator = require('../validator/loginValidation');
var UserError = require("../error/userError");
const UserModel = require("../models/login");
/* var usernameValid = require('../validator/loginValidation').usernameValid;
var emailValid = require('../validator/loginValidation').emailValid;
var passwordValid = require('../validator/loginValidation').passwordValid; */
//will we be changing the user table so that it will have password and username instead of first name, last name?
//to login
router.post('/login', (req,res) => {
    let username = req.body;//not sure what the id is right now
    let password = req.body;//not sure what the id is right now

    Validator.usernameValid(username)
    .then((usernameOK) => {
        if(usernameOK){
            return Validator.passwordValid(password);
        }else{
            throw new UserError("Please enter a valid username", "/login", 200);
        }
    }).then((passwordOK) => {
        if(passwordOK){
            return UserModel.authenticate(username, password);
        }else{
            throw new UserError("Please enter a valid password", "/login", 200);
        }
    }).then((loggedUser) => {
        if(loggedUser > 0){
            //create a session on successful login
            req.session.username = username;
            req.session.userId = loggedUser;
            res.locals.logged = true;
        }else{
            throw new UserError("Invalid login", "/login", 200);
        }
    }).catch((err) => {
        //do something here?
    })
    
});

//to logout
router.post('/logout', (req, res) => {
    //do session stuff here?
});

module.exports = router;