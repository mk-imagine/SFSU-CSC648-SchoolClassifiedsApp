const db = require('../config/db');

/**
 * ItemsModel for Category and Item Database Queries
 */
const ItemsModel = {};

/**
 * Retrieves all categories
 * @returns All Categories
 */
ItemsModel.getCategories = () => {
    let baseSQL = "SELECT category_name, category_id from csc648.category";
    return db.execute(baseSQL)
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

/**
 * Retrieves all items
 * @returns All Items
 */
ItemsModel.getAllItems = () => {
    let baseSQL = `SELECT it.item_id, it.item_category, cat.category_name, it.item_name, it.item_desc, it.item_price, it.item_pic, 
	                it.item_thumbnail, it.item_created, it.item_course, it.item_postexpires, seller.user_username,
                    seller.user_fname, seller.user_lname, seller.user_id AS "sellerid", it.item_approved AS "itemapproved"
                    FROM csc648.item it
                    INNER JOIN user seller ON seller.user_id = it.item_seller_id
                    INNER JOIN category cat ON cat.category_id = it.item_category;`;
    return db.execute(baseSQL)
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

/**
 * Retrieves items matching category and search term
 * @param {*} category 
 * @param {*} searchWord 
 * @returns Items that match category and search term
 */
ItemsModel.categoryAndItemSearch = (category, searchWord) => {
    let baseSQL = `select * from csc648.item
                    left join csc648.category on item.item_category = category.category_id
                    where (item.item_name like ? or item.item_desc like ?) and category.category_name like ?;`;
    return db.execute(baseSQL, [searchWord, searchWord, category])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

/**
 * Retrieves items matching category
 * @param {*} category 
 * @returns Items that match category
 */
ItemsModel.categorySearch = (category) => {
    let baseSQL = `select * from csc648.item
                    left join csc648.category on item.item_category = category.category_id
                    where category.category_name like ?;`
    return db.execute(baseSQL, [category])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

/**
 * Retrieves items matching search term in all categories
 * @param {*} searchWord 
 * @returns Items that match search term
 */
ItemsModel.itemSearch = (searchWord) => {
    let baseSQL = `select * from csc648.item
                    where item_name like ? or item_desc like ?;`;
    return db.execute(baseSQL, [searchWord, searchWord])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

/**
 * Retrieves seller information matching itemId
 * @param {*} itemId 
 * @returns Seller data
 */
ItemsModel.getSellerInfo = (itemId) => {
    let baseSQL = `SELECT it.item_id AS "ItemID", seller.user_id AS "SellerID", seller.user_email AS "SellerEmail", 
    seller.user_registrationrecord AS "SellerRegistrationType"
    FROM csc648.item it
    INNER JOIN csc648.user seller ON seller.user_id = it.item_seller_id
    WHERE it.item_id = ?;`;
    return db.execute(baseSQL, [itemId])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

module.exports = ItemsModel;