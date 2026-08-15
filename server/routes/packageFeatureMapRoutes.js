const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addFeature,
  getFeatures,
  removeFeature
} = require("../controllers/packageFeatureMapController");

router.post(
  "/:packageId",
  authMiddleware,
  addFeature
);

router.get(
  "/:packageId",
  authMiddleware,
  getFeatures
);

router.delete(
  "/:packageId/:featureId",
  authMiddleware,
  removeFeature
);

module.exports = router;