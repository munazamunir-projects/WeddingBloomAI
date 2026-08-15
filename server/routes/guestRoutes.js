const express = require("express");

const {
  addGuest,
  getWeddingGuests,
  getGuest,
  editGuest,
  removeGuest
} = require("../controllers/guestController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addGuest);

router.get("/wedding/:weddingId", authMiddleware, getWeddingGuests);

router.get("/:id", authMiddleware, getGuest);

router.put("/:id", authMiddleware, editGuest);

router.delete("/:id", authMiddleware, removeGuest);

module.exports = router;