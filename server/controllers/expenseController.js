const {
  createExpense,
  getExpensesByWedding,
  updateExpense,
  deleteExpense
} = require("../models/expenseModel");

// CREATE
const addExpense = (req, res) => {
  const expenseData = {
    wedding_id: req.body.wedding_id,
    category_id: req.body.category_id,
    event_id: req.body.event_id || null,
    vendor_id: req.body.vendor_id || null,
    expense_title: req.body.expense_title,
    description: req.body.description,
    amount: req.body.amount,
    expense_date: req.body.expense_date,
    payment_status: req.body.payment_status || "Pending"
  };

  createExpense(expenseData, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Expense creation failed",
        error: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: { id: result.insertId }
    });
  });
};

// GET
const getWeddingExpenses = (req, res) => {
  getExpensesByWedding(req.params.weddingId, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch expenses",
        error: err.message
      });
    }

    res.json({
      success: true,
      data: result
    });
  });
};

// UPDATE
const editExpense = (req, res) => {
  updateExpense(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Expense update failed",
        error: err.message
      });
    }

    res.json({
      success: true,
      message: "Expense updated successfully"
    });
  });
};

// DELETE
const removeExpense = (req, res) => {
  deleteExpense(req.params.id, (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Expense delete failed",
        error: err.message
      });
    }

    res.json({
      success: true,
      message: "Expense deleted successfully"
    });
  });
};

module.exports = {
  addExpense,
  getWeddingExpenses,
  editExpense,
  removeExpense
};