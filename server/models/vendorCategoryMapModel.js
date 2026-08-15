const db = require("../config/db");

// ADD CATEGORY TO VENDOR
const addVendorCategory = (vendorId, categoryId, callback) => {
  const sql = `
    INSERT INTO vendor_category_map
    (vendor_id, category_id)
    VALUES (?, ?)
  `;

  db.query(sql, [vendorId, categoryId], callback);
};


// GET CATEGORIES OF A VENDOR
const getVendorCategories = (vendorId, callback) => {
  const sql = `
    SELECT 
      vc.id,
      vc.category_name,
      vc.description
    FROM vendor_category_map vcm
    JOIN vendor_categories vc
      ON vcm.category_id = vc.id
    WHERE vcm.vendor_id = ?
    ORDER BY vc.category_name
  `;

  db.query(sql, [vendorId], callback);
};


// REMOVE CATEGORY FROM VENDOR
const removeVendorCategory = (vendorId, categoryId, callback) => {
  const sql = `
    DELETE FROM vendor_category_map
    WHERE vendor_id = ?
    AND category_id = ?
  `;

  db.query(sql, [vendorId, categoryId], callback);
};


module.exports = {
  addVendorCategory,
  getVendorCategories,
  removeVendorCategory
};