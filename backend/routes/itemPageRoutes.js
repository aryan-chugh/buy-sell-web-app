const express = require("express")
const router = express.Router()

// we need to use the model
const {
    getDetails,
    getRecommendations,
    getReviews,
} = require("../controllers/itemPageController")

// GET all jobs
router.get("/api/:item_id", getDetails)
router.get("/api/:item_id/recommend", getRecommendations)
router.get("/api/:item_id/reviews", getReviews)

module.exports = router