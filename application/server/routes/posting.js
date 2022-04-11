const express = require("express");
const router = express.Router();
const Validator = require('../validator/loginValidation');
const PostModel = require('../models/post');
var multer = require('multer');
var PostError = require('../error/userError');
const sharp = require("sharp");


var upload = multer({dest:'../user_images'});

router.get("/", (req, res) => {
    res.send("Successful Posting route response");
});

router.post('/post', upload.single('image'), (req,res) => {
    /* let category = req.body;//not sure what the id is right now
    let sellerId = req.session.user_id;//???
    let price = req.body;//not sure what the id is right now
    let name = req.body;//not sure what the id is right now
    let description = req.body;//not sure what the id is right now
    
    let course = req.body;//not sure what the id is right now
    let picture = req.file.path;
    let fileAsThumbNail = `thumbnail-${req.file.filename}`;
    let thumbnail = req.file.destination+"/"+fileAsThumbNail; */
    let category = null;//not sure what the id is right now
    let sellerId = 2;//???
    let price = 999;//not sure what the id is right now
    let name = "testing name";//not sure what the id is right now
    let description = "testing descrition";//not sure what the id is right now
    
    let course = "testing course";//not sure what the id is right now
    let picture = req.file.path;
    let fileAsThumbNail = `thumbnail-${req.file.filename}`;
    let thumbnail = req.file.destination+"/"+fileAsThumbNail;

    Validator.postNoNulls(category, sellerId, price, name, description, course, picture)
    .then((notNull) => {
        if(notNull){
            return sharp(picture).resize(200).toFile(thumbnail);
        }else{
            throw new PostError('Missing a required form input','/post',200);
        }
    }).then(() => {
        return PostModel.createPost(category, sellerId, price, name, description, picture, thumbnail, course);
    }).then((postLogged) => {
        if(postLogged > 0){
            //redirect somewhere?
        }else{
            throw new PostError('Unable to put post data into db', '/post', 200);

        }
    }).catch((err) => {
        //do somethng here
    })

});

module.exports = router;