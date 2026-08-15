const db = require("../config/db");

// CREATE VENDOR
const createVendor = (vendorData, callback) => {
  const sql = `
    INSERT INTO vendor_profiles
    (
      user_id,
      business_name,
      description,
      phone,
      email,
      address,
      city,
      experience_years,
      profile_image
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      vendorData.user_id,
      vendorData.business_name,
      vendorData.description,
      vendorData.phone,
      vendorData.email,
      vendorData.address,
      vendorData.city,
      vendorData.experience_years,
      vendorData.profile_image
    ],
    callback
  );
};


// GET ALL VENDORS
const getAllVendors = (callback) => {
  const sql = `
    SELECT *
    FROM vendor_profiles
    ORDER BY rating DESC, total_reviews DESC
  `;

  db.query(sql, callback);
};


// GET VENDOR BY ID
const getVendorById = (id, callback) => {
  const sql = `
    SELECT *
    FROM vendor_profiles
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


// GET VENDORS BY CITY
const getVendorsByCity = (city, callback) => {
  const sql = `
    SELECT *
    FROM vendor_profiles
    WHERE city = ?
    ORDER BY rating DESC
  `;

  db.query(sql, [city], callback);
};


// UPDATE VENDOR
const updateVendor = (id, vendorData, callback) => {
  const sql = `
    UPDATE vendor_profiles
    SET
      business_name = ?,
      description = ?,
      phone = ?,
      email = ?,
      address = ?,
      city = ?,
      experience_years = ?,
      profile_image = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      vendorData.business_name,
      vendorData.description,
      vendorData.phone,
      vendorData.email,
      vendorData.address,
      vendorData.city,
      vendorData.experience_years,
      vendorData.profile_image,
      id
    ],
    callback
  );
};


// DELETE VENDOR
const deleteVendor = (id, callback) => {
  const sql = `
    DELETE FROM vendor_profiles
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


module.exports = {
  createVendor,
  getAllVendors,
  getVendorById,
  getVendorsByCity,
  updateVendor,
  deleteVendor
};