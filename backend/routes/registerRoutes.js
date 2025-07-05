const express = require("express")
const router = express.Router()

// we need to use the model
const { 
    addUser,
} = require("../controllers/registerController")

// POST /register/api/add
router.post("/api/add", addUser)

module.exports = router