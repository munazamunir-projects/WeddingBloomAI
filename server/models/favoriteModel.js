const db = require("../config/db");

const addFavorite = (favoriteData, callback) => {
  const sql = `
    INSERT INTO favorites
    (user_id, vendor_id)
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [
      favoriteData.user_id,
      favoriteData.vendor_id
    ],
    callback
  );
};

const getFavoritesByUser = (userId, callback) => {
  const sql = `
    SELECT *
    FROM favorites
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [userId], callback);
};

const removeFavorite = (userId, vendorId, callback) => {
  const sql = `
    DELETE FROM favorites
    WHERE user_id = ? AND vendor_id = ?
  `;

  db.query(sql, [userId, vendorId], callback);
};

module.exports = {
  addFavorite,
  getFavoritesByUser,
  removeFavorite
};