const db = require("../config/db");

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
  return db
    .execute(baseSQL)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

/**
 * Retrieves all items
 * @returns All Items
 */
ItemsModel.getAllItems = (order, direction) => {
    let baseSQL; 
    /* = `SELECT it.item_id, it.item_category, cat.category_name, it.item_name, it.item_desc, it.item_price, it.item_pic, 
	                it.item_thumbnail, it.item_created, it.item_course, it.item_postexpires, seller.user_username,
                    seller.user_fname, seller.user_lname, seller.user_id AS "sellerid", it.item_approved AS "itemapproved"
                    FROM csc648.item it
                    INNER JOIN user seller ON seller.user_id = it.item_seller_id
                    INNER JOIN category cat ON cat.category_id = it.item_category;`; */
    if(order == 'price'){
        baseSQL = `SELECT it.item_id, it.item_category, cat.category_name, it.item_name, it.item_desc, it.item_price, it.item_pic, 
        it.item_thumbnail, it.item_created, it.item_course, it.item_postexpires, seller.user_username,
        seller.user_fname, seller.user_lname, seller.user_id AS "sellerid", it.item_approved AS "itemapproved"
        FROM csc648.item it 
        INNER JOIN user seller ON seller.user_id = it.item_seller_id 
        INNER JOIN category cat ON cat.category_id = it.item_category where it.item_approved = 1
        order by it.item_price ${direction};`;
    }
    if(order == 'date'){
        baseSQL = `SELECT it.item_id, it.item_category, cat.category_name, it.item_name, it.item_desc, it.item_price, it.item_pic, 
        it.item_thumbnail, it.item_created, it.item_course, it.item_postexpires, seller.user_username,
        seller.user_fname, seller.user_lname, seller.user_id AS "sellerid", it.item_approved AS "itemapproved"
        FROM csc648.item it
        INNER JOIN user seller ON seller.user_id = it.item_seller_id 
        INNER JOIN category cat ON cat.category_id = it.item_category where it.item_approved = 1
        order by it.item_created ${direction};`;
    }
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
ItemsModel.categoryAndItemSearch = (category, searchWord, order, direction) => {
    let baseSQL;
    if(order == 'price'){
        baseSQL = `select * from csc648.item
        left join csc648.category on item.item_category = category.category_id
        where (item.item_name like ? or item.item_desc like ?) and category.category_name like ? and item_approved = 1
        order by item_price ${direction};`;
    }
    if(order == 'date'){
        baseSQL = `select * from csc648.item
                    left join csc648.category on item.item_category = category.category_id
                    where (item.item_name like ? or item.item_desc like ?) and category.category_name like ? and item_approved = 1
                    order by item_created ${direction}`;
    }
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
ItemsModel.categorySearch = (category, orderby, direction) => {
    if( orderby == "price") {
        let baseSQL = `select * from csc648.item
                        left join csc648.category on item.item_category = category.category_id
                        WHERE category.category_name like ? and item.item_approved = 1
                        ORDER BY item_price ${direction};`;
        return db.execute(baseSQL, [category])
        .then(([results, fields]) => {
        return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
    }
    if(orderby == "date") {
        let baseSQL = `select * from csc648.item
                        left join csc648.category on item.item_category = category.category_id
                        WHERE category.category_name like ? and item.item_approved = 1
                        ORDER BY item_created ${direction};`;
        return db.execute(baseSQL, [category])
        .then(([results, fields]) => {
        return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
    }
    

}

/**
 * Retrieves items matching search term in all categories
 * @param {*} searchWord
 * @returns Items that match search term
 */
ItemsModel.itemSearch = (searchWord, orderby, direction) => {
    let baseSQL;
    if (orderby == "price") {
        baseSQL = `select * from csc648.item
        where (item_name like ? or item_desc like ?) AND item_approved = 1
        ORDER BY item_price ${direction};`;
    }
    if (orderby == "date") {
        baseSQL = `select * from csc648.item
        where (item_name like ? or item_desc like ?) AND item_approved = 1
        ORDER BY item_created ${direction};`;       
    }
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
ItemsModel.getItemsBySellerId = (sellerId) => {
  let baseSQL = `SELECT it.item_id, it.item_category, cat.category_name, it.item_name, it.item_desc, it.item_price, it.item_pic, 
    it.item_thumbnail, it.item_created, it.item_course, it.item_postexpires, seller.user_username,
    seller.user_fname, seller.user_lname, seller.user_id AS "sellerid", it.item_approved AS "itemapproved"
    FROM csc648.item it
    INNER JOIN user seller ON seller.user_id = it.item_seller_id
    INNER JOIN category cat ON cat.category_id = it.item_category
    WHERE it.item_seller_id = ?;`;
  return db
    .execute(baseSQL, [sellerId])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = ItemsModel;
