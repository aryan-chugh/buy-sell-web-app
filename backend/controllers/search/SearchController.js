const itemModel = require('../../models/itemModel')

const cloudinary = require('../../utils/cloudinary')


async function getTopMostBoughtItems() {
    try {
        // Query the database to get the top 10 most bought items
        const topItems = await itemModel.find({})
            .sort({ num_buys: -1 }) // Sort by `num_buys` in descending order
            .limit(10) // Limit to 10 items
            .select('name num_buys price description') // Select specific fields to return (optional)
            .exec(); // Execute the query

        return topItems;
    } catch (error) {
        console.error("Error fetching top items:", error);
        throw error;
    }
}
// Call the function and handle the result
// (async () => {
//     const topItems = await getTopMostBoughtItems();
//     console.log("Top 10 Most Bought Items:", topItems);
// })();

// const getItems = async (req, res) => {
//     try {
//         const allItems = await itemModel.find({})
//             .exec();

//         res.status(200).json({'items' : allItems});
//     } catch (error) {
//         console.error("Error fetching items:", error);
//         res.status(400).json({'error' : error});
//     }
// }

const getItems = async (req, res) => {
    try {
        const allItems = await itemModel.find({})
            .populate({
                path: 'reviews',
                select: 'rating' // We only need the rating field for now
            })
            .lean() // Convert to plain JavaScript objects for better performance
            .exec();

        // Calculate average rating for each item
        const itemsWithRatings = allItems.map(item => {
            const reviews = item.reviews || [];
            const averageRating = reviews.length > 0
                ? Number((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1))
                : 0;

            return {
                ...item,
                averageRating,
                reviewsCount: reviews.length
            };
        });

        res.status(200).json({ 'items': itemsWithRatings });
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(400).json({ 'error': error });
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await itemModel.distinct('category');
        // console.log(categories);
        res.status(200).json({ "categories": categories });
    } catch (error) {
        console.error("Error fetching categories: ", error);
        res.status(400).json({ error: "Failed to fetch categories" });
    }
};



module.exports = {
    getTopMostBoughtItems,
    getItems,
    getCategories,
};