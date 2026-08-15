const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
  editProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


// REGISTER
router.post("/register", register);


// LOGIN
router.post("/login", login);


// GET PROFILE
router.get("/profile", authMiddleware, getProfile);


// UPDATE PROFILE
router.put("/profile", authMiddleware, editProfile);


module.exports = router;