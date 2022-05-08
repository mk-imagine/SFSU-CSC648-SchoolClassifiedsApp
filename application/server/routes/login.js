/*
 * This is login route. Data from the login form is sent here to be validated.
 *
 */
const express = require("express");
const router = express.Router();
const Validator = require("../validator/loginValidation");
const UserError = require("../error/userError");
const debugPrint = require("../error/debugprinters");
const UserModel = require("../models/login");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Login Route Test
 */
router.get("/", (req, res) => {
  res.send("Successful Login route response");
});

/**
 * Login Router
 */
router.post("/login", (req, res, next) => {
  console.log(req);
  //console.log("what is req.body");
  //console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;
  console.log(
    "what is email : " + email + "what is password : " + password
  );

  // Validator for form data
  Validator.emailValid(email)
    // Check username
    .then((emailOK) => {
      console.log("Is email ok?" + emailOK);
      if (emailOK) {
        return UserModel.authenticate(email, password);
        //return Validator.passwordValid(password);
      } else {
        console.log("email not ok");
        throw new UserError("Please enter a valid email", "/login", 200);
      }
    })
    // Check password
    /* .then((passwordOK) => {
      console.log("is the password ok? " + passwordOK);
      if (passwordOK) {
        return UserModel.authenticate(username, password);
      } else {
        throw new UserError("Please enter a valid password", "/login", 200);
      }
    }) */
    // Create session for user
    .then((loggedUser) => {
      console.log("what is loggeduser? " + loggedUser);
      if (loggedUser > 0) {
        // create a session on successful login
        req.session.username = email;
        req.session.userId = loggedUser;
        res.locals.logged = true;
        // req.flash('success','Login Successful');
        console.log("user is logged");
        //res.send("/"); // FOR DEPLOYMENT
        // res.send("http://localhost:3000/");
        //status = 1 succesful,
        //userid = loggedUser
        //use res.json
        //user id
        res.send({
          token: "test123",
          user_id: loggedUser
        });
      } else {
        throw new UserError("Invalid login", "/login", 200);
      }
    })
    .catch((err) => {
      debugPrint.errorPrint("failed login");
      if (err instanceof UserError) {
        debugPrint.errorPrint(err.getMessage());
        // req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.send("/login");
        //cookie data must be sent here
      } else {
        next(err);
      }
    });
});

/**
 * Logout Router
 */
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      debugPrint.errorPrint("session could not be destroyed.");
      next(err);
    } else {
      debugPrint.successPrint("session was destroyed");
      res.clearCookie("csid"); //must match key in session config in index.js
      res.json({ status: "OK", message: "user is logged out" });
      //res.locals.logged = false;
      res.f;
    }
  });
});

router.get("/getUser/:userId", async (req, res, next) => {
  try {
    const results = await UserModel.getUser(req.params.userId);
    if (results && results.length) {
      res.send(results);
    } else {
      res.send([]);
    }
  } catch {
    next(err);
  }
});

router.post("/resetPassword", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  console.log("username: "+username+" email: "+email+" password: "+password);
  UserModel.resetPassword(username, email, password)
  .then((result) => {
    console.log(result);
    if(result != -1){
      res.send({status: 200});
    }else{
      res.send({status: 500});
    }
  }).catch((err) => {
    console.log(err);
  })
});

router.post("/changeUsername", (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  console.log("email: "+ email+" username: "+username);
  UserModel.changeUsername(username, email)
  .then((result) => {
    console.log(result);
    if(result > 0){
      res.send({status:200});
    }else{
      res.send({status:500});
    }
  }).catch((err) => {
    console.log(err);
  })
});

module.exports = router;
