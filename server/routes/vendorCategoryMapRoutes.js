const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addCategoryToVendor,
  getCategoriesOfVendor,
  removeCategoryFromVendor
} = require("../controllers/vendorCategoryMapController");


// ADD CATEGORY TO VENDOR
router.post("/:vendorId", authMiddleware, addCategoryToVendor);

// GET VENDOR CATEGORIES
router.get("/:vendorId", authMiddleware, getCategoriesOfVendor);

// REMOVE CATEGORY
router.delete(
  "/:vendorId/:categoryId",
  authMiddleware,
  removeCategoryFromVendor
);

module.exports = router;