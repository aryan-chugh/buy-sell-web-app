const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"]
    },
    comment: {
        type: String, // Optional user comment for the review
        required: false,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the creation date
    }
});
// const User = mongoose.model('User', userSchema);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;