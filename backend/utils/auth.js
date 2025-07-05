const mongoose = require("mongoose");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const crypto = require("crypto");

mongoose
  .connect("mongodb+srv://aryan:mongodb@buysellapp.mcylj.mongodb.net/?retryWrites=true&w=majority&appName=BuySellApp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function getCartDetails(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log("Error: Invalid Access Id!");
        return; 
    }
  
    try {
        const cart = await Cart.findOne({ user_id: userId }).lean();  // Use lean() for better performance if no updates needed
        if (!cart) {
            console.log("Error: Invalid Cart Requested!");
        }
        return cart;
    } catch (error) {
      console.error("Error fetching cart details:", error.message);
      return;
    }
}

