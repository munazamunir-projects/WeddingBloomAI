const express = require("express");
const router = express.Router();

const {
  addDeal,
  getAllDeals,
  getDeal,
  editDeal,
  removeDeal
} = require("../controllers/dealController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addDeal);
router.get("/", authMiddleware, getAllDeals);
router.get("/:id", authMiddleware, getDeal);
router.put("/:id", authMiddleware, editDeal);
router.delete("/:id", authMiddleware, removeDeal);

module.exports = router;