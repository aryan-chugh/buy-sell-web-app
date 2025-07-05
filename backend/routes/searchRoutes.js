const express = require("express")
const router = express.Router()

// we need to use the model
const itemModel = require("../models/itemModel")
const {
    getItems,
    getTopMostBoughtItems,
    getCategories
} = require("../controllers/search/SearchController");

router.get("/api/get_all", getItems);
router.get("/api/get_categories", getCategories);

module.exports = router