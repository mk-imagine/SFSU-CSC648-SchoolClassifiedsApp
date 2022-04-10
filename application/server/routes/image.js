const express = require("express");
const router = express.Router();
const fs = require('fs');
const stream = require('stream');

router.get("/:name", (req, res) => {
    const r = fs.createReadStream(`./user_images/${req.params.name}`)
    const ps = new stream.PassThrough()
    stream.pipeline(r, ps, (err) => {
            if (err) {
                console.log(err) // No such file or any other kind of error
                return res.sendStatus(400); 
        }
    })
    ps.pipe(res)
});

module.exports = router;