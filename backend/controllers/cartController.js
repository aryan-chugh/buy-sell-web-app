
const mongoose = require('mongoose');
const userModel = require('../models/userModel')
const cartModel = require('../models/cartModel')
const itemModel = require('../models/itemModel')
const orderModel = require('../models/orderModel')


const crypto = require("crypto");
function hash(otp, salt) {
    // console.log(salt);
    const hash = crypto.createHmac('sha256', salt).update(otp).digest('hex');
    // console.log(hash);
    return hash;
}

const getCartItems = async (req, res) => {
    try {
        const user = JSON.parse(req.user);
        if (!user || !user._id) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cart = await cartModel.findOne({ user_id: user._id }).populate('items.item');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json({ items: cart.items });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addItem = async (req, res) => {
    const { item_id, quantity } = req.body;
    try {
        const user = JSON.parse(req.user);
        if (!user || !user._id) {
            return res.status(404).json({ error: 'User not found' });
        }
        // console.log(item_id);
        // console.log(!mongoose.Types.ObjectId.isValid(item_id));
        

        if (!mongoose.Types.ObjectId.isValid(item_id) || !quantity || quantity < 1) {
            return res.status(400).json({ error: 'Invalid input parameters' });
        }
        // console.log("hello");

        const item = await itemModel.findById(item_id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        // console.log("hello");

        if (item.seller_id.toString() === user._id.toString()) {
            return res.status(200).json({ status: '306', error: 'You cannot add your own item to the cart' });
        }

        console.log(quantity, item.stock);
        if (quantity > item.stock) {
            return res.status(200).json({ status: '304', error: `Only ${item.stock} items are available in stock` });
        }
        item.stock -= quantity;
        await item.save(); // Save the item with the updated stock

        const cart = await cartModel.findOne({ user_id: user._id });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        // console.log("hello");

        // console.log(cart);
        const existingItem = cart.items.find(cartItem => cartItem.item.toString() === item_id);
        // console.log(existingItem);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ item: item_id, quantity });
        }
        await cart.save();
        res.status(200).json({ message: 'Item added successfully', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const reduceItem = async (req, res) => {
    const { item_id, item_quantity } = req.body;

    try {
        const user = JSON.parse(req.user);
        if (!user || !user._id) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!mongoose.Types.ObjectId.isValid(item_id)) {
            return res.status(400).json({ error: 'Invalid item ID' });
        }

        const cart = await cartModel.findOne({ user_id: user._id });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const cartItemIndex = cart.items.findIndex(cartItem => cartItem.item.toString() === item_id);

        if (cartItemIndex === -1) {
            return res.status(404).json({ error: 'Item not in cart' });
        }

        // if (item_quantity >= cart.items[cartItemIndex].quantity) {
        //     cart.items.splice(cartItemIndex, 1);
        // } else {
        //     cart.items[cartItemIndex].quantity -= item_quantity;
        // }

        const cartItem = cart.items[cartItemIndex];

        if (item_quantity >= cartItem.quantity) {
            // If the item quantity to be reduced is equal to or greater than the current quantity, remove the item from the cart
            // cart.items.splice(cartItemIndex, 1);
            // Increment the stock by the quantity of the removed item
            const item = await itemModel.findById(item_id);
            if (item) {
                item.stock += cartItem.quantity;
                await item.save(); // Save the updated stock
            }
            cart.items = cart.items.filter(cartItem => cartItem.item.toString() !== item_id);
            await cart.save();
        } else {
            // If the item quantity to be reduced is less than the current quantity, simply decrement the quantity in the cart
            cartItem.quantity -= item_quantity;
            // Increment the stock by the quantity reduced
            const item = await itemModel.findById(item_id);
            if (item) {
                item.stock += item_quantity;
                await item.save(); // Save the updated stock
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Item removed successfully', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeItem = async (req, res) => {
    const { item_id } = req.body;

    try {
        const user = JSON.parse(req.user);
        if (!user || !user._id) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!mongoose.Types.ObjectId.isValid(item_id)) {
            return res.status(400).json({ error: 'Invalid item ID' });
        }

        const cart = await cartModel.findOne({ user_id: user._id });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const cartItemIndex = cart.items.findIndex(cartItem => cartItem.item.toString() === item_id);
        if (cartItemIndex === -1) {
            return res.status(404).json({ error: 'Item not in cart' });
        }
        const cartItem = cart.items[cartItemIndex];

        const item = await itemModel.findById(item_id);
        if (item) {
            item.stock += cartItem.quantity;
            await item.save(); // Save the updated stock
        }

        // Remove the specific item from cart
        cart.items = cart.items.filter(cartItem => cartItem.item.toString() !== item_id);

        await cart.save();
        res.status(200).json({ message: 'Item removed successfully', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const checkout = async (req, res) => {
//     let total = 0;
//     try {
//         const user = JSON.parse(JSON.stringify(req.user));
//         if (!user || !user._id) {
//             return res.status(404).json({ error: 'User not found' });
//         }   

//         const cart = await cartModel.findOne({ user_id: user._id }).populate('items.item');
//         if (!cart) {
//             return res.status(404).json({ error: 'Cart not found' });
//         }

//         const sellersMap = new Map();

//         cart.items.forEach(cartItem => {
//             total += cartItem.item.price * cartItem.quantity;
//             const sellerID = cartItem.item.seller_id.toString();
//             if (!sellersMap.has(sellerID)) {
//                 sellersMap.set(sellerID, []);
//             }
//             sellersMap.get(sellerID).push({
//                 itemID: cartItem.item._id,
//                 quantity: cartItem.quantity
//             });
//         });

//         const sellers = Array.from(sellersMap, ([sellerID, items]) => ({
//             sellerID,
//             items
//         }));

//         const transactionID = "T" + Date.now().toString().slice(-10);
//         const  = Math.floor(100000 + Math.random() * 900000).toString();
//         const hashed = hash(, user.salt);

//         let order = new orderModel({
//             transactionID,
//             buyerID: user._id,
//             sellers,
//             amount: total,
//             hashed,
//             status: 'pending'
//         });

//         await order.save();

        
//         // const buyerID = user._id;
//         // const amount = total  ;
//         // const status = 'pending';
//         // let order = new orderModel({
//         //     transactionID,
//         //     buyerID,
//         //     sellerIDs,
//         //     amount,
//         //     hashed,
//         //     status,
//         // });
//         // await order.save();

//         cart.items = [];
//         cart.num_items = 0;
//         await cart.save();

//         res.status(200).json({
//             "message" : 'Checkout successful',
//             "bill" : total,
//             "order_id": order._id,
//             "": ,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const checkout = async (req, res) => {
    try {
        const user = JSON.parse(JSON.stringify(req.user));
        if (!user || !user._id) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cart = await cartModel.findOne({ user_id: user._id }).populate('items.item');
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ error: 'Cart is empty' });
        }

        let orders = [];
        // console.log(cart);
        for (const cartItem of cart.items) {
            let total = cartItem.item.price * cartItem.quantity;
            total = total * 1.1;

            total = total.toFixed(2);
            console.log(total);
            const timestampPart = Date.now().toString().slice(-6); // Get the last 6 digits of the timestamp
            const randomPart = Math.floor(100000 + Math.random() * 900000).toString().slice(0, 4); // 4-digit random number
            const transactionID = "T" + timestampPart + randomPart;
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const hashedOTP = hash(otp, user.salt);

            let order = new orderModel({
                transactionID,
                buyerID: user._id,
                sellers: [{
                    sellerID: cartItem.item.seller_id,
                    items: [{
                        itemID: cartItem.item._id,
                        quantity: cartItem.quantity
                    }]
                }],
                amount: total,
                hashedOTP,
                status: 'pending'
            });

            console.log("hello");

            await order.save();
            console.log("hello");
            orders.push({ order_id: order._id, bill: total, otp: otp });
            console.log("hello");
        }

        cart.items = [];
        cart.num_items = 0;
        await cart.save();

        res.status(200).json({
            message: 'Checkout successful',
            orders
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    addItem,
    removeItem,
    reduceItem,
    checkout,
    getCartItems
};
