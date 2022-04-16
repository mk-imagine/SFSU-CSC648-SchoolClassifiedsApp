BEGIN;
INSERT INTO csc648.message (msg_sender, msg_recipient, msg_meet_time, msg_location, msg_contactinfo, msg_body)
VALUES (8, 2, NULL, NULL, '415-555-1212', 'Yes! Please call me or message me back!');
SELECT LAST_INSERT_ID() INTO @msgid;
INSERT INTO csc648.itemmsgs (im_item, im_msg)
VALUES (10, @msgid);
COMMIT;

/*
BEGIN;
INSERT INTO message (msg_sender, msg_recipient, msg_meet_time, msg_location, msg_contactinfo, msg_body)
VALUES (?, ?, ?, ?, ?, ?);
SELECT LAST_INSERT_ID() INTO @msgid;
INSERT INTO itemmsgs (im_item, im_msg)
VALUES (im_item, @msgid);
COMMIT;
*/