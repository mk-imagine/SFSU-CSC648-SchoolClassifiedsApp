/*
 * This is the register model. Here sql is executed. 
 * createAccount is to insert a user into the user table and select that user to check if it's there.
 * usernameExist is to select a user to see if that user exists
 * emailExist is to select a user who has a certain email to see if that email is being used
 */
var bcrypt = require("bcrypt");
const db = require('../config/db2');

const RegisterModel = {};

//execute sql to create account
RegisterModel.createAccount = (firstname, lastname, username, password, email) => {
    console.log(password);
    return bcrypt.hash(password, 0)
        .then((hashedPassword) => {
            console.log("hashed password is? " + hashedPassword);
            let baseSQL = `INSERT INTO csc648.user (user_fname, user_lname, user_username, 
                            user_password, user_email)
                        VALUES (?,?,?,?,?);`;
            return db.execute(baseSQL, [firstname, lastname, username, hashedPassword, email])
        }).then(([results, fields]) => {
            return db.execute(`select * from csc648.user where user_username = "${username}";`)
        })
        .then(([results, fields]) => {
            console.log("db has executed. what are the results?: \n" + JSON.stringify(results));
            console.log("Hhow do i get the userid?\n" + results[0].user_id);
            if (results) {
                return Promise.resolve(results[0].user_id);
            } else {
                return Promise.resolve(-1);
            }
        }).catch((err) => Promise.reject(err));
};

//execute sql to see if there is already someone with that username
RegisterModel.usernameExist = (username) => {
    console.log("in the usernameexist. what is username? :" + username);
    return db.execute(`select user_id from csc648.user where user_username = ?`, [username])
        .then(([results, fields]) => {
            if (results && results.length) {
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        }).catch((err) => Promise.reject(err));
};

//execute sql to see if there is already someone with that email
RegisterModel.emailExist = (email) => {
    return db.execute('select * from csc648.user where user_email = ?', [email])
        .then(([results, fields]) => {
            if (results && results.length) {
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        }).catch((err) => Promise.reject(err));
};

module.exports = RegisterModel;
