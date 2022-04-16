const express = require('express');
const router = express.Router();
const { successPrint, errorPrint } = require("../error/debugprinters");
const MessageModel = require('../models/message');

router.get('/', (req, res) => {
    res.send("Message route successful response");
});

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

// router.get('/search', (req, res, next) => {
//     try {
//         const results
//     }
// });

/****************************************************** */
/*
*  Get all messages by userId
*/
router.get('/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId; // request userId from front end for search
        console.log("in route:" + userId);
        const results = await MessageModel.getAllMessages(userId);
        console.log("after model:" + results);
        if (results && results.length) {
            res.send(results);
        } else {
            res.send([]);
        }
        } catch {
        next(err);
        }
});

/*
*  Get message details by messageId
*/

router.get('/:userId/:msgId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const msgId = req.params.msgId;
        const results = await MessageModel.getMessageDetails(userId, msgId);
        if (results && results.length) {
          res.send(results);
        } else {
          res.send([]);
        }
      } catch {
        next(err);
      }
});

module.exports = router;