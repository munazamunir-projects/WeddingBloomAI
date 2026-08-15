const {
  createPackage,
  getAllPackages,
  getPackagesByVendor,
  getPackageById,
  updatePackage,
  deletePackage
} = require("../models/packageModel");


// CREATE
const addPackage = (req, res) => {

  const packageData = {
    vendor_id: req.body.vendor_id,
    package_name: req.body.package_name,
    description: req.body.description,
    price: req.body.price,
    duration_hours: req.body.duration_hours,
    max_guests: req.body.max_guests,
    is_active: req.body.is_active ?? 1
  };

  createPackage(packageData, (err, result) => {

    if (err) {
      console.log("Create Package Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to create package.",
        error: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Package created successfully.",
      data: {
        id: result.insertId
      }
    });

  });
};


// GET ALL
const getPackages = (req, res) => {

  getAllPackages((err, result) => {

    if (err) {
      console.log("Get Packages Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch packages.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });

  });
};


// GET BY VENDOR
const getVendorPackages = (req, res) => {

  getPackagesByVendor(req.params.vendorId, (err, result) => {

    if (err) {
      console.log("Get Vendor Packages Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch vendor packages.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });

  });
};


// GET ONE
const getPackage = (req, res) => {

  getPackageById(req.params.id, (err, result) => {

    if (err) {
      console.log("Get Package Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch package.",
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Package not found."
      });
    }

    res.status(200).json({
      success: true,
      data: result[0]
    });

  });
};


// UPDATE
const editPackage = (req, res) => {

  updatePackage(req.params.id, req.body, (err) => {

    if (err) {
      console.log("Update Package Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to update package.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Package updated successfully."
    });

  });
};


// DELETE
const removePackage = (req, res) => {

  deletePackage(req.params.id, (err) => {

    if (err) {
      console.log("Delete Package Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete package.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Package deleted successfully."
    });

  });
};


module.exports = {
  addPackage,
  getPackages,
  getVendorPackages,
  getPackage,
  editPackage,
  removePackage
};