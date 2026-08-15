const db = require("../config/db");

const createReview = (reviewData, callback) => {
  const sql = `
    INSERT INTO reviews
    (user_id, vendor_id, booking_id, rating, review_text)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      reviewData.user_id,
      reviewData.vendor_id,
      reviewData.booking_id,
      reviewData.rating,
      reviewData.review_text
    ],
    callback
  );
};

const getReviews = (callback) => {
  const sql = `
    SELECT *
    FROM reviews
    ORDER BY id DESC
  `;

  db.query(sql, callback);
};

const getReviewById = (id, callback) => {
  const sql = `
    SELECT *
    FROM reviews
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

const updateReview = (id, reviewData, callback) => {
  const sql = `
    UPDATE reviews
    SET
      user_id = ?,
      vendor_id = ?,
      booking_id = ?,
      rating = ?,
      review_text = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      reviewData.user_id,
      reviewData.vendor_id,
      reviewData.booking_id,
      reviewData.rating,
      reviewData.review_text,
      id
    ],
    callback
  );
};

const deleteReview = (id, callback) => {
  const sql = `
    DELETE FROM reviews
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview
};