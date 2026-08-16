const express = require("express");
const router = express.Router();

const {
  addBooking,
  getAllBookings,
  getBooking,
  editBooking,
  removeBooking
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addBooking);
router.get("/", authMiddleware, getAllBookings);
router.get("/:id", authMiddleware, getBooking);
router.put("/:id", authMiddleware, editBooking);
router.delete("/:id", authMiddleware, removeBooking);

module.exports = router;