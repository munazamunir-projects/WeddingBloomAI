const express = require("express");

const {
  getSettings,
  updateSettingsController,
} = require("../controllers/settingsController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


/* =========================
   GET SETTINGS
========================= */

router.get(
  "/",
  authMiddleware,
  getSettings
);


/* =========================
   UPDATE SETTINGS
========================= */

router.put(
  "/",
  authMiddleware,
  updateSettingsController
);


module.exports = router;