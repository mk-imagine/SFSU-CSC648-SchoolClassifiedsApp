const express = require("express");
const router = express.Router();
const ItemsModel = require("../models/item");

router.get("/", (req, res) => {
  res.send("Item Route Successful Response.");
});

router.get("/categories/:sortBy/:direction", async (req, res, next) => {
  try {
    const sortBy = req.params.sortBy;
    const direction = req.params.direction;
    const results = await ItemsModel.getCategories(sortBy, direction);
    if (results && results.length) {
      res.send(results);
    } else {
      res.send([])
    }
  } catch (err) {
    next(err);
  }
});

router.get("/items/:sortBy/:direction", async (req, res, next) => {
  try {
    const sortBy = req.params.sortBy;
    const direction = req.params.direction;
    const results = await ItemsModel.getAllItems(sortBy, direction);
    if (results && results.length) {
      res.send(results);
    } else {
      res.send([]);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/itemwithcategory/:searchWord/:categoryWord/:sortBy/:direction", async (req, res, next) => {
  try {
    const searchWord = "%" + req.params.searchWord + "%";
    const category = "%" + req.params.categoryWord + "%";
    const sortBy = req.params.sortBy;
    const direction = req.params.direction;
    const results = await ItemsModel.categoryAndItemSearch(category, searchWord, sortBy, direction);
    if (results && results.length) {
      res.send(results);
    } else {
      res.send([]);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/searchcategory/:searchCategory/:sortBy/:direction", async (req, res, next) => {
  try {
    const category = "%" + req.params.searchCategory + "%";
    const sortBy = req.params.sortBy;
    const direction = req.params.direction;
    const results = await ItemsModel.categorySearch(category, sortBy, direction);
    if (results && results.length) {
      res.send(results);
    } else {
      res.send([]);
    }
  } catch {
    next(err);
  }
});

router.get("/searchitems/:searchWord/:sortBy/:direction", async (req, res, next) => {
  try {
    const searchWord = "%" + req.params.searchWord + "%";
    const sortBy = req.params.sortBy;
    const direction = req.params.direction;
    const results = await ItemsModel.itemSearch(searchWord, sortBy, direction);
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