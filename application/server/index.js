const express = require("express");
const mysql = require("mysql");
var dbrouter = require("./routes/dbrouter");

const app = express();
app.use('/api', dbrouter);

const port = 3100;
app.listen(port, () => console.log("App is listening on port ", port));