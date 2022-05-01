/*
 * This is a login model. This is where we execute an mysql statment to see if the user is actually a user.
 * 
 */
const mysql = require("mysql");
var bcrypt = require('bcrypt');
const db = require('../config/db');

const LoginModel = {};

LoginModel.authenticate = (username, password) => {

    let userId;
    let baseSQL = `select user_id, user_email, user_password
                    from csc648.user
                    where user_email = ?;`;

    return db.execute(baseSQL, [username])
        .then(([results, fields]) => {
            console.log(results);
            console.log(results.length);
            if (results && !results[1]) {
                userId = results[0].user_id;
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

module.exports = LoginModel;