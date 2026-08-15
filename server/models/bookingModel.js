const db = require("../config/db");

const createBooking = (bookingData, callback) => {
  const sql = `
    INSERT INTO bookings
    (
      wedding_id,
      vendor_id,
      package_id,
      event_id,
      booking_date,
      service_date,
      total_amount,
      status,
      notes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      bookingData.wedding_id,
      bookingData.vendor_id,
      bookingData.package_id,
      bookingData.event_id,
      bookingData.booking_date,
      bookingData.service_date,
      bookingData.total_amount,
      bookingData.status,
      bookingData.notes
    ],
    callback
  );
};
const getBookings = (callback) => {
  const sql = `
    SELECT *
    FROM bookings
    ORDER BY id DESC
  `;

  db.query(sql, callback);
};

const getBookingById = (id, callback) => {
  const sql = `
    SELECT *
    FROM bookings
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

const updateBooking = (id, bookingData, callback) => {
  const sql = `
    UPDATE bookings
    SET
      wedding_id = ?,
      category = ?,
      vendor_id = ?,
      package_id = ?,
      event_id = ?,
      booking_date = ?,
      service_date = ?,
      total_amount = ?,
      status = ?,
      notes = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      bookingData.wedding_id,
      bookingData.category,
      bookingData.vendor_id,
      bookingData.package_id,
      bookingData.event_id,
      bookingData.booking_date,
      bookingData.service_date,
      bookingData.total_amount,
      bookingData.status,
      bookingData.notes,
      id
    ],
    callback
  );
};

const deleteBooking = (id, callback) => {
  const sql = `
    DELETE FROM bookings
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking
};