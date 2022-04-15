/*
 * This is login route. Data from the login form is sent here to be validated.
 * 
 */
const express = require("express");
const router = express.Router();
const Validator = require('../validator/loginValidation');
const UserError = require("../error/userError");
const debugPrint = require("../error/debugprinters");
const UserModel = require("../models/login");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send("Successful Login route response")
})

router.post('/login', (req, res, next) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    console.log("what is username : " + username + "what is password : " + password);

    Validator.usernameValid(username)
        .then((usernameOK) => {
            console.log("Is username ok?" + usernameOK);
            if (usernameOK) {
                return Validator.passwordValid(password);
            } else {
                console.log("username not ok");
                throw new UserError("Please enter a valid username", "/login", 200);
            }
        }).then((passwordOK) => {
            console.log("is the password ok? " + passwordOK);
            if (passwordOK) {
                return UserModel.authenticate(username, password);
            } else {
                throw new UserError("Please enter a valid password", "/login", 200);
            }
        }).then((loggedUser) => {
            console.log("what is loggeduser? " + loggedUser);
            if (loggedUser > 0) {
                // create a session on successful login
                req.session.username = username;
                req.session.userId = loggedUser;
                res.locals.logged = true;
                // req.flash('success','Login Successful');
                console.log("user is logged");
                res.redirect("/");//after login redirect user to this page
            } else {
                throw new UserError("Invalid login", "/login", 200);
            }
        }).catch((err) => {
            debugPrint.errorPrint("failed login");
            if (err instanceof UserError) {
                debugPrint.errorPrint(err.getMessage());
                // req.flash('error', err.getMessage());
                res.status(err.getStatus());
                res.redirect("/login");
            } else {
                next(err);
            }
        })
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            debugPrint.errorPrint('session could not be destroyed.');
            next(err);
        } else {
            debugPrint.successPrint('session was destroyed');
            res.clearCookie('csid');//must match key in session config in index.js
            res.json({ status: "OK", message: "user is logged out" });
            //res.locals.logged = false;
            res.f
        }
    })
});

module.exports = router;