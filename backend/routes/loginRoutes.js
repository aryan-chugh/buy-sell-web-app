const express = require("express")
const router = express.Router()

// we need to use the model
const { 
    authenticateUser,
    handleCASCallback,
} = require("../controllers/loginController")

// POST /login/api/auth
router.post("/api/auth", authenticateUser)
router.get('/api/auth/cas/callback', handleCASCallback);

module.exports = router