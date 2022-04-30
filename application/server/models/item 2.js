const db = require("../config/db2");

const ItemsModel = {};

ItemsModel.getCategories = () => {
  let baseSQL = "SELECT category_name, category_id from csc648.category";
  return db
    .execute(baseSQL)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

ItemsModel.getAllItems = () => {
  let baseSQL = `SELECT it.item_id, it.item_category, cat.category_name, it.item_name, it.item_desc, it.item_price, it.item_pic, 
	it.item_thumbnail, it.item_created, it.item_course, it.item_postexpires, seller.user_username, seller.user_fname, seller.user_lname
FROM csc648.item it
INNER JOIN user seller ON seller.user_id = it.item_seller_id
INNER JOIN category cat ON cat.category_id = it.item_category;`;
  return db
    .execute(baseSQL)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

ItemsModel.categoryAndItemSearch = (category, searchWord) => {
  let baseSQL = `select * from csc648.item
                    left join csc648.category on item.item_category = category.category_id
                    where (item.item_name like ? or item.item_desc like ?) and category.category_name like ?;`;
  return db
    .execute(baseSQL, [searchWord, searchWord, category])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

ItemsModel.categorySearch = (category) => {
  let baseSQL = `select * from csc648.item
                    left join csc648.category on item.item_category = category.category_id
                    where category.category_name like ?;`;
  return db
    .execute(baseSQL, [category])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

ItemsModel.itemSearch = (searchWord) => {
  let baseSQL = `select * from csc648.item
                    where item_name like ? or item_desc like ?;`;
  return db
    .execute(baseSQL, [searchWord, searchWord])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = ItemsModel;
