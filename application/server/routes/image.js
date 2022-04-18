const express = require("express");
const router = express.Router();
const fs = require('fs');
const stream = require('stream');

/**
 * Item Image Retrieval Router
 */
router.get("/:name", (req, res) => {
    // This code below was retrieved from 
    // https://stackoverflow.com/questions/17515699/node-express-sending-image-files-as-api-response
    const rs = fs.createReadStream(`./user_images/${req.params.name}`)
    const ps = new stream.PassThrough()
    stream.pipeline(rs, ps, (err) => {
            if (err) {
                console.log(err)
                return res.sendStatus(400); 
        }
    })
    ps.pipe(res)
});

module.exports = router;