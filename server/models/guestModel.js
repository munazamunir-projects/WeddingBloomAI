const db = require("../config/db");

// CREATE GUEST
const createGuest = (guestData, callback) => {
  const sql = `
    INSERT INTO guests
    (
      wedding_id,
      full_name,
      email,
      phone,
      relationship,
      number_of_guests,
      invitation_status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      guestData.wedding_id,
      guestData.full_name,
      guestData.email,
      guestData.phone,
      guestData.relationship,
      guestData.number_of_guests,
      guestData.invitation_status
    ],
    callback
  );
};


// GET ALL GUESTS FOR A WEDDING
const getGuestsByWedding = (weddingId, callback) => {
  const sql = `
    SELECT *
    FROM guests
    WHERE wedding_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [weddingId], callback);
};


// GET SINGLE GUEST
const getGuestById = (id, callback) => {
  const sql = `
    SELECT *
    FROM guests
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


// UPDATE GUEST
const updateGuest = (id, guestData, callback) => {
  const sql = `
    UPDATE guests
    SET
      full_name = ?,
      email = ?,
      phone = ?,
      relationship = ?,
      number_of_guests = ?,
      invitation_status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      guestData.full_name,
      guestData.email,
      guestData.phone,
      guestData.relationship,
      guestData.number_of_guests,
      guestData.invitation_status,
      id
    ],
    callback
  );
};


// DELETE GUEST
const deleteGuest = (id, callback) => {
  const sql = `
    DELETE FROM guests
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


module.exports = {
  createGuest,
  getGuestsByWedding,
  getGuestById,
  updateGuest,
  deleteGuest
};