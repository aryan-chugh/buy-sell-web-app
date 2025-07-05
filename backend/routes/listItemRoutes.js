const express = require("express")
const router = express.Router()

// we need to use the model
const itemModel = require("../models/itemModel")
const { authenticate } = require("../middleware/auth");
const { addToList } = require("../controllers/listItemController");

// router.post('/api/add', authenticate, addToList);
const upload = require('../middleware/upload');
router.post('/api/add', authenticate, upload.array('images', 5), addToList);
// router.post('/api/increase_stock', authenticate, );

module.exports = router