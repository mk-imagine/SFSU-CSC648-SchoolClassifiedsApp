const db = require('../config/db2');

/**
 * MessageModel for Message Database Queries
 */
const MessageModel = {};

/**
 * Message insert query
 * @param {*} itemId 
 * @param {*} senderId 
 * @param {*} recipientId 
 * @param {*} meet_time 
 * @param {*} location 
 * @param {*} contactInfo 
 * @param {*} message
 * @returns True if insert successful
 */
MessageModel.create = async (itemId, senderId, recipientId, meet_time, location, contactInfo, message) => {
    const insertMsgSQL = `INSERT INTO csc648.message (msg_sender, msg_recipient, msg_location, msg_contactinfo, 
        msg_body, msg_timestamp) VALUES (?, ?, ?, ?, ?, NOW());`;
    const msgData = [senderId, recipientId, location, contactInfo, message];
    const insertItemMsgsSQL = `INSERT INTO csc648.itemmsgs (im_item, im_msg) VALUES (?, LAST_INSERT_ID());`
    const itemMsgsData = [itemId];

    const con = await db.getConnection();
    try {
        await con.beginTransaction();
        await con.execute(insertMsgSQL, msgData);
        await con.execute(insertItemMsgsSQL, itemMsgsData);
        await con.commit();
    } catch (err) {
        console.log(err);
        if (con) {
            await con.rollback();
            console.log("Inserts unsuccessful")
        }
    } finally {
        if (con) {
            await con.release();
        }
    }
}

/**
 * Retrieves all recieved messages matching userId
 * @param {*} userId 
 * @returns All recieved messages by userId
 */
MessageModel.getReceivedMessages = ( userId ) => {
    let baseSQL = `SELECT it.item_id AS "ItemID", it.item_name AS "ItemName", sender.user_username AS "SendUsername", 
                    sender.user_fname AS "SendFName", sender.user_lname AS "SendLName", sender.user_email AS "SendEmail", 
                    msg.msg_contactinfo AS "ContactInfo", msg.msg_body AS "Message", msg.msg_timestamp AS "Time Stamp"
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

/**
 * Retrieves all sent messages matching userId
 * @param {*} userId 
 * @returns All sent messages by userId
 */
MessageModel.getSentMessages = ( userId ) => {
    let baseSQL = `SELECT it.item_id AS "ItemID", it.item_name AS "ItemName", recipient.user_username AS "RecUsername", recipient.user_fname AS "RecFName", 
                    recipient.user_lname AS "RecLName", recipient.user_email AS "RecEmail", msg.msg_contactinfo AS "ContactInfo", msg.msg_body AS "Message",
                    msg.msg_timestamp AS "Time Stamp"
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

/**
 * Retrieve message by message ID
 * @param {*} userId 
 * @param {*} msgId 
 * @returns Message details by msgId
 */
MessageModel.getMessageDetails = ( userId, msgId ) => {
    let baseSQL = `SELECT it.item_id AS "ItemID", it.item_name AS "Item", seller.user_username AS "Username", seller.user_fname AS "First Name", 
                    seller.user_lname AS "LName", msg.msg_contactinfo AS "ContactInfo", msg.msg_body AS "Message", msg.msg_timestamp AS "Time Stamp"
                    FROM message msg
                    INNER JOIN itemmsgs im ON msg.msg_id = im.im_msg
                    INNER JOIN item it ON it.item_id = im.im_item
                    INNER JOIN user seller ON seller.user_id = it.item_seller_id
                    INNER JOIN user sender ON sender.user_id = msg.msg_sender
                    INNER JOIN user recipient ON recipient.user_id = msg.msg_recipient
                    WHERE msg.msg_id = ?;`;
    return db.execute(baseSQL, [msgId])
        .then(([results, fields]) => {
        return Promise.resolve(results);
    })
        .catch((err) => Promise.reject(err));
}

module.exports = MessageModel;