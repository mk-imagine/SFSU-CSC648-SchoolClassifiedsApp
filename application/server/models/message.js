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
    //console.log("in the messege model, what is message:"+ message);
    //await db.beginTransaction();
   // let baseSQL = `BEGIN; INSERT INTO csc648.message (msg_sender, msg_recipient, msg_meet_time, msg_location, msg_contactinfo, msg_body, msg_timestamp) VALUES (?, ?, ?, ?, ?, ?, NOW()); SELECT LAST_INSERT_ID() INTO @msgid; INSERT INTO csc648.itemmsgs (im_item, im_msg) VALUES (?, @msgid); COMMIT;`;
    //db.execute(`INSERT INTO csc648.message (msg_sender, msg_recipient, msg_meet_time, msg_location, msg_contactinfo, msg_body, msg_timestamp)
    //VALUES (?, ?, ?, ?, ?, ?, NOW());`, [senderId, recipientId, meet_time,location, contactInfo, message, ]);
    //db.execute(`SELECT LAST_INSERT_ID() INTO @msgid;`);
    //db.execute(`INSERT INTO csc648.itemmsgs (im_item, im_msg) VALUES (?, @msgid);`, [itemId]);
    //db.commit();
    return  db.getConnection( (err, connection)=> {
        console.log("DOES IT EVEN MAKE IT IN?");
            if (err) {
                console.log("REJECTED IN THE GET CONNECTION");
                return Promise.reject("Error occurred while getting the connection");
            }
            return connection.beginTransaction(err => {
                console.log("IS IT IN TE TRANSACTION?");
                if (err) {
                    connection.release();
                    return Promise.reject("Error occurred while creating the transaction");
                }
                console.log("BEFORE THE FIRST CONNECTION>EXECUTE");
                return connection.execute(
                    `INSERT INTO csc648.message (msg_sender, msg_recipient, msg_meet_time, msg_location, msg_contactinfo, msg_body, msg_timestamp)
                    VALUES (?, ?, ?, ?, ?, ?, NOW());`,[senderId, recipientId, meet_time,location, contactInfo, message], (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                return Promise.reject("Inserting to STUDENT table failed", err)
                            });
                        }
                        console.log("BEFORE THE SECOND CONNECTION>EXECUTE");
                        return connection.execute(
                            `SELECT LAST_INSERT_ID() INTO @msgid;`, (err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return Promise.reject("Inserting to ADDRESS table failed");
                                    });
                                }
                                console.log("BEFORE THE Third CONNECTION>EXECUTE");
                                return connection.execute(
                                    `INSERT INTO csc648.itemmsgs (im_item, im_msg) VALUES (?, @msgid);`,[itemId], (err) => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return Promise.reject("Inserting to ADDRESS table failed");
                                            });
                                        }
                                        return connection.commit((err) => {
                                            console.log("IN THE CONNECTOIN>COMIT");
                                            if (err) {
                                                
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    return Promise.reject("Commit failed");
                                                });
                                            }

                                            connection.release();
                                        });
                            })

                    });

            });
        });
    
})
    //return db.execute('SELECT LAST_INSERT_ID() as itemId');
   

       /*  let baseSQL = `
        INSERT INTO csc648.message (msg_sender, msg_recipient, msg_location, msg_contactinfo, msg_body, msg_timestamp) VALUES (?, ?, ?, ?, ?, NOW());
        SELECT LAST_INSERT_ID() INTO @msgid;
        INSERT INTO csc648.itemmsgs (im_item, im_msg) VALUES (?, @msgid);
        COMMIT;`; */
    /* return db.execute(baseSQL, [
        senderId, 
        recipientId, 
        meet_time,
        location, 
        contactInfo, 
        message, 
        itemId
    ]) */
        .then(() => {
        return Promise.resolve(true);
    })
        .catch((err) => Promise.reject(err));
}

/**
 * Retrieves all recieved messages matching userId
 * @param {*} userId 
 * @returns All recieved messages by userId
 */
MessageModel.getReceivedMessages = ( userId ) => {
    let baseSQL = `SELECT it.item_id AS "ItemID", it.item_name AS "ItemName", sender.user_username AS "SendUsername", sender.user_fname AS "SendFName", 
                    sender.user_lname AS "SendLName", sender.user_email AS "SendEmail", msg.msg_contactinfo AS "ContactInfo", msg.msg_body AS "Message",
                    msg.msg_timestamp AS "Time Stamp"
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