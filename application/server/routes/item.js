const express = require("express");
const router = express.Router();
const ItemsModel = require("../models/item");

/**
 * Item Route Test
 */
router.get("/", (req, res) => {
  res.send("Item Route Successful Response.");
});

/**
 * Category Retrieval Router
 */
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

/**
 * Item Retrieval Router
 */
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

/**
 * Keyword and Category Search Router
 */
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

/**
 * Category Search Router
 */
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

/**
 * Keyword Search Router
 */
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

/**
 * Get seller info router
 */
 router.get("/getSeller/:itemId", async (req, res, next) => {
  try {
    const results = await ItemsModel.getSellerInfo(req.params.itemId);
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