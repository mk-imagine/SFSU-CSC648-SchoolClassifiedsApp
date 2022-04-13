
//var config = require("../config/database");
const configdb = require('../config/database');
const db = new configdb();
//var db = mysql.createConnection(config.databaseOptions);
const PostModel = {};

PostModel.createPost = (category, seller, price, name, des, pic, thumb, course) => {
    console.log("in the postmodel to create a post");
    let baseSQL = `INSERT INTO csc648.item (item_category, item_seller_id, item_price, item_name,
                        item_desc, item_pic, item_thumbnail, item_course)
                    VALUES (?,?,?,?,?,?,?,?);`;
    db.query(baseSQL, [category, seller, price, name, des, pic, thumb, course])
    //second query to check if it is in the database
    let checksql = `select * from csc648.item where item_category = ? & item_seller_id = ?
     & item_price = ? & item_name = ? & item_desc = ? & item_pic = ? & item_thumbnail = ? &
     item_course = ?;`;
    return db.query(checksql,[category, seller, price, name, des, pic, thumb, course])
    .then(([results, fields]) => {
        console.log("in the results. what are they: "+results.item_id);
        if (results.item_id){
            return Promise.resolve(results.item_id); //should this be a redirect?

        }else{
            return Promise.reject(-1);
        }
    }).catch((err) => Promise.reject(err));

};

module.exports = PostModel;