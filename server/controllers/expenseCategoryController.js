const {
  getExpenseCategories
} = require("../models/expenseCategoryModel");

// GET ALL CATEGORIES
const getCategories = (req, res) => {
  getExpenseCategories((err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch expense categories",
        error: err.message
      });
    }

    res.json({
      success: true,
      data: result
    });
  });
};

module.exports = {
  getCategories
};