const {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal
} = require("../models/dealModel");

const addDeal = (req, res) => {
  const dealData = {
    package_id: req.body.package_id,
    title: req.body.title,
    description: req.body.description,
    discount_percentage: req.body.discount_percentage,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    is_active: req.body.is_active ?? true
  };

  createDeal(dealData, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to create deal."
      });
    }

    res.status(201).json({
      success: true,
      message: "Deal created successfully.",
      data: {
        id: result.insertId
      }
    });
  });
};

const getAllDeals = (req, res) => {
  getDeals((err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch deals."
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  });
};

const getDeal = (req, res) => {
  getDealById(req.params.id, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch deal."
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Deal not found."
      });
    }

    res.status(200).json({
      success: true,
      data: result[0]
    });
  });
};

const editDeal = (req, res) => {
  updateDeal(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to update deal."
      });
    }

    res.status(200).json({
      success: true,
      message: "Deal updated successfully."
    });
  });
};

const removeDeal = (req, res) => {
  deleteDeal(req.params.id, (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete deal."
      });
    }

    res.status(200).json({
      success: true,
      message: "Deal deleted successfully."
    });
  });
};

module.exports = {
  addDeal,
  getAllDeals,
  getDeal,
  editDeal,
  removeDeal
};