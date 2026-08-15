const express = require("express");
const router = express.Router();

const {
  addReview,
  getAllReviews,
  getReview,
  editReview,
  removeReview
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addReview);
router.get("/", authMiddleware, getAllReviews);
router.get("/:id", authMiddleware, getReview);
router.put("/:id", authMiddleware, editReview);
router.delete("/:id", authMiddleware, removeReview);

module.exports = router;