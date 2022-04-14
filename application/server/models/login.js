//will we be changing the user table so that it will have password and username instead of first name, last name?
//var db = require("../config/database");
const mysql = require("mysql");
//const db = mysql.createConnection(config.databaseOptions);
var bcrypt = require('bcrypt');
// const configdb = require('../config/database');
const db = require('../config/db2');

const LoginModel = {};

LoginModel.authenticate = (username, password) => {
    
    let userId;
    let baseSQL = `select user_id, user_username, user_password
                    from csc648.user
                    where user_username = ?;`;
    
    return db.execute(baseSQL,[username])
    .then(([results, fields]) => {
        console.log(results);
        console.log(results.length);
        
        if(results && !results[1]){
            userId = results[0].user_id;
           //var hashed = bcrypt(password,0);
           console.log("what is password; "+password+" what is results password: "+results[0].user_password);
            return bcrypt.compare(password, results[0].user_password);
            //return (hashed && results.user_password);
        }else{
            return Promise.reject(-1);
        }
    }).then((passwordMatch) => {
        console.log('does password match?: '+passwordMatch);
        if(passwordMatch){
            return Promise.resolve(userId);
        }else{
            return Promise.resolve(-1);
        }
    }).catch((err) => Promise.reject(err));
};

module.exports = LoginModel;