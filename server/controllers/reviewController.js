const {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview
} = require("../models/reviewModel");

const addReview = (req, res) => {
  const reviewData = {
    user_id: req.user.id,
    vendor_id: req.body.vendor_id,
    booking_id: req.body.booking_id,
    rating: req.body.rating,
    review_text: req.body.review_text
  };

  createReview(reviewData, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to create review."
      });
    }

    res.status(201).json({
      success: true,
      message: "Review created successfully.",
      data: {
        id: result.insertId
      }
    });
  });
};

const getAllReviews = (req, res) => {
  getReviews((err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch reviews."
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  });
};

const getReview = (req, res) => {
  getReviewById(req.params.id, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch review."
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found."
      });
    }

    res.status(200).json({
      success: true,
      data: result[0]
    });
  });
};

const editReview = (req, res) => {
  updateReview(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to update review."
      });
    }

    res.status(200).json({
      success: true,
      message: "Review updated successfully."
    });
  });
};

const removeReview = (req, res) => {
  deleteReview(req.params.id, (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete review."
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully."
    });
  });
};

module.exports = {
  addReview,
  getAllReviews,
  getReview,
  editReview,
  removeReview
};