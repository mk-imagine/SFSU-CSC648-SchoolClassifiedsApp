const express = require("express");
const router = express.Router();
const ItemsModel = require("../models/item");

router.get("/", (req, res) => {
  res.send("Item Route Successful Response.");
});

router.get("/categories", async (req, res, next) => {
  try {
    const results = await ItemsModel.getCategories();
    if (results && results.length) {
      res.send(results);
    } else {
      res.send([])
    }
  } catch (err) {
    next(err);
  }
});

router.get("/items", async (req, res, next) => {
  try {
    const results = await ItemsModel.getAllItems();
    if (results && results.length) {
      res.send(results);
    } else {
      res.send([]);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/itemwithcategory/:searchWord/:categoryWord", async (req, res, next) => {
  try {
    const searchWord = "%" + req.params.searchWord + "%";
    const category = "%" + req.params.categoryWord + "%";
    const results = await ItemsModel.categoryAndItemSearch(category, searchWord);
    if (results && results.length) {
      res.send(results);
    } else {
      res.send([]);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/searchcategory/:searchCategory", async (req, res, next) => {
  try {
    const category = "%" + req.params.searchCategory + "%";
    const results = await ItemsModel.categorySearch(category);
    if (results && results.length) {
      res.send(results);
    } else {
      res.send([]);
    }
  } catch {
    next(err);
  }
});

router.get("/searchitems/:searchWord", async (req, res, next) => {
  try {
    const searchWord = "%" + req.params.searchWord + "%";
    const results = await ItemsModel.itemSearch(searchWord);
    if (results && results.length) {
      res.send(results);
    } else {
      res.send([]);
    }
  } catch {
    next(err);
  }
});

module.exports = router;