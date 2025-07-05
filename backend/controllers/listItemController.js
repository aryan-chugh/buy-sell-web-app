const itemModel = require('../models/itemModel')

const cloudinary = require('../utils/cloudinary');

const addToList = async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const key_details = req.body.key_details;
    const sizes = req.body.sizes;
    const discount = req.body.discount;
    const category = req.body.category;
    const stock = req.body.stock;

    const images = [...req.body.images];

    const user = req.user;
    const userId = user._id;
    
    if (!user) return res.status(404).json({ error: 'User not found' });

    try {
        // Creating new item with all the details
        let imagesBuffer = [];

        for(let i = 0; i < images.length; i ++) {
            const result = cloudinary.uploader.upload(images[i], {
                folder : 'banners',
                width: 400,
                crop: "scale",
            });
            imagesBuffer.push({
                public_key: (await result).public_id,
                url: (await result).secure_url,
            });
        }


        let item = new itemModel({
            name,
            price,
            description,
            key_details: key_details || [],
            sizes: sizes || [],
            category,
            stock,
            seller_id: userId,
            discount: discount ? {
                percentage: discount.percentage,
                validUntil: discount.validUntil
            } : undefined,
            images: imagesBuffer,
        });

        // Save the item
        const savedItem = await item.save();

        res.status(201).json({
            message: "Item added successfully",
            item: savedItem
        });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({
            error: 'Failed to add item',
            details: error.message
        });
    }
};

module.exports = {
    addToList,
    // deleteItemImages,
};