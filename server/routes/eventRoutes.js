const express = require("express");

const {
  addEvent,
  getWeddingEvents,
  getEvent,
  editEvent,
  removeEvent
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addEvent);

router.get("/wedding/:weddingId", authMiddleware, getWeddingEvents);

router.get("/:id", authMiddleware, getEvent);

router.put("/:id", authMiddleware, editEvent);

router.delete("/:id", authMiddleware, removeEvent);

module.exports = router;