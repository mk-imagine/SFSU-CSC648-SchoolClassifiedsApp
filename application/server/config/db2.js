const mysql = require('mysql2');

/**
 * Configure mySQL connection pool
 */
const pool = mysql.createPool({
    host: "localhost",
    user:"root",
<<<<<<< HEAD
    password:"Gatorbear1994",
=======
    // password:"Kobe5414123",
    password:"csc648team8",
>>>>>>> d054509c9e6c20b6239b4e5677aaefffc582a87c
    database:"csc648",
    connectionLimit: 50,
    debug:false
});

// Create promise pool from connection pool
const promisePool = pool.promise();
module.exports = promisePool;