USE csc648;

SELECT i.item_name AS "Item Name", seller.user_username AS "Seller Username", sender.user_username AS "Sender Username", recipient.user_username AS "Recipient Username", m.msg_body AS "Message Body"
FROM item i
JOIN itemmsgs im ON im.im_item = i.item_id
JOIN message m ON m.msg_id = im.im_msg
JOIN user seller ON seller.user_id = i.item_seller_id
JOIN user sender ON sender.user_id = m.msg_sender
JOIN user recipient ON recipient.user_id = m.msg_recipient
WHERE i.item_id = 1;