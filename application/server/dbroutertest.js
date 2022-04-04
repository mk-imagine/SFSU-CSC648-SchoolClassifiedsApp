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
  res.send(["Successful response. Categories"]);
});

router.get("/items", (req, res) => {
  res.send(["Successful response. Items"]);
});

router.get("/itemwithcategory/:searchWord/:categoryWord", (req, res) => {
  res.send([req.params.categoryWord]);
});

router.get("/searchcategory/:searchCategory", (req, res) => {
  res.send([req.params.searchCategory]);
});

router.get("/searchitems/:searchWord", (req, res) => {
  res.send([req.params.searchWord]);
});

router.get("/getpic/:name", (req, res) => {
  res.send({ url: req.params.name });
});

module.exports = router;