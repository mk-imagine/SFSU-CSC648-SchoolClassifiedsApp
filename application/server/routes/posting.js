const express = require("express");
const router = express.Router();
const Validator = require('../validator/loginValidation');
const PostModel = require('../models/post');
var multer = require('multer');
var PostError = require('../error/userError');
const sharp = require("sharp");
const mysql = require("mysql");


var upload = multer({dest:'./user_images'});

router.get("/", (req, res) => {
    res.send("Successful Posting route response");
});

router.post('/post', upload.single('image'), (req,res) => {
    console.log(req.body);
    let category = req.body.category;//not sure what the id is right now

    //let sellerId = req.session.user_id;//???
    let sellerId = 1;//for testing

    let price = req.body.price;//not sure what the id is right now
    let name = req.body.name;//not sure what the id is right now
    let description = req.body.description;//not sure what the id is right now
    
    let course = req.body.course;//not sure what the id is right now

    //I commented this out becuase the database doesn't support the long path name, I think
    //we should increase it
    let picture = req.file.path;
    let fileAsThumbNail = `thumb-${req.file.filename}`;
    let thumbnail = req.file.destination+"/"+fileAsThumbNail;
    
    /* let picture = req.file.path;
    let fileAsThumbNail = `thumb-${req.file.filename}`;
    let thumbnail = fileAsThumbNail; */
    

    Validator.postNoNulls(category, sellerId, price, name, description, course, picture)
    .then((notNull) => {
        console.log("in posting route after postnoNulls "+notNull);
        if(notNull){
            return sharp(picture).resize(200).toFile(thumbnail);
        }else{
            throw new PostError('Missing a required form input','/post',200);
        }
    }).then(() => {
        console.log("in posting after resizing the picture");
        return PostModel.createPost(category, sellerId, price, name, description, picture, thumbnail, course);
    }).then((postLogged) => {
        console.log("is post in database?: "+postLogged);
        if(postLogged){
            //redirect somewhere?
        }else{
            throw new PostError('Unable to put post data into db', '/post', 200);

        }
    }).catch((err) => {
        //do somethng here 
        console.log(err);
    })

});

module.exports = router;