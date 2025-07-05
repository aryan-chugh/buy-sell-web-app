const mongoose = require('mongoose');
const userModel = require('../models/userModel')
const cartModel = require('../models/cartModel')
const itemModel = require('../models/itemModel')
const orderModel = require('../models/orderModel')
const reviewModel = require('../models/ReviewModel')

const createReview = async (req, res) => {
    try {
        const { orderId, itemId, sellerId, rating, comment } = req.body;
        const userId = req.user._id;

        // Find the order
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Validate that the item exists in the order for the specified seller
        const sellerEntry = order.sellers.find(
            seller => seller.sellerID.toString() === sellerId
        );
        
        if (!sellerEntry) {
            return res.status(404).json({ error: 'Seller not found in this order' });
        }

        const itemEntry = sellerEntry.items.find(
            item => item.itemID.toString() === itemId
        );

        if (!itemEntry) {
            return res.status(404).json({ error: 'Item not found in this order for the specified seller' });
        }

        // Create a new review
        const newReview = new reviewModel({
            user: userId,
            rating,
            comment: comment || '',
            createdAt: new Date()
        });

        await newReview.save();

        // Update seller's reviews
        await userModel.findByIdAndUpdate(
            sellerId,
            {
                $push: {
                    seller_reviews: {
                        reviewer: userId,
                        rating,
                        comment: comment || '',
                        created_at: new Date()
                    }
                }
            }
        );

        // Update item's reviews and reviews_count
        await itemModel.findByIdAndUpdate(
            itemId,
            {
                $push: { reviews: newReview._id },
                $inc: { reviews_count: 1 }
            }
        );

        res.status(201).json({
            message: 'Review submitted successfully',
            review: newReview
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createReview,
};

// const createReview = async (req, res) => {
//     try {
//       const { orderId, rating, comment } = req.body;
//       const userId = req.user._id;

        
//       // Find the order to get additional context if needed
//       const order = await orderModel.findById(orderId);
//       if (!order) {
//         return res.status(404).json({ error: 'Order not found' });
//       }
  
//       // Create a new review
//       const newReview = new reviewModel({
//         user: userId,
//         rating,
//         comment: comment || '',
//         createdAt: new Date()
//       });
  
//       await newReview.save();
  
//       // Update order to mark as reviewed
//       order.reviewed = true;
//       await order.save();
  
//       res.status(201).json({ 
//         message: 'Review submitted successfully', 
//         review: newReview 
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

// module.exports = {
//   createReview,
// };
