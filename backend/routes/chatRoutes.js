const express = require("express")
const router = express.Router()

const { authenticate } = require("../middleware/auth");
const { talkbot } = require("../controllers/chatbotController");

router.post('/api/chat', authenticate, talkbot);
module.exports = router