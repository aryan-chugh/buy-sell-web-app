const userModel = require('../models/userModel')
const cartModel = require('../models/cartModel')

const crypto = require("crypto")
const jwt = require('jsonwebtoken');

function hashPassword(password) {
    // Generate a random salt (16 bytes)
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');

    return { salt, hash };
}

const addUser = (async (req, res) => {
    const { first_name, last_name, email, dob, describe, contact, password } = req.body;
    console.log(req.body);

    if (!first_name || !last_name || !email || !dob || !contact || !password) {
        return res.status(400).json({ code: '4040', msg: 'Please fill in all required fields' });
    }
    
    if (!/^[\w-]+(\.[\w-]+)*@(students|research)\.iiit\.ac\.in$/.test(email)) {
        return res.status(400).json({ code: '4042', msg: 'Invalid IIIT email address' });
    }
    
    if (!/^(?:\+[\d]{1,3}\s)?[\d]{10}$/.test(contact)) {
        return res.status(400).json({ code: '4043', msg: 'Invalid phone number format' });
    }

    try {
        let user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ code: '4001', msg: 'User already exists' });
        }
        // Creating new user
        const {salt, hash} = hashPassword(password);
        user = new userModel({
            first_name,
            last_name,
            email,
            dob,
            describe,
            contact,
            password,
            salt
        });

        // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        user.password = hash;
        await user.save();

        const cart = new cartModel({
            user_id: user._id,  // Associate the cart with the newly created user
            items: [],
            num_items: 0
        });

        await cart.save();  // Save the cart to the database
        // console.log("hello saved!");
        res.status(200).json({code: 200});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({code: '2004', msg: 'Server error'});
    }
});

module.exports = {
    addUser,
};



// const token = req.header('Authorization').split(' ')[1];

// try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded Payload:', decoded);
// } catch (err) {
//     console.error('Invalid Token:', err.message);
//     res.status(401).json({ msg: 'Unauthorized' });
// }
