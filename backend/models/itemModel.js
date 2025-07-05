const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    key_details: {
        type: [String], // An array of strings to store key product details
        required: false,
    },
    sizes: {
        type: [String], // An array of strings to store available sizes
        required: false,
    },
    reviews_count: {
        type: Number, // A number to store the total number of reviews
        default: 0, // Default to 0 if not provided
        min: [0, "Reviews count cannot be negative"] // Validation to prevent negative values
    },
    discount: {
        type: {
            percentage: {
                type: Number, // Percentage discount (e.g., 20 for 20%)
                // required: true,
                default: 0,
                min: [0, "Discount percentage cannot be negative"],
                max: [100, "Discount percentage cannot exceed 100"]
            },
            validUntil: {
                type: Date, // Date until which the discount is valid
                required: false
            }
        },
        required: false // Entire discount field is optional
    },
    category: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                // Ensure every category in the array is in the allowed list
                return value.every((cat) =>
                    ['Electronics', 'Clothing', 'Books', 'Sports', 'Grocery', 'Others'].includes(cat)
                );
            },
            message: '{VALUE} contains unsupported category'
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
    },
    num_buys: {
        type: Number,
        default: 0, // Default to 0 if not provided
        min: [0, "Number of buys cannot be negative"]
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Stock cannot be negative!"]
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId, // Reference to the Review model
            ref: "Review"
        }
    ],
    images: [
        {
            type: {
                public_key : {
                    type: String,
                    required: true,
                },
                url : {
                    type: String,
                    required: true,
                }
            }
        }
    ]
}, {
    timestamps: true
});

// there can be a middle ware usage


// we add indexes to the schema to increase the fetch speed (+1 indicates increasing order, -1 indicates decreasing order)
itemSchema.index({ category: 1, price: 1 });
itemSchema.index({ seller_id: 1 });

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;