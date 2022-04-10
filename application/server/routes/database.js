const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "csc648team8"
});

con.connect((err) => {
  if (err) throw err;
  console.log("Database connection established");
});

router.get("/", (req, res) => {
  res.send("Successful response.");
});

router.get("/categories", (req, res) => {
  con.query(
    "SELECT category_name, category_id from csc648.category",
    (err, rows) => {
      if (err) {
        res.send(err);
      }
      //console.log("Data received from Db:");
      res.send(rows);
    }
  );
});

router.get("/items", (req, res) => {
  con.query("SELECT * from csc648.item", (err, rows) => {
    if (err) {
      res.send(err);
    }
    //console.log("Data received from Db:");
    res.send(rows);
  });
});

router.get("/itemwithcategory/:searchWord/:categoryWord", (req, res) => {
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

router.get("/searchcategory/:searchCategory", (req, res) => {
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

router.get("/searchitems/:searchWord", (req, res) => {
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

router.get("/getpic/:name", (req, res) => {
  const name = req.params.name;
  const url = `https://csc648-t8-user-uploaded-images.s3.amazonaws.com/${name}`;
  res.send({ url: url });
});

module.exports = router;