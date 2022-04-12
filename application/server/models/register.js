//will we be changing the user table so that it will have password and username instead of first name, last name?
//var config = require("../config/database");
//const mysql = require("mysql");
//var db = mysql.createConnection(config.databaseOptions);
var bcrypt = require("bcrypt");
const mysql = require("mysql");
const configdb = require('../config/database');
const db = new configdb();

const RegisterModel = {};

//execute sql to create account
RegisterModel.createAccount = (firstname, lastname, username, password, email) => {
    console.log(password);
    //This is commented out becuse even with 0, the hashed password is too long, I keep getting
    //Error: ER_DATA_TOO_LONG: Data too long for column 'user_password' at row 1
    //like is I bcrypt 0 the password !Q1q1234 it's $2b$10$X2X6jclnqutyDV1W7cYR9uOi0xSmgeU7njbIYsnVRAtJ9pUsRorDm

    //return bcrypt.hash(password,-1)

    //.then((hashedPassword) => {
        //console.log("hashed password is? "+hashedPassword);
        let baseSQL = `INSERT INTO csc648.user (user_fname, user_lname, user_username, 
                            user_password, user_email)
                        VALUES (?,?,?,?,?);`;
  

        db.query(baseSQL, [firstname, lastname, username, password, email])
        return db.query('select * from csc648.user where user_username = ?',[username])
    //})
    .then(([results, fields]) => {
        
        console.log("db has executed. what are the results?: \n"+results);
        if(results){
            return Promise.resolve(results.user_id);
        }else{
            return Promise.resolve(-1);
        }
    }).catch((err) => Promise.reject(err));
};

//execute sql to see if there is already someone with that username
//no username in table
RegisterModel.usernameExist = (username) => {
    //no username in table
    console.log("in the usernameexist. what is username? :"+username);
    return db.query('select * from csc648.user where user_username = ?',[username])
    .then(([results, fields]) => {
        console.log("db has executed. what are the results?: \n"+results);
        return Promise.resolve(results);
    }).catch((err) => Promise.reject(err));
};

//execute sql to see if there is already someone with that email
RegisterModel.emailExist = (email) => {
    return db.query('select * from csc648.user where user_email = ?',[email])
    .then(([results, fields]) => {
        console.log("db has executed. what are the results?: \n"+results);
        return Promise.resolve(results);
    }).catch((err) => Promise.reject(err));
};

module.exports = RegisterModel;
