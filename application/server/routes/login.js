const express = require("express");
const router = express.Router();
const Validator = require('../validator/loginValidation');
var UserError = require("../error/userError");
const UserModel = require("../models/login");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
//var db = require('../config/database');
/* var usernameValid = require('../validator/loginValidation').usernameValid;
var emailValid = require('../validator/loginValidation').emailValid;
var passwordValid = require('../validator/loginValidation').passwordValid; */



router.get('/', (req, res) => {
    res.send("Successful Login route response")
})

//will we be changing the user table so that it will have password and username instead of first name, last name?
//to login



router.post('/login', (req,res) => {
    console.log(req.body);
    let username = req.body.username;//not sure what the id is right now
    let password = req.body.password;//not sure what the id is right now
    console.log("what is username : "+username+"what is password : "+password);

    Validator.usernameValid(username)
    .then((usernameOK) => {console.log("Is username ok?"+usernameOK);
        if(usernameOK){
            
           // return Validator.passwordValid(password);
           return true;
        }else{
            console.log("username not ok");
            throw new UserError("Please enter a valid username", "/login", 200);
        }
    }).then((passwordOK) => {
        console.log("is the password ok? "+passwordOK);
        if(passwordOK){
            return UserModel.authenticate(username, password);
        }else{
            throw new UserError("Please enter a valid password", "/login", 200);
        }
    }).then((loggedUser) => {
        console.log("what is loggeduser? "+loggedUser);
        if(loggedUser > 0){
            //create a session on successful login
            console.log(username);
            req.session.username = username;
            req.session.userId = loggedUser;
            res.locals.logged = true;
        }else{
            throw new UserError("Invalid login", "/login", 200);
        }
    }).catch((err) => {
        //do something here?
        console.log(err);
    })
    
});

//to logout
router.post('/logout', (req, res) => {
    //do session stuff here?
});

module.exports = router;