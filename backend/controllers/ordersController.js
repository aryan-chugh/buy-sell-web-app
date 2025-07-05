const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');

const crypto = require("crypto")
const jwt = require('jsonwebtoken');

function compareOtp(otp, storedSalt, storedHash) {
    const hash = crypto.createHmac('sha256', storedSalt).update(otp).digest('hex');
    console.log(hash, storedHash);
    return hash === storedHash;
}

// const closeOrder = async (req, res) => {
//     const { otp } = req.body;
//     try {
//         const order = await orderModel.findById(req.params.order_id);
//         if (compareOtp(otp, salt_user, order.hashedOTP)) {
//             order.status = 'closed';
//             await order.save();
//             res.status(200).json({'msg': 'Transaction closed successfully.'});
//         } else {
//             res.status(400).json({'error': 'Incorrect OTP.'});
//         }
//     } catch (error) {
//         res.status(500).json({'error': error});
//     }
// }

const cancelOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.order_id);
        order.status = 'cancelled';
        await order.save();

        return res.status(200).json({msg: "successfully cancelled!"});
    } catch (error) {
        res.status(500).json({'error': error});
    }
}


// const getOrders =  async (req, res) => {
//     // const userId = req.user._id;
//     console.log(req.user);
//     const user = req.user;
    
//     const userId = user._id;
//     if (!user || !userId) return res.status(404).json({ error: 'User not found' });

//     console.log(userId);
//     try {
//         const orders = await orderModel.find({sellerID: `${userId}`});
//         // console.log(orders);
//         res.json(orders);
//     } catch (error) {
//       res.status(500).json({'error': error});
//     }
// };
const getOrders = async (req, res) => {
    console.log(req.user);
    const user = req.user;
    const userId = user._id;
    if (!user || !userId) return res.status(404).json({ error: 'User not found' });

    try {
        const orders = await orderModel.find({ "sellers.sellerID": userId })
            .populate('buyerID', 'name') // Fetch buyer's name
            .populate('sellers.items.itemID', 'name'); // Fetch item names

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const getOrdersBought =  async (req, res) => {
//     // const userId = req.user._id;
//     // console.log("hello");
//     console.log(req.user);
//     const user = req.user;
//     const userId = user._id;
//     if (!user || !userId) return res.status(404).json({ error: 'User not found' });

//     // console.log(userId);
//     try {
//         const orders = await orderModel.find({buyerID: `${userId}`});
//         // console.log(orders);
//         res.status(200).json(orders);
//     } catch (error) {
//       res.status(500).json({'error': error});
//     }
// };

const getOrdersBought = async (req, res) => {
    console.log(req.user);
    const user = req.user;
    const userId = user._id;
    if (!user || !userId) return res.status(404).json({ error: 'User not found' });

    try {
        const orders = await orderModel.find({ buyerID: userId })
            .populate('sellers.sellerID', 'first_name last_name') // Fetch seller's name
            .populate('sellers.items.itemID', 'name'); // Fetch item name

        console.log(orders);

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const closeOrder = async (req, res) => {
    const { otp } = req.body;
    const orderId = req.params.order_id;
    const user = req.user;

    try {
        const order = await orderModel.findById(orderId);
        
        // Verify the order belongs to the seller
        const isSellerOrder = order.sellers.some(seller => 
            seller.sellerID.toString() === user._id.toString()
        );

        if (!isSellerOrder) {
            return res.status(403).json({'error': 'Unauthorized to close this order.'});
        }

        // You'll need to implement OTP verification logic here
        // This is a placeholder and should be replaced with your actual OTP verification
        console.log(otp, order.hashedOTP, user.salt);

        const buyer = await userModel.findById(order.buyerID);
        console.log(buyer.first_name);
        const isOtpValid = compareOtp(otp, buyer.salt, order.hashedOTP);

        if (isOtpValid) {
            order.status = 'completed';
            await order.save();
            res.status(200).json({'msg': 'Transaction closed successfully.'});
        } else {
            console.log("incorrect!");
            res.status(400).json({'error': 'Incorrect OTP.'});
        }
    } catch (error) {
        res.status(500).json({'error': error.message});
    }
}


module.exports = {
    closeOrder,
    getOrders,
    cancelOrder,
    getOrdersBought,
}