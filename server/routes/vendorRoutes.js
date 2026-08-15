const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addVendor,
  getVendors,
  getVendor,
  getCityVendors,
  editVendor,
  removeVendor
} = require("../controllers/vendorController");


// CREATE
router.post("/", authMiddleware, addVendor);

// GET ALL
router.get("/", authMiddleware, getVendors);

// GET BY CITY
router.get("/city/:city", authMiddleware, getCityVendors);

// GET ONE
router.get("/:id", authMiddleware, getVendor);

// UPDATE
router.put("/:id", authMiddleware, editVendor);

// DELETE
router.delete("/:id", authMiddleware, removeVendor);


module.exports = router;