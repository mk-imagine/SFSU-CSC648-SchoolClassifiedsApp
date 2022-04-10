const express = require("express");
const mysql = require("mysql");
var dbrouter = require("./routes/database");
const imagerouter = require("./routes/image");

const app = express();
app.use('/api', dbrouter);

app.use('/images', imagerouter);

const port = 3100;
app.listen(port, () => console.log("App is listening on port ", port));