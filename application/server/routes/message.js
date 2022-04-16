const express = require('express');
const router = express.Router();
const { successPrint, errorPrint } = require("../error/debugprinters");
const MessageModel = require('../models/message');

router.post('/create', (req, res, next) => {
    const { itemId, senderId, recipientId, meet_time, location, contactInfo, message } = req.body;
    MessageModel.create(itemId, senderId, recipientId, meet_time, location, contactInfo, message)
        .then((wasSuccessful) => {
            if (wasSuccessful != -1) {
                successPrint(`Message was created for ${senderId}`);
                res.json({
                    code: 1,
                    status: "success - message created",
                    recipient: recipientId,
                    message: message
                })
            } else {
                errorPrint("Message was not created");
                res.json({
                    code: -1,
                    status: "danger - message was not created",
                })
            }
        })
        .catch((err) => next(err));

    // FOR SESSIONS - INCOMPLETE
    // if(!req.session.username) {
    //     debugPrint.errorPrint("Must be logged in to comment");
    //     res.json({
    //         code: -1,
    //         status: "danger",
    //         message: "Must be logged in to create a message"
    //     });
    // } else {
        
    // }
})

router.get('/search', (req, res, next) => {
    try {
        const results
    }
})

module.exports = router;