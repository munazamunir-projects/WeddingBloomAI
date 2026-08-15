const {
  createWedding,
  getWeddingsByUser,
  getWeddingById,
  updateWedding,
  deleteWedding
} = require("../models/weddingModel");


// CREATE WEDDING
const addWedding = (req, res) => {
  const {
    wedding_title,
    wedding_date,
    venue,
    total_budget,
    guest_count,
    city,
    status
  } = req.body;

  if (!wedding_title || !wedding_date || !total_budget) {
    return res.status(400).json({
      success: false,
      message: "Wedding title, date and total budget are required."
    });
  }

  const weddingData = {
    user_id: req.user.id,
    wedding_title,
    wedding_date,
    venue,
    total_budget,
    guest_count,
    city,
    status: status || "planning"
  };

  createWedding(weddingData, (err, result) => {
    if (err) {
      console.log("Create Wedding Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to create wedding.",
        error: err.message
      });
    }

    return res.status(201).json({
      success: true,
      message: "Wedding created successfully.",
      data: {
        id: result.insertId
      }
    });
  });
};


// GET ALL WEDDINGS OF LOGGED-IN USER
const getMyWeddings = (req, res) => {
  getWeddingsByUser(req.user.id, (err, result) => {
    if (err) {
      console.log("Get Weddings Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch weddings.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  });
};


// GET SINGLE WEDDING
const getWedding = (req, res) => {
  getWeddingById(req.params.id, (err, result) => {
    if (err) {
      console.log("Get Wedding Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch wedding.",
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found."
      });
    }

    res.status(200).json({
      success: true,
      data: result[0]
    });
  });
};


// UPDATE WEDDING
const editWedding = (req, res) => {
  updateWedding(req.params.id, req.body, (err) => {
    if (err) {
      console.log("Update Wedding Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to update wedding.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Wedding updated successfully."
    });
  });
};


// DELETE WEDDING
const removeWedding = (req, res) => {
  deleteWedding(req.params.id, (err) => {
    if (err) {
      console.log("Delete Wedding Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete wedding.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Wedding deleted successfully."
    });
  });
};


module.exports = {
  addWedding,
  getMyWeddings,
  getWedding,
  editWedding,
  removeWedding
};