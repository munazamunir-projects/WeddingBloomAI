const db = require("../config/db");

const addFeatureToPackage = (
  packageId,
  featureId,
  callback
) => {

  const sql = `
    INSERT INTO package_feature_map
    (package_id, feature_id)
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [packageId, featureId],
    callback
  );
};

const getPackageFeatures = (
  packageId,
  callback
) => {

  const sql = `
    SELECT
      pf.id,
      pf.feature_name,
      pf.description
    FROM package_feature_map pfm
    JOIN package_features pf
      ON pfm.feature_id = pf.id
    WHERE pfm.package_id = ?
    ORDER BY pf.id
  `;

  db.query(sql, [packageId], callback);
};

const removeFeatureFromPackage = (
  packageId,
  featureId,
  callback
) => {

  const sql = `
    DELETE FROM package_feature_map
    WHERE package_id = ?
    AND feature_id = ?
  `;

  db.query(
    sql,
    [packageId, featureId],
    callback
  );
};

module.exports = {
  addFeatureToPackage,
  getPackageFeatures,
  removeFeatureFromPackage
};