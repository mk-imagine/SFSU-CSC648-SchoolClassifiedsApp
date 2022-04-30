/* 
 * This is the post route.
 * Data incoming from the form will be validated and sent to the database item table
 *
 */
const express = require("express");
const router = express.Router();
const Validator = require('../validator/loginValidation');
const PostModel = require('../models/post');
var multer = require('multer');
var PostError = require('../error/userError');
const sharp = require("sharp");
const mysql = require("mysql");

var upload = multer({ dest: './user_images' });

/**
 * Post Router Test
 */
router.get("/", (req, res) => {
    res.send("Successful Posting route response");
});

/**
 * Create Post Router
 */
router.post('/post', upload.single('image'), (req, res) => {
    console.log(req.body);
    let category = req.body.category;

    //let sellerId = req.session.user_id;//???
    let sellerId = 1;//for testing
    console.log("what is sellerid : " + sellerId);
    let price = req.body.price;
    let name = req.body.name;
    let description = req.body.description;
    let course = req.body.course;

    let picture = req.file.path;
    let picture2 = req.file.filename;
    let fileAsThumbNail = `thumb-${req.file.filename}`;
    let thumbnail = req.file.destination + "/" + fileAsThumbNail;

    // Validator for post form
    Validator.postNoNulls(category, sellerId, price, name, description, course, picture)
        // Check if any fields are null
        .then((notNull) => {
            console.log("in posting route after postnoNulls " + notNull);
            if (notNull) {
                return sharp(picture).resize(200).toFile(thumbnail);
            } else {
                throw new PostError('Missing a required form input', '/post', 200);
            }
        })
        // Create post via PostModel
        .then(() => {
            console.log("in posting after resizing the picture");
            return PostModel.createPost(category, sellerId, price, name, description, picture2, thumbnail, course);
        })
        // Redirect to Home Page upon successful post
        .then((postLogged) => {
            if (postLogged) {
                //redirect somewhere?
                console.log("is post in database?: " + postLogged);
                //res.redirect('/');
                res.send("http://localhost:3000/");
            } else {
                throw new PostError('Unable to put post data into db', '/post', 200);
            }
        }).catch((err) => {
            //do somethng here 
            console.log(err);
        })
});

module.exports = router;