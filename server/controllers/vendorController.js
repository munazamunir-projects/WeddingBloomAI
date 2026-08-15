const {
  createVendor,
  getAllVendors,
  getVendorById,
  getVendorsByCity,
  updateVendor,
  deleteVendor
} = require("../models/vendorModel");


// CREATE VENDOR
const addVendor = (req, res) => {

  const vendorData = {
    user_id: req.user.id,
    business_name: req.body.business_name,
    description: req.body.description,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    experience_years: req.body.experience_years,
    profile_image: req.body.profile_image || null
  };

  createVendor(vendorData, (err, result) => {

    if (err) {
      console.log("Create Vendor Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to create vendor.",
        error: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Vendor created successfully.",
      data: {
        id: result.insertId
      }
    });

  });
};


// GET ALL VENDORS
const getVendors = (req, res) => {

  getAllVendors((err, result) => {

    if (err) {
      console.log("Get Vendors Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch vendors.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });

  });
};


// GET SINGLE VENDOR
const getVendor = (req, res) => {

  getVendorById(req.params.id, (err, result) => {

    if (err) {
      console.log("Get Vendor Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch vendor.",
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found."
      });
    }

    res.status(200).json({
      success: true,
      data: result[0]
    });

  });
};


// GET VENDORS BY CITY
const getCityVendors = (req, res) => {

  getVendorsByCity(req.params.city, (err, result) => {

    if (err) {
      console.log("Get City Vendors Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch vendors.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });

  });
};


// UPDATE VENDOR
const editVendor = (req, res) => {

  updateVendor(req.params.id, req.body, (err) => {

    if (err) {
      console.log("Update Vendor Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to update vendor.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendor updated successfully."
    });

  });
};


// DELETE VENDOR
const removeVendor = (req, res) => {

  deleteVendor(req.params.id, (err) => {

    if (err) {
      console.log("Delete Vendor Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete vendor.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendor deleted successfully."
    });

  });
};


module.exports = {
  addVendor,
  getVendors,
  getVendor,
  getCityVendors,
  editVendor,
  removeVendor
};