const db = require("../config/db");

const createFeature = (featureData, callback) => {
  const sql = `
    INSERT INTO package_features
    (feature_name, description)
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [
      featureData.feature_name,
      featureData.description
    ],
    callback
  );
};

const getFeatures = (callback) => {
  const sql = `
    SELECT *
    FROM package_features
    ORDER BY id DESC
  `;

  db.query(sql, callback);
};

const getFeatureById = (id, callback) => {
  const sql = `
    SELECT *
    FROM package_features
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

const deleteFeature = (id, callback) => {
  const sql = `
    DELETE FROM package_features
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  createFeature,
  getFeatures,
  getFeatureById,
  deleteFeature
};