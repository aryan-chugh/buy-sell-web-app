const userModel = require('../models/userModel')

// get a single user profile
const getDetails = async (req, res) => {
    const {key} = req.params
    const user = await userModel.findById(key);
    if(!user) {
        return res.status(404).json({error: "No such account exists!"})
    }
    return res.status(200).json(user)
}

// patch a single user


module.exports = {
    getDetails,
};