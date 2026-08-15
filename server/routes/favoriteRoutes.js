const express = require("express");
const router = express.Router();

const {
  createFavorite,
  getMyFavorites,
  deleteFavorite
} = require("../controllers/favoriteController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createFavorite);
router.get("/", authMiddleware, getMyFavorites);
router.delete("/:vendor_id", authMiddleware, deleteFavorite);

module.exports = router;