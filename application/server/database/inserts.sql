USE csc648;

INSERT INTO category (category_id, category_name)
VALUES
(0, 'All Items'),
(1, 'Art'),
(2, 'Books'),
(3, 'Course Material'),
(4, 'Electronics'),
(5, 'Furniture'),
(6, 'Kitchen'),
(7, 'Office Supplies'),
(8, 'Sporting Goods'),
(9, 'Tutoring Services');

INSERT INTO user (user_username, user_fname, user_lname, user_email, user_registrationrecord, user_password)
VALUES
("adude", "admin", "dude", "noone0@nowhere.com", "admin", "password"),
("jschmoe", "Joe", "Schmoe", "noone1@nowhere.com", "student", "password"),
("mnugent", "Mike", "Nugent", "noone2@nowhere.com", "student", "password"),
("lindaz", "Linda", "Zelensky", "noone3@nowhere.com", "staff", "password"),
("jputin", "Jessica", "Jackson", "noone4@nowhere.com", "staff", "password"),
("mpetkovic", "Mary", "Petkovic", "noone5@nowhere.com", "faculty", "password"),
("jlupin", "Jordan", "Lupin", "noone6@nowhere.com", "faculty", "password"),
("mkim", "Mark", "Kim", "mkim22@mail.sfsu.edu", "student", "password");

INSERT INTO item (item_name, item_desc, item_price, item_pic, item_category, item_seller_id, 
item_thumbnail, item_created, item_golive_time, item_course, item_postexpires)
VALUES
("Rare painting", "Up and coming artist.  Will be priceless in 5 yrs!", 100.00, 'art.jpeg', 1, 1, 
'thumbnail-art.jpeg', '2022-01-01 05:30:00', '2022-01-02 05:30:00', NULL, '2023-01-02 05:30:00'),
("Dictionary", "It's a dictionary", 15.00, 'dictionary.jpeg', 2, 2, 
'thumbnail-dictionary.jpeg', '2022-01-15 05:30:00', '2022-01-16 05:30:00', NULL, '2023-01-02 05:30:00'),
("Gooseneck Kettle", "For your everyday coffee.", 25.00, 'gooseneckkettle.jpeg', 6, 4, 
'thumbnail-gooseneckkettle.jpeg', '2022-02-01 05:30:00', '2022-02-02 05:30:00', NULL, '2023-01-02 05:30:00'),
("Bicycle Helmet", "To protect your brain on dangerous SF roads.", 30.00, 'helmet.jpeg', 8, 3, 
'thumbnail-helmet.jpeg', '2022-02-15 05:30:00', '2022-02-16 05:30:00', NULL, '2023-01-02 05:30:00'),
("Ice Sculpture", "For incredible parties! Pick it up soon before it melts", 999.00, 'icesculpture.jpeg', 1, 7, 
'thumbnail-icesculpture.jpeg', '2022-03-01 05:30:00', '2022-03-02 05:30:00', NULL, '2023-01-02 05:30:00'),
("A white lamp", "So you can stay up late, studying.  It's boring so it won't distract you.", 50.00, 'lamp.jpeg', 5, 6, 
'thumbnail-lamp.jpeg', '2022-03-15 05:30:00', '2022-03-16 05:30:00', NULL, '2023-01-02 05:30:00'),
("Snowboard", "Jump on this popsicle stick and barrel down the mountain! WHEEE!", 200.00, 'snowboard.jpeg', 8, 5, 
'thumbnail-snowboard.jpeg', '2022-04-01 05:30:00', '2022-04-02 05:30:00', NULL, '2023-01-02 05:30:00'),
("Stapler", "Channel your inner Office Space", 10.00, 'stapler.jpeg', 7, 3, 
'thumbnail-stapler.jpeg', '2022-04-08 05:30:00', NULL, NULL, '2023-01-02 05:30:00'),
("Constitution and the Nation: The Regulatory State", "A required book for HIST 471", 10.00, 'regstate.jpeg', 3, 8, 
'thumbnail-regstate.jpeg', '2022-04-08 05:30:00', NULL, 'HIST 471', '2023-01-02 05:30:00'),
("Constitution and the Nation: A Revolution in Rights", "A required book for HIST 471", 10.00, 'revrights.jpeg', 3, 8, 
'thumbnail-revrights.jpeg', '2022-04-08 05:30:00', NULL, 'HIST 471', '2023-01-02 05:30:00'),
("Brown v. Board of Education", "A required book for HIST 471", 10.00, 'bvb.jpeg', 3, 8, 
'thumbnail-bvb.jpeg', '2022-04-08 05:30:00', NULL, 'HIST 471', '2023-01-02 05:30:00');

INSERT INTO message (msg_sender, msg_recipient, msg_meet_time, msg_location, msg_contactinfo, msg_body, msg_timestamp)
VALUES
(1, 2, '2022-04-12 10:00:00', 'Cesar Chavez BofA ATM', '415-555-1212', 'About painting', '2022-04-09 10:00:00'),
(2, 1, '2022-04-12 10:00:00', 'Cesar Chavez BofA ATM', '415-555-1212', 'About painting', '2022-04-09 10:05:00'),
(1, 2, '2022-04-12 10:00:00', 'Cesar Chavez BofA ATM', '415-555-1212', 'About painting', '2022-04-09 10:15:00'),
(2, 1, '2022-04-12 10:00:00', 'Cesar Chavez BofA ATM', '415-555-1212', 'About painting', '2022-04-09 10:29:00'),
(2, 3, '2022-04-12 10:00:00', 'Cesar Chavez BofA ATM', '415-555-1212', 'About Dictionary', '2022-04-09 10:00:00');

INSERT INTO itemmsgs (im_item, im_msg)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5);

INSERT INTO review (review_item, review_recipient, review_contributor, review_rating, review_body, review_timestamp)
VALUES
(1, 1, 2, 5, 'Great transaction', '2022-04-09 10:00:00');
