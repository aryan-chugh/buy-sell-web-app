const express = require('express');
const { getUserProfile } = require('../controllers/profileController');
const { authenticate } = require('../middleware/auth');
const { closeOrder, getOrders, getOrdersBought, cancelOrder } = require('../controllers/ordersController')

const router = express.Router();

router.get('/api/get_sold', authenticate, getOrders);
router.get('/api/get_bought', authenticate, getOrdersBought);
// router.post('/:order_id/close', authenticate, closeOrder);
router.post('/api/cancel/:order_id', authenticate, cancelOrder);

router.get('/api/get_seller_orders', authenticate, getOrders);
// router.post('/api/regenerate/:order_id', authenticate, regenerateOtp);
router.post('/api/close/:order_id', authenticate, closeOrder);
  
module.exports = router;
