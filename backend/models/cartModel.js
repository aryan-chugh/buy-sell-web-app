const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./userModel");
const Item = require("./itemModel");

const cartItemSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"]
    }
});

const cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
    },
    num_items: { 
        type: Number,
        default: 0,
        trim: true,
        min: [0, "number of items cannot be negative!"],
    },
    items: [cartItemSchema], // Changed to use a dedicated cart item schema
}, {
    timestamps: true
});

// Pre-save middleware to automatically update num_items
cartSchema.pre('save', function(next) {
    this.num_items = this.items.reduce((total, item) => total + item.quantity, 0);
    next();
});

// we add indexes to the schema to increase the fetch speed (+1 indicates increasing order, -1 indicates decreasing order)
cartSchema.index({ user_id : 1 }, { unique: true });
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;