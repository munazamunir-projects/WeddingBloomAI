const express = require("express");
const router = express.Router();

const {
  addPayment,
  getAllPayments,
  getPayment,
  editPayment,
  removePayment
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addPayment);
router.get("/", authMiddleware, getAllPayments);
router.get("/:id", authMiddleware, getPayment);
router.put("/:id", authMiddleware, editPayment);
router.delete("/:id", authMiddleware, removePayment);

module.exports = router;