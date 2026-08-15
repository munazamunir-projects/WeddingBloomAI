const db = require("../config/db");

const createNotification = (notificationData, callback) => {
  const sql = `
    INSERT INTO notifications
    (user_id, title, message, notification_type, is_read)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      notificationData.user_id,
      notificationData.title,
      notificationData.message,
      notificationData.notification_type,
      notificationData.is_read || 0
    ],
    callback
  );
};

const getNotificationsByUser = (userId, callback) => {
  const sql = `
    SELECT *
    FROM notifications
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [userId], callback);
};

const markNotificationAsRead = (id, userId, callback) => {
  const sql = `
    UPDATE notifications
    SET is_read = 1
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [id, userId], callback);
};

const deleteNotification = (id, userId, callback) => {
  const sql = `
    DELETE FROM notifications
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [id, userId], callback);
};

module.exports = {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead,
  deleteNotification
};