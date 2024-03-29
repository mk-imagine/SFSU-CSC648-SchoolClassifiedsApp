/*
 * This is the post route.
 * Data incoming from the form will be validated and sent to the database item table
 *
 */
const express = require("express");
const router = express.Router();
const Validator = require("../validator/loginValidation");
const PostModel = require("../models/post");
const multer = require("multer");
const PostError = require("../error/userError");
const sharp = require("sharp");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./user_images");
  },
  filename: function (req, file, cb) {
    let fileExt = file.mimetype.split("/")[1];
    let randomName = crypto.randomBytes(22).toString("hex");
    cb(null, `${randomName}.${fileExt}`);
  }
});

var upload = multer({ storage: storage });

/**
 * Post Router Test
 */
router.get("/", (req, res) => {
  res.send("Successful Posting route response");
});

/**
 * Create Post Router
 */
router.post("/post", upload.single("image"), (req, res) => {
  console.log(req.body);
  let category = req.body.category;

  //let sellerId = req.session.user_id;//???
  let sellerId = req.body.sellerId;

  let price = req.body.price;
  let name = req.body.name;
  let description = req.body.description;
  let course = req.body.course;

  let picture = req.file.path;
  let picture2 = req.file.filename;
  let fileAsThumbNail = `thumb-${req.file.filename}`;
  let thumbnail = fileAsThumbNail;
  let thumbnailpath= req.file.destination + "/" + fileAsThumbNail;

  // Validator for post form
  Validator.postNoNulls(category, sellerId, price, name, description, picture)
    // Check if any fields are null
    .then((notNull) => {
      console.log("in posting route after postnoNulls " + notNull);
      if (notNull) {
        return sharp(picture)
                  .resize(325, 325, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 1 }
                  })
                  .toFile(thumbnailpath);
      } else {
        throw new PostError("Missing a required form input", "/post", 200);
      }
    })
    // Create post via PostModel
    .then(() => {
      console.log("in posting after resizing the picture");
      return PostModel.createPost(
        category,
        sellerId,
        price,
        name,
        description,
        picture2,
        thumbnail,
        course
      );
    })
    // Redirect to Home Page upon successful post
    .then((postLogged) => {
      if (postLogged) {
        //redirect somewhere?
        console.log("is post in database?: " + postLogged);
        //res.send('/'); // FOR DEPLOYMENT
        res.send("Item posted successfully");
      } else {
        throw new PostError("Unable to put post data into db", "/post", 200);
      }
    })
    .catch((err) => {
      //do somethng here
      console.log(err);
    });
});

module.exports = router;
