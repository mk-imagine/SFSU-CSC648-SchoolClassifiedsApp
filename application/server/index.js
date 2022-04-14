const express = require("express");
const mysql = require("mysql2");
// var cookieParser = require('cookie-parser');
var dbrouter = require("./routes/database");
const imagerouter = require("./routes/image");
const postingrouter = require('./routes/posting');
const loginrouter = require('./routes/login');
const registerrouter = require('./routes/register');

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

app.use('/api', dbrouter);

app.use('/images', imagerouter);

app.use('/login',loginrouter);
app.use('/post', postingrouter);
app.use('/register', registerrouter);


app.use(flash());

const port = 3100;
app.listen(port, () => console.log("App is listening on port ", port));