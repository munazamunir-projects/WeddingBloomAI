const {
  addFavorite,
  getFavoritesByUser,
  removeFavorite
} = require("../models/favoriteModel");

const createFavorite = (req, res) => {
  const favoriteData = {
    user_id: req.user.id,
    vendor_id: req.body.vendor_id
  };

  addFavorite(favoriteData, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to add favorite."
      });
    }

    res.status(201).json({
      success: true,
      message: "Vendor added to favorites.",
      data: {
        id: result.insertId
      }
    });
  });
};

const getMyFavorites = (req, res) => {
  getFavoritesByUser(req.user.id, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch favorites."
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  });
};

const deleteFavorite = (req, res) => {
  removeFavorite(
    req.user.id,
    req.params.vendor_id,
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Failed to remove favorite."
        });
      }

      res.status(200).json({
        success: true,
        message: "Vendor removed from favorites."
      });
    }
  );
};

module.exports = {
  createFavorite,
  getMyFavorites,
  deleteFavorite
};