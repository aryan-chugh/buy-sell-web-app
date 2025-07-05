const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// +91 9290032203 is also allowed (there must be a + and space around the country code)
const userSchema = new Schema({
    first_name: {
        type: String,
        // required: true,
        trim: true,
        minLength: [2, 'First name must be at least 2 characters'],
        maxLength: [50, 'First name cannot exceed 50 characters']
    },
    last_name: {
        type: String,
        // required: true,
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
    dob: {
        type: Date,
        // required: true,
        validate: {
          validator: function(value) {
            const currentYear = new Date().getFullYear();
            const birthYear = value.getFullYear();
            return currentYear - birthYear <= 150;
          },
          message: 'Age cannot exceed 150 years'
        }
      },
    describe: {
        type: String,
        trim: true
      },
    contact: {
        type: String,
        // required: true,
        validate: {
            validator: function(v) {
                return /^(?:\+[\d]{1,3}\s)?[\d]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        // required: true,
        validate: {
            validator: function(v) {
                // Assuming SHA-256 hash format
                return /^[a-f0-9]{64}$/i.test(v);
            },
            message: 'Invalid password hash format'
        }
    },
    salt: {
        type: String, // Store the salt used for hashing
        required: true,
        trim: true
    },
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
    }],
    authMethod: {
        type: String,
        enum: ['local', 'cas'],
        default: 'local'
    }
}, {
    timestamps: true
});

// there can be a middle ware usage


// we add indexes to the schema to increase the fetch speed (+1 indicates increasing order, -1 indicates decreasing order)
// userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
module.exports = User;