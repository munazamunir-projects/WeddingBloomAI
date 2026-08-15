const db = require("../config/db");

const createPayment = (paymentData, callback) => {
  const sql = `
    INSERT INTO payments
    (
      booking_id,
      amount,
      payment_method,
      payment_status,
      transaction_reference,
      payment_date
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      paymentData.booking_id,
      paymentData.amount,
      paymentData.payment_method,
      paymentData.payment_status,
      paymentData.transaction_reference,
      paymentData.payment_date
    ],
    callback
  );
};

const getPayments = (callback) => {
  const sql = `
    SELECT *
    FROM payments
    ORDER BY id DESC
  `;

  db.query(sql, callback);
};

const getPaymentById = (id, callback) => {
  const sql = `
    SELECT *
    FROM payments
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

const updatePayment = (id, paymentData, callback) => {
  const sql = `
    UPDATE payments
    SET
      booking_id = ?,
      amount = ?,
      payment_method = ?,
      payment_status = ?,
      transaction_reference = ?,
      payment_date = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      paymentData.booking_id,
      paymentData.amount,
      paymentData.payment_method,
      paymentData.payment_status,
      paymentData.transaction_reference,
      paymentData.payment_date,
      id
    ],
    callback
  );
};

const deletePayment = (id, callback) => {
  const sql = `
    DELETE FROM payments
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment
};