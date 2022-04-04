const express = require("express");
const mysql = require("mysql");
var router = require("./dbroutertest");

const app = express();
app.use('/api', router);

const port = 3100;
app.listen(port, () => console.log("App is listening on port ", port));