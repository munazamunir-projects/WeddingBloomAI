const {
  addVendorCategory,
  getVendorCategories,
  removeVendorCategory
} = require("../models/vendorCategoryMapModel");


// ADD CATEGORY
const addCategoryToVendor = (req, res) => {

  const vendorId = req.params.vendorId;
  const categoryId = req.body.category_id;

  addVendorCategory(vendorId, categoryId, (err, result) => {

    if (err) {
      console.log("Add Vendor Category Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to add category to vendor.",
        error: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Category added to vendor successfully."
    });

  });
};


// GET CATEGORIES
const getCategoriesOfVendor = (req, res) => {

  getVendorCategories(req.params.vendorId, (err, result) => {

    if (err) {
      console.log("Get Vendor Categories Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch vendor categories.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });

  });
};


// REMOVE CATEGORY
const removeCategoryFromVendor = (req, res) => {

  removeVendorCategory(
    req.params.vendorId,
    req.params.categoryId,
    (err) => {

      if (err) {
        console.log("Remove Vendor Category Error:", err);

        return res.status(500).json({
          success: false,
          message: "Failed to remove category from vendor.",
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: "Category removed from vendor successfully."
      });

    }
  );
};


module.exports = {
  addCategoryToVendor,
  getCategoriesOfVendor,
  removeCategoryFromVendor
};