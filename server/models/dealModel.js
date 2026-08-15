const db = require("../config/db");

const createDeal = (dealData, callback) => {
  const sql = `
    INSERT INTO deals
    (package_id, title, description, discount_percentage, start_date, end_date, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      dealData.package_id,
      dealData.title,
      dealData.description,
      dealData.discount_percentage,
      dealData.start_date,
      dealData.end_date,
      dealData.is_active
    ],
    callback
  );
};

const getDeals = (callback) => {
  const sql = `
    SELECT *
    FROM deals
    ORDER BY id DESC
  `;

  db.query(sql, callback);
};

const getDealById = (id, callback) => {
  const sql = `
    SELECT *
    FROM deals
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

const updateDeal = (id, dealData, callback) => {
  const sql = `
    UPDATE deals
    SET
      package_id = ?,
      title = ?,
      description = ?,
      discount_percentage = ?,
      start_date = ?,
      end_date = ?,
      is_active = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      dealData.package_id,
      dealData.title,
      dealData.description,
      dealData.discount_percentage,
      dealData.start_date,
      dealData.end_date,
      dealData.is_active,
      id
    ],
    callback
  );
};

const deleteDeal = (id, callback) => {
  const sql = `
    DELETE FROM deals
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal
};