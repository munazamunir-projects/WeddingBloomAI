const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addExpense,
  getWeddingExpenses,
  editExpense,
  removeExpense
} = require("../controllers/expenseController");

router.post("/", authMiddleware, addExpense);

router.get("/wedding/:weddingId", authMiddleware, getWeddingExpenses);

router.put("/:id", authMiddleware, editExpense);

router.delete("/:id", authMiddleware, removeExpense);

module.exports = router;