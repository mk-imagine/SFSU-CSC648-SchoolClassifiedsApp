let mysql = require("mysql");

let con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "csc648team8"
});

con.connect((err) => {
	if (err) throw err;
	console.log("Connection established");
});
