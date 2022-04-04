//will we be changing the user table so that it will have password and username instead of first name, last name?
var db = require("../config/database");
var bcrypt = require("bcrypt");

const RegisterModel = {};

//execute sql to create account
RegisterModel.createAccount = (username, password, email) => {
    return bcrypt.hash(password,3)
    .then((hashedPassword) => {
        let baseSQL = "insert into cscs648.user (username, ";//no username, password in table
        return db.execute(baseSQL, [username, email, hashedPassword]);

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
    return db.execute('select * from cscs648.user where username = ?',[username])
    .then(([results, fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    }).catch((err) => Promise.reject(err));
};

//execute sql to see if there is already someone with that email
RegisterModel.emailExist = (email) => {
    return db.execute('select * from csc648.user where email = ?',[email])
    .then(([results, fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    }).catch((err) => Promise.reject(err));
};

module.exports = RegisterModel;
