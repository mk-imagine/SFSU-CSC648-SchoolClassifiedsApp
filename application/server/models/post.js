var db = require("../config/database");

const PostModel = {};

PostModel.createPost = (category, seller, price, name, des, pic, thumb, course) => {
    let baseSQL = `INSERT INTO csc648.item (item_category, item_seller_id, item_price, item_name,
                        item_desc, item_pic, item_thumbnail, item_course)
                    VALUES (?,?,?,?,?,?,?,?);`;
    return db.execute(baseSQL, [category, seller, price, name, des, pic, thumb, course])
    .then(([results, fields]) => {
        if (results && results.affectedRows){
            return Promise.resolve(results.insertid); //should this be a redirect?

        }else{
            return Promise.reject(-1);
        }
    }).catch((err) => Promise.reject(err));

};

module.exports = PostModel;