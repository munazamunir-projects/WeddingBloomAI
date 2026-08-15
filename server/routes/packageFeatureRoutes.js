const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addFeature,
  getAllFeatures,
  getFeature,
  removeFeature
} = require("../controllers/packageFeatureController");

router.post("/", authMiddleware, addFeature);

router.get("/", authMiddleware, getAllFeatures);

router.get("/:id", authMiddleware, getFeature);

router.delete("/:id", authMiddleware, removeFeature);

module.exports = router;