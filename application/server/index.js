const express = require("express");
const mysql = require("mysql2");
// var cookieParser = require('cookie-parser');
var itemapi = require("./routes/item");
const imagerouter = require("./routes/image");
const postingrouter = require('./routes/posting');
const loginrouter = require('./routes/login');
const registerrouter = require('./routes/register');
const msgrouter = require('./routes/message');

var sessions = require('express-session');
var mysqlSession = require('express-mysql-session')(sessions);

const app = express();


const flash = require("express-flash");
//configure sessions
var mysqlSessionStore = new mysqlSession(
    {
        /*using default options*/
    },
    require('./config/db2')
);
app.use(sessions({
    key: "csid",//key used for cookie for front end
    secret: "csc648",//used to sign cookie
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false//don't save sessions that we don't initialize ourselves
}));


app.use(express.json());
// app.use(cookieParser());
//app.use('/createpost', postingrouter);

//keep track of login/out state
app.use((req, res, next) => {
    console.log(req.session);
    if(req.session.username) {
        res.locals.logged = true;
    }
    next();
})

app.use('/api', itemapi);

app.use('/api/images', imagerouter);

app.use('/api/login',loginrouter);
app.use('/api/post', postingrouter);
app.use('/api/register', registerrouter);
app.use('/api/msg', msgrouter);

app.use(flash());

const port = 3100;
app.listen(port, () => console.log("App is listening on port ", port));