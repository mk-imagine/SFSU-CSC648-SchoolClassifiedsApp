//will we be changing the user table so that it will have password and username instead of first name, last name?
var config = require("../config/database");
const mysql = require("mysql");
var db = mysql.createConnection(config.databaseOptions);
var bcrypt = require("bcrypt");

const RegisterModel = {};

//execute sql to create account
RegisterModel.createAccount = (firstname, lastname, username, password, email) => {
    return bcrypt.hash(password,3)
    .then((hashedPassword) => {
        let baseSQL = `INSERT INTO cscs648.user (user_fname, user_lname, user_username, 
                            user_password, user_email)
                        VALUES (?,?,?,?,?);`;
        return db.execute(baseSQL, [firstname, lastname, username, hashedPassword, email]);

    }).then(([results, fields]) => {
        if(results && results.affectedRows){
            return Promise.resolve(results.insertId);
        }else{
            return Promise.resolve(-1);
        }
    }).catch((err) => Promise.reject(err));
};

//execute sql to see if there is already someone with that username
//no username in table
RegisterModel.usernameExist = (username) => {
    //no username in table
    return db.execute('select * from cscs648.user where user_username = ?',[username])
    .then(([results, fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    }).catch((err) => Promise.reject(err));
};

//execute sql to see if there is already someone with that email
RegisterModel.emailExist = (email) => {
    return db.execute('select * from csc648.user where user_email = ?',[email])
    .then(([results, fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    }).catch((err) => Promise.reject(err));
};

module.exports = RegisterModel;
