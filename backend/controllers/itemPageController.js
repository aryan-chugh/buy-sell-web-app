const itemModel = require('../models/itemModel')

// get a single user profile
const getDetails = async (req, res) => {
    const {item_id} = req.params
    // console.log("hello");
    // console.log(item_id);
    try {
        const item = await itemModel.find({_id : item_id}).populate({
            path: 'seller_id',
            select: 'first_name last_name'
        });
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        // console.log(item);
        res.status(200).json({'item': item});
    } catch (error) {
        console.error("Error fetching item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// const getDetails = async (req, res) => {
//     const {item_id} = req.params;
//     try {
//         const item = await itemModel.findById(item_id)
//             .populate({
//                 path: 'seller_id',
//                 select: 'first_name last_name' // Only select first and last name
//             });

//         if (!item) {
//             return res.status(404).json({ error: "Item not found" });
//         }

//         // // Optional: Reshape the response to include seller name more explicitly
//         // const itemResponse = {
//         //     ...item.toObject(), // Convert to plain object
//         //     seller: {
//         //         first_name: item.seller_id.first_name,
//         //         last_name: item.seller_id.last_name
//         //     }
//         // };

//         res.status(200).json({'item': item});
//     } catch (error) {
//         console.error("Error fetching item:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }

const getRecommendations = async (req, res) => {
    try {
        const { item_id } = req.params;

        // Fetch the main item by ID
        const item = await itemModel.findById(item_id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        // Fetch recommendations based on some logic (category same)
        const recommendations = await itemModel.find({
            category: { $in: item.category }, // Check if any category matches
            _id: { $ne: item_id }, // Exclude the current item
        }).limit(10); // Limit the number of recommendations

        // Return recommendations
        res.status(200).json({recommendations: recommendations});
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getReviews = (async (req, res) => {
    const { item_id } = req.params;
  
    try {
      // Find item and populate reviews
    //   const item = await itemModel.findById(item_id).populate("reviews"); // Assuming reviews is a reference field
      const item = await itemModel.findById(item_id)
        .populate({
            path: 'reviews',
            populate: {
            path: 'user',
            select: 'first_name last_name email' // Only select the fields you need
            }
        });
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      return res.status(200).json({reviews: item.reviews});
    // return res.status(200).json({reviews: "hello"});
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = {
    getDetails,
    getRecommendations,
    getReviews,
};