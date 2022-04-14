const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"csc648team8",
    database:"csc648",
    connectionLimit: 50,
    debug:false
});

const promisePool = pool.promise();
module.exports = promisePool;