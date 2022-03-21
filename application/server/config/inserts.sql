USE csc648;

INSERT INTO category (category_id, category_name)
VALUES
(0, "All"),
(1, "Art"),
(2, "Books"),
(3, "Course Material"),
(4, "Electronics"),
(5, "Furniture"),
(6, "Kitchen"),
(7, "Office Supplies"),
(8, "Sporting Goods"),
(9, "Tutoring Services");

INSERT INTO user (first_name, last_name, email)
VALUES
("Mark", "Kim", "mkim22@mail.sfsu.edu"),
("Joe", "Schmoe", "noone@nowhere.com"),
("Mike", "Nugent", "noone@nowhere.com"),
("Linda", "Zelensky", "noone@nowhere.com"),
("Jessica", "Putin", "noone@nowhere.com"),
("Mary", "Petkovic", "noone@nowhere.com"),
("Jordan", "Lupin", "noone@nowhere.com");

INSERT INTO item (item_name, item_desc, item_price, item_pic, item_category, seller_id)
VALUES
("Rare painting", "Up and coming artist.  Will be priceless in 5 yrs!", 100.00, 'art.jpeg', 1, 1),
("Dictionary", "It's a dictionary", 15.00, 'dictionary.jpeg', 2, 2),
("Gooseneck Kettle", "For your everyday coffee.", 25.00, 'gooseneckkettle.jpeg', 6, 4),
("Bicycle Helmet", "To protect your brain on dangerous SF roads.", 30.00, 'helmet.jpeg', 8, 3),
("Ice Sculpture", "For incredible parties! Pick it up soon before it melts", 999.00, 'icesculpture.jpeg', 1, 7),
("A white lamp", "So you can stay up late, studying.  It's boring so it won't distract you.", 50.00, 'lamp.jpeg', 5, 6),
("Snowboard", "Jump on this popsicle stick and barrel down the mountain! WHEEE!", 200.00, 'snowboard.jpeg', 8, 5),
("Stapler", "Channel your inner Office Space", 10.00, 'stapler.jpeg', 7, 3);

