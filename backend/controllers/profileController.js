// // const userModel = require('../models/userModel');

// // const getUserProfile = async (req, res) => {  
// //   const user = req.user;

// //   if(!user) {
// //     return res.status(400).json({msg: "User not found!"});
// //   }
// //   return res.status(200).json({user: user});
// // };

// // const updateUserProfile = async (req, res) => {
// //   const user = req.user;
// //   const userId = user._id;

// //   if(!user || !userId) 
// //     return res.status(400).json({msg: "User not found!"});

  
// // }


// // module.exports = {
// //   getUserProfile,
// // };
// const userModel = require('../models/userModel');

// const getUserProfile = async (req, res) => {  
//   const user = req.user;

//   if (!user) {
//     return res.status(400).json({ msg: "User not found!" });
//   }

//   // Extract and transform user data to match frontend expectations
//   const profileData = {
//     first_name: user.firstName,
//     last_name: user.lastName,
//     email: user.email,
//     describe: user.description || '',
//     avatar: user.avatarUrl || '/default-avatar.png',
//     dob: user.dob,
//     contact: user.contact,
//     reviews: user.seller_reviews,
//     // Add other profile fields as needed
//   };

//   return res.status(200).json({ bioData: profileData });
// };

// const updateUserProfile = async (req, res) => {
//   const user = req.user;
//   const userId = user._id;

//   if (!user || !userId) {
//     return res.status(400).json({ msg: "User not found!" });
//   }

//   try {
//     // Destructure the fields to update from request body
//     const { 
//       first_name, 
//       last_name, 
//       email, 
//       describe 
//     } = req.body;

//     // Update user fields
//     const updatedUser = await userModel.findByIdAndUpdate(
//       userId, 
//       {
//         firstName: first_name,
//         lastName: last_name,
//         email: email,
//         description: describe
//       }, 
//       { new: true } // Return the updated document
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     // Prepare response to match frontend expectations
//     const profileData = {
//       first_name: updatedUser.firstName,
//       last_name: updatedUser.lastName,
//       email: updatedUser.email,
//       describe: updatedUser.description || '',
//       avatar: updatedUser.avatarUrl || '/default-avatar.png'
//     };

//     return res.status(200).json({ 
//       msg: "Profile updated successfully", 
//       bioData: profileData 
//     });

//   } catch (error) {
//     console.error('Profile update error:', error);
//     return res.status(500).json({ msg: "Failed to update profile", error: error.message });
//   }
// };

// module.exports = {
//   getUserProfile,
//   updateUserProfile
// };

const userModel = require('../models/userModel');

const getUserProfile = async (req, res) => {  
  const user = req.user;

  if (!user) {
    return res.status(400).json({ msg: "User not found!" });
  }

  // Calculate average review rating
  const averageRating = user.seller_reviews.length > 0
    ? (user.seller_reviews.reduce((sum, review) => sum + review.rating, 0) / user.seller_reviews.length).toFixed(1)
    : null;

  // Extract and transform user data to match frontend expectations
  const profileData = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    describe: user.describe || '',
    avatar: user.avatarUrl || '/default-avatar.png',
    dob: user.dob,
    contact: user.contact,
    average_rating: averageRating,
    total_reviews: user.seller_reviews.length
  };

  return res.status(200).json({ bioData: profileData });
};

const updateUserProfile = async (req, res) => {
  const user = req.user;
  const userId = user._id;

  if (!user || !userId) {
    return res.status(400).json({ msg: "User not found!" });
  }

  try {
    // Destructure the fields to update from request body
    const { 
      first_name, 
      last_name, 
      email, 
      describe,
      dob,
      contact
    } = req.body;

    // Validate input fields based on user model validations
    const updateData = {
      first_name,
      last_name,
      describe,
      dob: new Date(dob)
    };

    // Only update email if it matches the validation
    if (/^[\w-]+(\.[\w-]+)*@(students|research)\.iiit\.ac\.in$/.test(email)) {
      updateData.email = email;
    }

    // Only update contact if it matches the validation
    if (/^(?:\+[\d]{1,3}\s)?[\d]{10}$/.test(contact)) {
      updateData.contact = contact;
    }

    // Update user fields
    const updatedUser = await userModel.findByIdAndUpdate(
      userId, 
      updateData, 
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Calculate average review rating
    const averageRating = updatedUser.seller_reviews.length > 0
      ? (updatedUser.seller_reviews.reduce((sum, review) => sum + review.rating, 0) / updatedUser.seller_reviews.length).toFixed(1)
      : null;

    // Prepare response to match frontend expectations
    const profileData = {
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      describe: updatedUser.describe || '',
      avatar: updatedUser.avatarUrl || '/default-avatar.png',
      dob: updatedUser.dob,
      contact: updatedUser.contact,
      average_rating: averageRating,
      total_reviews: updatedUser.seller_reviews.length
    };

    return res.status(200).json({ 
      msg: "Profile updated successfully", 
      bioData: profileData 
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({ 
      msg: "Failed to update profile", 
      error: error.message 
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};