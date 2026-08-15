const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addPackage,
  getPackages,
  getVendorPackages,
  getPackage,
  editPackage,
  removePackage
} = require("../controllers/packageController");

router.post("/", authMiddleware, addPackage);

router.get("/", authMiddleware, getPackages);

router.get(
  "/vendor/:vendorId",
  authMiddleware,
  getVendorPackages
);

router.get("/:id", authMiddleware, getPackage);

router.put("/:id", authMiddleware, editPackage);

router.delete("/:id", authMiddleware, removePackage);

module.exports = router;