const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// +91 9290032203 is also allowed (there must be a + and space around the country code)
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, 'First name must be at least 2 characters'],
        maxLength: [50, 'First name cannot exceed 50 characters']
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, 'Last name must be at least 2 characters'],
        maxLength: [50, 'Last name cannot exceed 50 characters']
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[\w-]+(\.[\w-]+)*@(students|research)\.iiit\.ac\.in$/.test(v);
            },
            message: props => `${props.value} is not a valid iiit email address!`
        }
    },
    age: {
        type: Number,
        required: true,
        max: [150, 'Age cannot exceed 150 years']
    },
    contact: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(?:\+[\d]{1,3}\s)?[\d]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Assuming SHA-256 hash format
                return /^[a-f0-9]{64}$/i.test(v);
            },
            message: 'Invalid password hash format'
        }
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    seller_reviews: [{
        reviewer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            maxLength: 500
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, 'Item name must be at least 2 characters'],
        maxLength: [300, 'Item name cannot exceed 300 characters']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative'],
        validate: {
            validator: function(v) {
                // Ensure price has maximum 2 decimal places
                return /^\d+(\.\d{1,2})?$/.test(v.toString());
            },
            message: props => `${props.value} is not a valid price format!`
        }
    },
    description: { 
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Description must be at least 3 characters'],
        maxLength: [1000, 'Description cannot exceed 1000 characters']
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['Electronics', 'Clothing', 'Books', 'Sports', 'Grocery', 'Others'],
            message: '{VALUE} is not a supported category'
        }
    },
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(v) {
                const user = await mongoose.model('User').findById(v);
                return user != null;
            },
            message: 'Seller must be a valid user'
        }
    }
}, {
    timestamps: true
});

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
    sellerID: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(v) {
                const user = await mongoose.model('User').findById(v);
                return user != null;
            },
            message: 'Seller must be a valid user'
        }
    },
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
userSchema.index({ email: 1 }, { unique: true });
itemSchema.index({ category: 1, price: 1 });
itemSchema.index({ seller_id: 1 });
orderSchema.index({ transactionID: 1 }, { unique: true });
orderSchema.index({ buyerID: 1, sellerID: 1 });

const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = {
    User,
    Item,
    Order
};