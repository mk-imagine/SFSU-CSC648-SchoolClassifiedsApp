const mysql = require('mysql2');

/**
 * Configure mySQL connection pool
 */
const pool = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"csc648team8",
    database:"csc648",
    connectionLimit: 50,
    debug:false
});

// Create promise pool from connection pool
const promisePool = pool.promise();
module.exports = promisePool;