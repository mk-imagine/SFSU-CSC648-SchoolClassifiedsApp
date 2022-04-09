const express = require("express");
const router = express.Router();
const fs = require('fs');
const stream = require('stream');

router.get("/:name", (req, res) => {
    const r = fs.createReadStream(`../user_images/${req.params.name}`) // or any other way to get a readable stream
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(r, ps, (err) => {
            if (err) {
                console.log(err) // No such file or any other kind of error
                return res.sendStatus(400); 
        }
    })
    ps.pipe(res) // <---- this makes a trick with stream error handling
});

module.exports = router;