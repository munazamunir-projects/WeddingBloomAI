const db = require("../config/db");

// CREATE WEDDING
const createWedding = (weddingData, callback) => {
  const sql = `
    INSERT INTO weddings
    (
      user_id,
      wedding_title,
      wedding_date,
      venue,
      total_budget,
      guest_count,
      city,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      weddingData.user_id,
      weddingData.wedding_title,
      weddingData.wedding_date,
      weddingData.venue,
      weddingData.total_budget,
      weddingData.guest_count,
      weddingData.city,
      weddingData.status
    ],
    callback
  );
};


// GET ALL WEDDINGS FOR USER
const getWeddingsByUser = (userId, callback) => {
  const sql = `
    SELECT *
    FROM weddings
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [userId], callback);
};


// GET ONE WEDDING
const getWeddingById = (id, callback) => {
  const sql = `
    SELECT *
    FROM weddings
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


// UPDATE WEDDING
const updateWedding = (id, weddingData, callback) => {
  const sql = `
    UPDATE weddings
    SET
      wedding_title = ?,
      wedding_date = ?,
      venue = ?,
      total_budget = ?,
      guest_count = ?,
      city = ?,
      status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      weddingData.wedding_title,
      weddingData.wedding_date,
      weddingData.venue,
      weddingData.total_budget,
      weddingData.guest_count,
      weddingData.city,
      weddingData.status,
      id
    ],
    callback
  );
};


// DELETE WEDDING
const deleteWedding = (id, callback) => {
  const sql = `
    DELETE FROM weddings
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


module.exports = {
  createWedding,
  getWeddingsByUser,
  getWeddingById,
  updateWedding,
  deleteWedding
};