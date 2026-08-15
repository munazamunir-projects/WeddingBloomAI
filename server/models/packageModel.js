const db = require("../config/db");

// CREATE PACKAGE
const createPackage = (packageData, callback) => {
  const sql = `
    INSERT INTO packages
    (
      vendor_id,
      package_name,
      description,
      price,
      duration_hours,
      max_guests,
      is_active
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      packageData.vendor_id,
      packageData.package_name,
      packageData.description,
      packageData.price,
      packageData.duration_hours,
      packageData.max_guests,
      packageData.is_active
    ],
    callback
  );
};


// GET ALL PACKAGES
const getAllPackages = (callback) => {
  const sql = `
    SELECT
      p.*,
      v.business_name
    FROM packages p
    JOIN vendor_profiles v
      ON p.vendor_id = v.id
    ORDER BY p.id DESC
  `;

  db.query(sql, callback);
};


// GET PACKAGES BY VENDOR
const getPackagesByVendor = (vendorId, callback) => {
  const sql = `
    SELECT *
    FROM packages
    WHERE vendor_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [vendorId], callback);
};


// GET PACKAGE BY ID
const getPackageById = (id, callback) => {
  const sql = `
    SELECT
      p.*,
      v.business_name
    FROM packages p
    JOIN vendor_profiles v
      ON p.vendor_id = v.id
    WHERE p.id = ?
  `;

  db.query(sql, [id], callback);
};


// UPDATE PACKAGE
const updatePackage = (id, packageData, callback) => {
  const sql = `
    UPDATE packages
    SET
      package_name = ?,
      description = ?,
      price = ?,
      duration_hours = ?,
      max_guests = ?,
      is_active = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      packageData.package_name,
      packageData.description,
      packageData.price,
      packageData.duration_hours,
      packageData.max_guests,
      packageData.is_active,
      id
    ],
    callback
  );
};


// DELETE PACKAGE
const deletePackage = (id, callback) => {
  const sql = `
    DELETE FROM packages
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


module.exports = {
  createPackage,
  getAllPackages,
  getPackagesByVendor,
  getPackageById,
  updatePackage,
  deletePackage
};