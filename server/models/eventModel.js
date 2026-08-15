const db = require("../config/db");

// CREATE EVENT
const createEvent = (eventData, callback) => {
  const sql = `
    INSERT INTO events
    (
      wedding_id,
      event_name,
      event_date,
      start_time,
      end_time,
      venue,
      description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      eventData.wedding_id,
      eventData.event_name,
      eventData.event_date,
      eventData.start_time,
      eventData.end_time,
      eventData.venue,
      eventData.description
    ],
    callback
  );
};


// GET ALL EVENTS FOR WEDDING
const getEventsByWedding = (weddingId, callback) => {
  const sql = `
    SELECT *
    FROM events
    WHERE wedding_id = ?
    ORDER BY event_date ASC, start_time ASC
  `;

  db.query(sql, [weddingId], callback);
};


// GET SINGLE EVENT
const getEventById = (id, callback) => {
  const sql = `
    SELECT *
    FROM events
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


// UPDATE EVENT
const updateEvent = (id, eventData, callback) => {
  const sql = `
    UPDATE events
    SET
      event_name = ?,
      event_date = ?,
      start_time = ?,
      end_time = ?,
      venue = ?,
      description = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      eventData.event_name,
      eventData.event_date,
      eventData.start_time,
      eventData.end_time,
      eventData.venue,
      eventData.description,
      id
    ],
    callback
  );
};


// DELETE EVENT
const deleteEvent = (id, callback) => {
  const sql = `
    DELETE FROM events
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


module.exports = {
  createEvent,
  getEventsByWedding,
  getEventById,
  updateEvent,
  deleteEvent
};