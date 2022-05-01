const express = require("express");
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

/**
 * Configure mysqlSession
 */
var mysqlSessionStore = new mysqlSession(
    {
        /*using default options*/
    },
    require('./config/db2')
);

/**
 * Use Sessions
 */
app.use(sessions({
    key: "csid",//key used for cookie for front end
    secret: "csc648",//used to sign cookie
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false//don't save sessions that we don't initialize ourselves
}));

/**
 * Use express.json for json parsing for incoming requests
 */
app.use(express.json());
// app.use(cookieParser());
//app.use('/createpost', postingrouter);

/**
 * Track login state in sessions
 */
app.use((req, res, next) => {
    //console.log(req.session);
    if(req.session.username) {
        res.locals.logged = true;
    }
    next();
})

/**
 * Routes
 */
app.use('/api', itemapi);
app.use('/api/images', imagerouter);
app.use('/api/login',loginrouter);
app.use('/api/post', postingrouter);
app.use('/api/register', registerrouter);
app.use('/api/msg', msgrouter);

/**
 * Load flash messages middleware
 */
app.use(flash());

const port = 3100;
app.listen(port, () => console.log("App is listening on port ", port));