const db = require('../config/db2')

const MessageModel = {};

MessageModel.create = (itemId, senderId, recipientId, meet_time, location, contactInfo, message) => {
    let baseSQL = `BEGIN;
                    INSERT INTO message (msg_sender, msg_recipient, msg_meet_time, msg_location, msg_contactinfo, msg_body)
                    VALUES (?, ?, ?, ?, ?, ?);
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
        itemId
    ])
        .then(([results, fields]) => {
        return Promise.resolve(results);
    })
        .catch((err) => Promise.reject(err));
}

MessageModel.getReceivedMessages = ( userId ) => {
    let baseSQL = `SELECT it.item_id AS "ItemID", it.item_name AS "ItemName", sender.user_username AS "SendUsername", sender.user_fname AS "SendFName", 
                    sender.user_lname AS "SendLName", sender.user_email AS "SendEmail", msg.msg_contactinfo AS "ContactInfo", msg.msg_body AS "Message"
                    FROM message msg
                    INNER JOIN itemmsgs im ON msg.msg_id = im.im_msg
                    INNER JOIN item it ON it.item_id = im.im_item
                    INNER JOIN user seller ON seller.user_id = it.item_seller_id
                    INNER JOIN user sender ON sender.user_id = msg.msg_sender
                    INNER JOIN user recipient ON recipient.user_id = msg.msg_recipient
                    WHERE recipient.user_id = ?;`;
    return db.execute(baseSQL, [userId])
        .then(([results, fields]) => {
        return Promise.resolve(results);
    })
        .catch((err) => Promise.reject(err));
}

MessageModel.getSentMessages = ( userId ) => {
    let baseSQL = `SELECT it.item_id AS "ItemID", it.item_name AS "ItemName", recipient.user_username AS "RecUsername", recipient.user_fname AS "RecFName", 
                    recipient.user_lname AS "RecLName", recipient.user_email AS "RecEmail", msg.msg_contactinfo AS "ContactInfo", msg.msg_body AS "Message"
                    FROM message msg
                    INNER JOIN itemmsgs im ON msg.msg_id = im.im_msg
                    INNER JOIN item it ON it.item_id = im.im_item
                    INNER JOIN user seller ON seller.user_id = it.item_seller_id
                    INNER JOIN user sender ON sender.user_id = msg.msg_sender
                    INNER JOIN user recipient ON recipient.user_id = msg.msg_recipient
                    WHERE sender.user_id = ?;`;
    return db.execute(baseSQL, [userId])
        .then(([results, fields]) => {
        return Promise.resolve(results);
    })
        .catch((err) => Promise.reject(err));
}

MessageModel.getMessageDetails = ( userId, msgId ) => {
    let baseSQL = `SELECT it.item_id AS "ItemID", it.item_name AS "Item", seller.user_username AS "Username", seller.user_fname AS "First Name", 
                    seller.user_lname AS "LName", msg.msg_contactinfo AS "ContactInfo", msg.msg_body AS "Message"
                    FROM message msg
                    INNER JOIN itemmsgs im ON msg.msg_id = im.im_msg
                    INNER JOIN item it ON it.item_id = im.im_item
                    INNER JOIN user seller ON seller.user_id = it.item_seller_id
                    INNER JOIN user sender ON sender.user_id = msg.msg_sender
                    INNER JOIN user recipient ON recipient.user_id = msg.msg_recipient
                    WHERE msg.msg_id = ?;`;
    return db.execute(baseSQL, [userId])
        .then(([results, fields]) => {
        return Promise.resolve(results);
    })
        .catch((err) => Promise.reject(err));
}

module.exports = MessageModel;