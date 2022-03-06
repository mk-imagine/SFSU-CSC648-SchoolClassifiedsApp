USE csc648;

/***
This query will list all items that match the substring between the '%' anywhere within the product name

SELECT item.item_name AS "Item Name", cat.category_name AS "Category", item.item_price AS "Price"
FROM item item
JOIN category cat ON cat.category_id = item.item_category
WHERE item.item_name LIKE "%Hel%";
***/

/***
This query will list all items that match a particular category (where cat.category_id matches a particular category_id)

SELECT item.item_name AS "Item Name", cat.category_name AS "Category", item.item_price AS "Price"
FROM item item
JOIN category cat ON cat.category_id = item.item_category
WHERE cat.category_id = 3;
***/