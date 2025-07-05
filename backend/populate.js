const mongoose = require("mongoose");
const User = require("./models/userModel");
const Order = require("./models/orderModel");
const crypto = require("crypto");

mongoose
  .connect("mongodb+srv://aryan:mongodb@buysellapp.mcylj.mongodb.net/?retryWrites=true&w=majority&appName=BuySellApp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function generateUniqueTransactionID() {
  let transactionID;
  let isUnique = false;
  
  while (!isUnique) {
    transactionID = 'T' + Date.now().toString().slice(0, 10);
    const existingOrder = await Order.findOne({ transactionID });
    if (!existingOrder) {
      isUnique = true;
    } else {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  return transactionID;
}

function generateHashedOTP() {
  const otp = crypto.randomBytes(32);
  return crypto.createHash('sha256').update(otp).digest('hex');
}

async function populateOrders() {
  try {
    const users = await User.find({});
    if (users.length < 2) throw new Error("Not enough users in database");

    for (let i = 0; i < 10; i++) {
      const buyerIndex = Math.floor(Math.random() * users.length);
      let sellerIndex;
      do {
        sellerIndex = Math.floor(Math.random() * users.length);
      } while (sellerIndex === buyerIndex);

      const order = new Order({
        transactionID: await generateUniqueTransactionID(),
        buyerID: users[buyerIndex]._id,
        sellerID: users[sellerIndex]._id,
        amount: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
        hashedOTP: generateHashedOTP(),
        status: ['pending', 'completed', 'cancelled'][Math.floor(Math.random() * 3)]
      });

      await order.save();
    }

    console.log("Successfully added orders to the database!");
  } catch (err) {
    console.error("Error populating database:", err);
  } finally {
    mongoose.disconnect();
  }
}

populateOrders();
