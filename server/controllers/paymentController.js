const {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} = require("../models/paymentModel");

const addPayment = (req, res) => {
  const paymentData = {
    booking_id: req.body.booking_id,
    amount: req.body.amount,
    payment_method: req.body.payment_method,
    payment_status: req.body.payment_status || "Pending",
    transaction_reference: req.body.transaction_reference,
    payment_date: req.body.payment_date
  };

  createPayment(paymentData, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to create payment."
      });
    }

    res.status(201).json({
      success: true,
      message: "Payment created successfully.",
      data: {
        id: result.insertId
      }
    });
  });
};

const getAllPayments = (req, res) => {
  getPayments((err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch payments."
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  });
};

const getPayment = (req, res) => {
  getPaymentById(req.params.id, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch payment."
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Payment not found."
      });
    }

    res.status(200).json({
      success: true,
      data: result[0]
    });
  });
};

const editPayment = (req, res) => {
  updatePayment(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to update payment."
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment updated successfully."
    });
  });
};

const removePayment = (req, res) => {
  deletePayment(req.params.id, (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete payment."
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully."
    });
  });
};

module.exports = {
  addPayment,
  getAllPayments,
  getPayment,
  editPayment,
  removePayment
};