const db = require("../config/db");

// GET ALL EXPENSE CATEGORIES
const getExpenseCategories = (callback) => {
  const sql = `
    SELECT id, category_name
    FROM expense_categories
    ORDER BY id ASC
  `;

  db.query(sql, callback);
};

module.exports = {
  getExpenseCategories
};