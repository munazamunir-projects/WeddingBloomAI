const {
  getProfileById,
  updateProfile
} = require("../models/profileModel");


// =========================
// GET MY PROFILE
// =========================

const getMyProfile = (req, res) => {

  const userId = req.user.id;

  getProfileById(userId, (err, result) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch profile."
      });
    }

    if (result.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Profile not found."
      });

    }

    res.status(200).json({
      success: true,
      data: result[0]
    });

  });
};


// =========================
// UPDATE MY PROFILE
// =========================

const editMyProfile = (req, res) => {

  const userId = req.user.id;

  const profileData = {
    full_name: req.body.full_name,
    email: req.body.email,
    phone: req.body.phone,
    bio: req.body.bio
  };


  if (!profileData.full_name || !profileData.email) {

    return res.status(400).json({
      success: false,
      message: "Full name and email are required."
    });

  }


  updateProfile(userId, profileData, (err, result) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to update profile."
      });
    }


    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: profileData
    });

  });
};


module.exports = {
  getMyProfile,
  editMyProfile
};