//will we be changing the user table so that it will have password and username instead of first name, last name?
var db = require("../config/database");
var bcrypt = require('bcrypt');

const LoginModel = {};

LoginModel.authenticate = (username, password) => {

    let userId;
    //no username, password in table will we change the table? or combine the first and last name into one?
    let baseSQL = "select id, username, password from csc648.user where username = ?;";
    return db.execute(baseSQL, [username])
    .then(([results, fields]) => {
        if(results && results.length == 1){
            userId = results[0].id;
            return bcrypt.compare(password, results[0].password);
        }else{
            return Promise.reject(-1);
        }
    }).then((passwordMatch) => {
        if(passwordMatch){
            return Promise.resolve(userId);
        }else{
            return Promise.resolve(-1);
        }
    }).catch((err) => Promise.reject(err));
};

module.exports = LoginModel;