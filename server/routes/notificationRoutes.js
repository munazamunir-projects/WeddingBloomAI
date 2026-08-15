const express = require("express");
const router = express.Router();

const {
  addNotification,
  getMyNotifications,
  readNotification,
  removeNotification
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addNotification);
router.get("/", authMiddleware, getMyNotifications);
router.put("/:id/read", authMiddleware, readNotification);
router.delete("/:id", authMiddleware, removeNotification);

module.exports = router;