const express = require("express")

const { authenticate } = require('../middleware/auth');
const { createReview } = require("../controllers/reviewController");
const router = express.Router()

router.post('/create', authenticate, createReview);

module.exports = router