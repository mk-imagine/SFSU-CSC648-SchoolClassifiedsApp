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

LoginModel.resetPassword = async (userId, newPassword) =>{
    let baseSQL = `update csc648.user set user_password = ? where user_id = ?;`;
    console.log("UserId: ", userId, "Password: ", newPassword)
    const hashedPassword = await bcrypt.hash(newPassword,0);
    return db.execute(baseSQL, [hashedPassword, userId])
            .then(() => {
            return Promise.resolve(userId);
            })
            .catch((err) => Promise.reject(err));
};

module.exports = LoginModel;