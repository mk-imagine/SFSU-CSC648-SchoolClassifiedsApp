
//var config = require("../config/database");
// const configdb = require('../config/database');
const db = require('../config/db2');
//var db = mysql.createConnection(config.databaseOptions);
const PostModel = {};

PostModel.createPost = (category, seller, price, name, des, pic, thumb, course) => {
    console.log("in the postmodel to create a post");
    let baseSQL = `INSERT INTO csc648.item (item_category, item_seller_id, item_price, item_name,
                        item_desc, item_pic, item_thumbnail, item_course)
                    VALUES (?,?,?,?,?,?,?,?);`;
    return db.execute(baseSQL, [category, seller, price, name, des, pic, thumb, course])
    //second query to check if it is in the database
    /* let checksql = `select * from csc648.item where item_category = ? and item_seller_id = ?
     and item_price = ? and item_name = ? and item_desc = ? and item_pic = ? and item_thumbnail = ? and
     item_course = ?;`; */
    ///return db.execute(checksql,[category, seller, price, name, des, pic, thumb, course])
    .then(([results, fields]) => {
        console.log("in the results. what are they: "+results.item_id);
        if (results){
            return Promise.resolve(results); //should this be a redirect?

        }else{
            return Promise.reject(-1);
        }
    }).catch((err) => Promise.reject(err));

};

module.exports = PostModel;