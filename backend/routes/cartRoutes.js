const express = require("express")
const router = express.Router()

// we need to use the model
const cartModel = require("../models/cartModel")
const { addItem, checkout, removeItem, getCartItems, reduceItem } = require("../controllers/cartController");
const { authenticate } = require("../middleware/auth");

router.get('/api/get_items', authenticate, getCartItems);
router.post('/api/add_item', authenticate, addItem);
router.post('/api/reduce_item', authenticate, reduceItem);
router.post('/api/remove_item', authenticate, removeItem);
router.post("/api/checkout", authenticate, checkout);
// router.get("/api/add_similar", ....);

module.exports = router