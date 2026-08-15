const db = require("../config/db");


/* =========================
   GET SETTINGS
========================= */

const getSettingsByUserId = (userId) => {

  return new Promise((resolve, reject) => {

    const sql = `
      SELECT
        id,
        user_id,
        email_notifications,
        wedding_reminders,
        vendor_updates,
        dark_mode,
        created_at,
        updated_at
      FROM settings
      WHERE user_id = ?
    `;

    db.query(sql, [userId], (error, results) => {

      if (error) {
        reject(error);
        return;
      }

      resolve(results[0] || null);

    });

  });

};


/* =========================
   CREATE SETTINGS
========================= */

const createSettings = (userId) => {

  return new Promise((resolve, reject) => {

    const sql = `
      INSERT INTO settings (
        user_id,
        email_notifications,
        wedding_reminders,
        vendor_updates,
        dark_mode
      )
      VALUES (?, TRUE, TRUE, FALSE, FALSE)
    `;

    db.query(sql, [userId], (error, result) => {

      if (error) {
        reject(error);
        return;
      }

      resolve(result);

    });

  });

};


/* =========================
   UPDATE SETTINGS
========================= */

const updateSettings = (
  userId,
  emailNotifications,
  weddingReminders,
  vendorUpdates,
  darkMode
) => {

  return new Promise((resolve, reject) => {

    const sql = `
      UPDATE settings
      SET
        email_notifications = ?,
        wedding_reminders = ?,
        vendor_updates = ?,
        dark_mode = ?
      WHERE user_id = ?
    `;

    db.query(
      sql,
      [
        emailNotifications,
        weddingReminders,
        vendorUpdates,
        darkMode,
        userId
      ],
      (error, result) => {

        if (error) {
          reject(error);
          return;
        }

        resolve(result);

      }
    );

  });

};


module.exports = {
  getSettingsByUserId,
  createSettings,
  updateSettings,
};