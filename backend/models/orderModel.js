const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// transactionID must be beginning with a 'T'
const orderSchema = new Schema({
    transactionID: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^T\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid transaction ID format!`
        }
    },
    buyerID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(v) {
                const user = await mongoose.model('User').findById(v);
                return user != null;
            },
            message: 'Buyer must be a valid user'
        }
    },
    sellers: [{
        sellerID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [{
            itemID: {
                type: Schema.Types.ObjectId,
                ref: 'Item',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity must be at least 1']
            }
        }]
    }],
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount cannot be negative'],
        validate: {
            validator: function(v) {
                // Ensure amount has maximum 2 decimal places
                return /^\d+(\.\d{1,2})?$/.test(v.toString());
            },
            message: props => `${props.value} is not a valid amount format!`
        }
    },
    hashedOTP: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Assuming SHA-256 hash format
                return /^[a-f0-9]{64}$/i.test(v);
            },
            message: 'Invalid OTP hash format'
        }
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// there can be a middle ware usage


// we add indexes to the schema to increase the fetch speed (+1 indicates increasing order, -1 indicates decreasing order)
// orderSchema.index({ transactionID: 1 }, { unique: true });
orderSchema.index({ buyerID: 1, sellerID: 1 });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;