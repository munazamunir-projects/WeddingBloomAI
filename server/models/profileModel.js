const db = require("../config/db");


// =========================
// GET PROFILE
// =========================

const getProfileById = (userId, callback) => {
  const sql = `
    SELECT
      id,
      full_name,
      email,
      phone,
      bio
    FROM users
    WHERE id = ?
  `;

  db.query(sql, [userId], callback);
};


// =========================
// UPDATE PROFILE
// =========================

const updateProfile = (userId, profileData, callback) => {
  const sql = `
    UPDATE users
    SET
      full_name = ?,
      email = ?,
      phone = ?,
      bio = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      profileData.full_name,
      profileData.email,
      profileData.phone,
      profileData.bio,
      userId
    ],
    callback
  );
};


module.exports = {
  getProfileById,
  updateProfile
};