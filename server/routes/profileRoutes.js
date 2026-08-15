const express = require("express");

const router = express.Router();

const {
  getMyProfile,
  editMyProfile
} = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");


// GET MY PROFILE
router.get(
  "/",
  authMiddleware,
  getMyProfile
);


// UPDATE MY PROFILE
router.put(
  "/",
  authMiddleware,
  editMyProfile
);


module.exports = router;