const db = require('../config/db2');

const ItemsModel = {};

ItemsModel.getCategories = (sortBy, direction) => {
    let baseSQL = "SELECT category_name, category_id from csc648.category ORDER BY ? ?";
    return db.execute(baseSQL, [sortBy, direction])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

ItemsModel.getAllItems = (sortBy, direction) => {
    let baseSQL = `SELECT * from csc648.item ORDER BY ? ?`;
    return db.execute(baseSQL, [sortBy, direction])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

ItemsModel.categoryAndItemSearch = (category, searchWord, sortBy, direction) => {
    let baseSQL = `select * from csc648.item
                    left join csc648.category on item.item_category = category.category_id
                    where (item.item_name like ? or item.item_desc like ?) and category.category_name like ? ORDER BY ? ?;`;
    return db.execute(baseSQL, [searchWord, searchWord, category, sortBy, direction])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

ItemsModel.categorySearch = (category, sortBy, direction) => {
    let baseSQL = `select * from csc648.item
                    left join csc648.category on item.item_category = category.category_id
                    where category.category_name like ? ORDER BY ? ?;`
    return db.execute(baseSQL, [category, sortBy, direction])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

ItemsModel.itemSearch = (searchWord, sortBy, direction) => {
    let baseSQL = `select * from csc648.item
                    where item_name like ? or item_desc like ? ORDER BY ? ?;`;
    return db.execute(baseSQL, [searchWord, searchWord, sortBy, direction])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
}

module.exports = ItemsModel;