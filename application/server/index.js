// const path = require('path');
// // load dependencies
// const env = require('dotenv');
// const csrf = require('csurf');
// const express = require('express');
// const flash = require('express-flash');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const expressHbs = require('express-handlebars');
// const SequelizeStore = require("connect-session-sequelize")(session.Store); // initalize sequelize with session store

// const app = express();
// const csrfProtection = csrf();
// const router = express.Router();

// //Loading Routes
// const webRoutes = require('./routes/web');
// const sequelize = require('./config/database');
// const errorController = require('./app/controllers/ErrorController');

// env.config();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// // required for csurf
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET,
//   	cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
//     store: new SequelizeStore({
//     	db: sequelize,
//     	table: "sessions",
//     }),
// }));

// app.use(csrfProtection);
// app.use(flash());

// app.use((req, res, next) => {
// 	res.locals.isAuthenticated = req.session.isLoggedIn;
// 	res.locals.csrfToken = req.csrfToken();
// 	next();
// });

// app.engine(
// 	'hbs',
// 	expressHbs({
// 		layoutsDir: 'views/layouts/',
// 		defaultLayout: 'web_layout',
// 		extname: 'hbs'
// 	})
// );
// app.set('view engine', 'hbs');
// app.set('views', 'views');

// app.use(webRoutes);
// app.use(errorController.pageNotFound);

// sequelize
// 	//.sync({force : true})
// 	.sync()
// 	.then(() => {
// 		app.listen(process.env.PORT);
// 		//pending set timezone
// 		console.log("App listening on port " + process.env.PORT);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
  host: "54.90.37.137",
  port: "3306",
  database: "cs",
  user: "root",
  password: "csc648team8"
});

con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.get("/categories", (req, res) => {
  con.query(
    "SELECT category_name, category_id from csc648.category",
    (err, rows) => {
      if (err) {
        res.send(err);
      }
      console.log("Data received from Db:");
      res.send(rows);
    }
  );
});

app.get("/items", (req, res) => {
  con.query("SELECT * from csc648.item", (err, rows) => {
    if (err) {
      res.send(err);
    }
    console.log("Data received from Db:");
    res.send(rows);
  });
});

// localhost:3000/itemwithcategory/searchwordhere/categorywordhere
app.get("/itemwithcategory/:searchWord/:categoryWord", (req, res) => {
  const searchWord = "%" + req.params.searchWord + "%";
  const categoryWord = "%" + req.params.categoryWord + "%";
  console.log("Hello = " + req.params.searchWord);
  const query =
    "select * from csc648.item left join csc648.category on item.item_category = category.category_id where (item.item_name like ? or item.item_desc like ?) and category.category_name like ?;";
  con.query(query, [searchWord, searchWord, categoryWord], (err, rows) => {
    if (err) {
      res.send(err);
    }
    res.send(rows);
  });
});

//Takes in a category and returns an array with all items from that category.
// localhost:3000/searchcategory/searchcategorywordhere
app.get("/searchcategory/:searchCategory", (req, res) => {
  const searchCategory = "%" + req.params.searchCategory + "%";
  console.log(searchCategory);
  const query =
    "select * from csc648.item left join csc648.category on item.item_category = category.category_id where category.category_name like ?;";
  con.query(query, [searchCategory], (err, rows) => {
    if (err) {
      res.send(err);
    }
    res.send(rows);
  });
});

//done
//Takes in a searchword and returns an array with the items with that searchword in its name or description.
// localhost:3000/searchitems/searchwordhere
app.get("/searchitems/:searchWord", (req, res) => {
  const searchWord = "%" + req.params.searchWord + "%";
  const query =
    "select * from csc648.item where item_name like ? or item_desc like ?;";
  con.query(query, [searchWord, searchWord], (err, rows) => {
    if (err) {
      res.send(err);
    }
    res.send(rows);
  });
});

//Getting the URL of the image. The other functions call on this function for url.
//It takes in the value of item_pic from the item table and gets the image from the s3 bucket.
// localhost:3000/getpic/namehere
app.get("/getpic/:name", (req, res) => {
  const name = req.params.name;
  const url = `https://csc648-t8-user-uploaded-images.s3.amazonaws.com/${name}`;
  res.send({ url: url });
});

const port = 8080;
app.listen(port, () => console.log("App is listening on port ", port));
