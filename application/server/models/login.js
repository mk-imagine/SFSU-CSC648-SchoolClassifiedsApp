/*
 * This is a login model. This is where we execute an mysql statment to see if the user is actually a user.
 * 
 */
const mysql = require("mysql");
var bcrypt = require('bcrypt');
const db = require('../config/db');

const LoginModel = {};

LoginModel.authenticate = (email, password) => {
    console.log("in the login mode authenticate");
    let userId;
    let baseSQL = `select user_id, user_email, user_password
                    from csc648.user
                    where user_email = ?;`;

    return db.execute(baseSQL, [email])
        .then(([results, fields]) => {
            console.log(results);
            console.log(results.length);
            if (results && !results[1]) {
                userId = results[0].user_id;
                console.log("is userid set? "+userId);
                console.log("what is password; " + password + " what is results password: " + results[0].user_password);
                return bcrypt.compare(password, results[0].user_password);
            } else {
                return Promise.reject(-1);
            }
        }).then((passwordMatch) => {
            console.log('does password match?: ' + passwordMatch);
            if (passwordMatch) {
                return Promise.resolve(userId);
            } else {
                return Promise.resolve(-1);
            }
        }).catch((err) => Promise.reject(err));
};

LoginModel.getUser = (userId) => {
    const baseSQL = `SELECT user_fname, user_lname, user_email
    FROM csc648.user
    WHERE user.user_id = ?;`;
    return db.execute(baseSQL, [userId])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
};

LoginModel.resetPassword = (username, email, newPassword) =>{
    let userid;
    let baseSQL = `select user_id from csc648.user where user_username = ? and user_email = ?;`;
    return db.execute(baseSQL, [username, email])
    .then(([results, fields]) => {
        console.log(results);
        if(results[0].user_id > 0){
            userid = results[0].user_id;
            return bcrypt.hash(newPassword,0);
        }else{
            return Promise.resolve(-1);
        }
    }).then((hashedPassword) => {
        let baseSQL2 = `update csc648.user set user_password = ? where user_id = ?;`;
        return db.execute(baseSQL2, [hashedPassword, userid]);
    })
    .then(([results,fields]) => {
        //console.log("after runing the update of rest password: "+results[0]);
        return Promise.resolve(userid);
    }).catch((err) => Promise.reject(err));
};

LoginModel.changeUsername = (newUsername, email) => {
    let baseSQL = `update csc648.user set user_username = ? where user_email = ?;`;
    return db.execute(baseSQL, [newUsername, email])
    .then(([results, fields]) => {
        //console.log(fields);
        let baseSQL2 = `select user_id from csc648.user where user_username = ? and user_email = ?;`;
        return db.execute(baseSQL2, [newUsername, email])
    }).then(([results, fields]) => {
        console.log(results[0]);
        if(results[0].user_id > 0){
            return Promise.resolve(results[0].user_id);
        }else{
            return Promise.resolve(-1);
        }
    }).catch((err) => Promise.reject(err));
}

module.exports = LoginModel;