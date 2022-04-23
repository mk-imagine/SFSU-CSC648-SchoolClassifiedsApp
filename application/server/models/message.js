const db = require('../config/db2')

const MessageModel = {};

MessageModel.create = (itemId, senderId, recipientId, meet_time, location, contactInfo, message) => {
    let baseSQL = `BEGIN;
                    INSERT INTO message (msg_sender, msg_recipient, msg_meet_time, msg_location, msg_contactinfo, msg_body, msg_timestamp)
                    VALUES (?, ?, ?, ?, ?, ?, ?);
                    SELECT LAST_INSERT_ID() INTO @msgid;
                    INSERT INTO itemmsgs (im_item, im_msg)
                    VALUES (?, @msgid);
                    COMMIT;`;
    return db.execute(baseSQL, [
        senderId, 
        recipientId, 
        meet_time, 
        location, 
        contactInfo, 
        message, 
        itemId,
        timestamp
    ])
        .then(([results, fields]) => {
        return Promise.resolve(results);
    })
        .catch((err) => Promise.reject(err));
}

MessageModel.getAllMessages = (userId) => {
    console.log("in model: " + userId);
    let baseSQL = `SELECT it.item_name AS "Item", seller.user_username AS "Seller", sender.user_username AS "Sender", recipient.user_username AS "Recipient", msg.msg_id AS "Message ID", msg.msg_body AS "Message", timestamp.msg_timestamp AS "Time Stamp"
                    FROM message msg
                    INNER JOIN itemmsgs im ON msg.msg_id = im.im_msg
                    INNER JOIN item it ON it.item_id = im.im_item
                    INNER JOIN user seller ON seller.user_id = it.item_seller_id
                    INNER JOIN user sender ON sender.user_id = msg.msg_sender
                    INNER JOIN user recipient ON recipient.user_id = msg.msg_recipient
                    WHERE seller.user_id = ? OR recipient.user_id = ?`;
    return db.execute(baseSQL, [userId, userId])
        .then(([results, fields]) => {
        return Promise.resolve(results);
    })
        .catch((err) => Promise.reject(err));
}

MessageModel.getMessageDetails = ( userId, msgId ) => {

}

module.exports = MessageModel;