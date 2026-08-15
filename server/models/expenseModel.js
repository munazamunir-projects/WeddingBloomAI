const db = require("../config/db");

// CREATE EXPENSE
const createExpense = (expenseData, callback) => {
  const sql = `
    INSERT INTO expenses
    (
      wedding_id,
      category_id,
      event_id,
      vendor_id,
      expense_title,
      description,
      amount,
      expense_date,
      payment_status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      expenseData.wedding_id,
      expenseData.category_id,
      expenseData.event_id,
      expenseData.vendor_id,
      expenseData.expense_title,
      expenseData.description,
      expenseData.amount,
      expenseData.expense_date,
      expenseData.payment_status
    ],
    callback
  );
};

// GET ALL EXPENSES
const getExpensesByWedding = (weddingId, callback) => {
  const sql = `
    SELECT e.*, c.category_name
    FROM expenses e
    LEFT JOIN expense_categories c
      ON e.category_id = c.id
    WHERE e.wedding_id = ?
    ORDER BY e.expense_date DESC
  `;

  db.query(sql, [weddingId], callback);
};

// UPDATE EXPENSE
const updateExpense = (id, expenseData, callback) => {
  const sql = `
    UPDATE expenses
    SET
      category_id = ?,
      event_id = ?,
      vendor_id = ?,
      expense_title = ?,
      description = ?,
      amount = ?,
      expense_date = ?,
      payment_status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      expenseData.category_id,
      expenseData.event_id,
      expenseData.vendor_id,
      expenseData.expense_title,
      expenseData.description,
      expenseData.amount,
      expenseData.expense_date,
      expenseData.payment_status,
      id
    ],
    callback
  );
};

// DELETE EXPENSE
const deleteExpense = (id, callback) => {
  db.query(
    "DELETE FROM expenses WHERE id=?",
    [id],
    callback
  );
};

module.exports = {
  createExpense,
  getExpensesByWedding,
  updateExpense,
  deleteExpense
};