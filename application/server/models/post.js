/*
 * This is a post model whose function createPost will be called by the post route 
 * This createPost function will be executing mysql to insert into the item table in the database as
 * well as selecting back from the item table to check if the post made it into the table
 */
const db = require('../config/db');    //for db connection
const PostModel = {};

PostModel.createPost = (category, seller, price, name, des, pic, thumb, course) => {
    console.log("in the postmodel to create a post");
    let baseSQL = `INSERT INTO csc648.item (item_category, item_seller_id, item_price, item_name,
                    item_desc, item_pic, item_thumbnail, item_course) VALUES (?,?,?,?,?,?,?,?);`;
    return db.execute(baseSQL, [category, seller, price, name, des, pic, thumb, course])
        .then(() => {
            //second query to check if it is in the database
            let checksql = `select * from csc648.item where item_category = ? and item_seller_id = ?
            and item_price = ? and item_name = ? and item_desc = ? and item_pic = ? and item_thumbnail = ? and
            item_course = ?;`;
            return db.execute(checksql, [category, seller, price, name, des, pic, thumb, course])
        })
        .then(([results, fields]) => {
            console.log("in the results. what are they: " + results[0].item_id);
            if (results) {
                return Promise.resolve(results[0].item_id); //should this be a redirect?
            } else {
                return Promise.reject(-1);
            }
        }).catch((err) => Promise.reject(err));
};

module.exports = PostModel;