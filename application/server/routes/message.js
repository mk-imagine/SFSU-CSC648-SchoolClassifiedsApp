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

// router.get('/search', (req, res, next) => {
//     try {
//         const results
//     }
// });

/****************************************************** */

// router.get('/userMsgs', (req, res) => {
//     try {
//         const msgSender = "%" + req.params.msg_sender + "%";
//         const results = await messageModel.getMessage(msgSender);
//         if (results && results.length) {
//           res.send(results);
//         } else {
//           res.send([]);
//         }
//       } catch {
//         next(err);
//       }
// });

// router.post('/post', (req, res) => {
//     try {
//         const msgID = req.body.msg_id;
//         const msgSender = req.body.msg_sender;
//         const msgRecipient = req.body.msg_recipient;
//         const msgMeetTime = req.body.msg_meet_time;
//         const msgLocation = req.body.msg_location;
//         const msgContactInfo = req.body.msg_contanctinfo;
//         const msgBody = req.body.msg_body;
//         const msgTimeStamp = req.body.msg_timestamp;
//         const results = await messageModel.postMessage(msgID, msgSender, msgRecipient, msgMeetTime, msgLocation, msgContactInfo, msgBody, msgTimeStamp);
//         if (results && results.length) {
//           res.send(results);
//         } else {
//           res.send([]);
//         }
//       } catch {
//         next(err);
//       }
// });

// router.get('/msgdetails', (req, res) => {
//     try {
//         const msgID = req.body.msg_id;
//         const msgSender = req.body.msg_sender;
//         const msgRecipient = req.body.msg_recipient;
//         const msgMeetTime = req.body.msg_meet_time;
//         const msgLocation = req.body.msg_location;
//         const msgContactInfo = req.body.msg_contanctinfo;
//         const msgBody = req.body.msg_body;
//         const msgTimeStamp = req.body.msg_timestamp;
//         const results = await messageModel.messageInfo(msgID, msgSender, msgRecipient, msgMeetTime, msgLocation, msgContactInfo, msgBody, msgTimeStamp);
//         if (results && results.length) {
//           res.send(results);
//         } else {
//           res.send([]);
//         }
//       } catch {
//         next(err);
//       }
// });

module.exports = router;