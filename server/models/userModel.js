const db = require("../config/db");


// =========================
// CREATE USER
// =========================

const createUser = (userData, callback) => {
  const sql = `
    INSERT INTO users
    (full_name, email, password, role, phone)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      userData.full_name,
      userData.email,
      userData.password,
      userData.role,
      userData.phone,
    ],
    callback
  );
};


// =========================
// FIND USER BY EMAIL
// =========================

const findUserByEmail = (email, callback) => {
  const sql = `
    SELECT *
    FROM users
    WHERE email = ?
  `;

  db.query(sql, [email], callback);
};


// =========================
// FIND USER BY ID
// =========================

const findUserById = (id, callback) => {
  const sql = `
    SELECT
      id,
      full_name,
      email,
      role,
      phone,
      bio,
      created_at
    FROM users
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


// =========================
// UPDATE PROFILE
// =========================

const updateProfile = (id, profileData, callback) => {
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
      id,
    ],
    callback
  );
};


// =========================
// EXPORTS
// =========================

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateProfile,
};