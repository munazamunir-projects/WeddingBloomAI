const express = require("express");

const router = express.Router();

const {
  addWedding,
  getMyWeddings,
  getWedding,
  editWedding,
  removeWedding
} = require("../controllers/weddingController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addWedding);

router.get("/my", authMiddleware, getMyWeddings);

router.get("/:id", authMiddleware, getWedding);

router.put("/:id", authMiddleware, editWedding);

router.delete("/:id", authMiddleware, removeWedding);

module.exports = router;