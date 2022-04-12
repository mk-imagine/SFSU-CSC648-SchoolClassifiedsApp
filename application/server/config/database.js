//code from https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
//There seems to be something with mysql and promises so I included this
//I assume we are not doing mysql2?
const mysql = require( 'mysql' );
class Database {
    constructor() {
        var config = {
        host     : 'localhost',
        user     : 'root',
        password : 'csc648team8',
        port     : '3306'};
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
module.exports = Database;


/* module.exports.databaseOptions = {
    host     : 'localhost',
    user     : 'root',
    password : 'csc648team8',
    port     : '3306'
  }; */