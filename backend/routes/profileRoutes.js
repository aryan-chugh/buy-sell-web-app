const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.get('/get', authenticate, getUserProfile);
router.put('/update', authenticate, updateUserProfile);

module.exports = router;
