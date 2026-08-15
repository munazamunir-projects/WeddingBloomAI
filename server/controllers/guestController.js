const {
  createGuest,
  getGuestsByWedding,
  getGuestById,
  updateGuest,
  deleteGuest,
} = require("../models/guestModel");

const db = require("../config/db");

// CREATE GUEST
const addGuest = (req, res) => {
  const {
    wedding_id,
    full_name,
    email,
    phone,
    relationship,
    number_of_guests,
    invitation_status,
  } = req.body;

  if (!wedding_id || !full_name) {
    return res.status(400).json({
      success: false,
      message: "Wedding and guest name are required.",
    });
  }

  // Check that wedding belongs to logged-in user
  const checkWeddingSql = `
    SELECT id
    FROM weddings
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    checkWeddingSql,
    [wedding_id, req.user.id],
    (err, weddingResult) => {
      if (err) {
        console.log("Wedding Check Error:", err);

        return res.status(500).json({
          success: false,
          message: "Database error.",
        });
      }

      if (weddingResult.length === 0) {
        return res.status(403).json({
          success: false,
          message: "You cannot add guests to this wedding.",
        });
      }

      const guestData = {
        wedding_id,
        full_name,
        email: email || null,
        phone: phone || null,
        relationship: relationship || null,
        number_of_guests: number_of_guests || 1,
        invitation_status: invitation_status || "pending",
      };

      createGuest(guestData, (err, result) => {
        if (err) {
          console.log("Create Guest Error:", err);

          return res.status(500).json({
            success: false,
            message: "Failed to create guest.",
          });
        }

        return res.status(201).json({
          success: true,
          message: "Guest created successfully.",
          data: {
            id: result.insertId,
          },
        });
      });
    }
  );
};


// GET GUESTS BY WEDDING
const getWeddingGuests = (req, res) => {
  const weddingId = req.params.weddingId;

  const sql = `
    SELECT id
    FROM weddings
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [weddingId, req.user.id], (err, weddingResult) => {
    if (err) {
      console.log("Wedding Check Error:", err);

      return res.status(500).json({
        success: false,
        message: "Database error.",
      });
    }

    if (weddingResult.length === 0) {
      return res.status(403).json({
        success: false,
        message: "You cannot access this wedding.",
      });
    }

    getGuestsByWedding(weddingId, (err, result) => {
      if (err) {
        console.log("Get Guests Error:", err);

        return res.status(500).json({
          success: false,
          message: "Failed to fetch guests.",
        });
      }

      return res.status(200).json({
        success: true,
        data: result,
      });
    });
  });
};


// GET SINGLE GUEST
const getGuest = (req, res) => {
  const sql = `
    SELECT g.*
    FROM guests g
    INNER JOIN weddings w
      ON g.wedding_id = w.id
    WHERE g.id = ?
      AND w.user_id = ?
  `;

  db.query(sql, [req.params.id, req.user.id], (err, result) => {
    if (err) {
      console.log("Get Guest Error:", err);

      return res.status(500).json({
        success: false,
        message: "Database error.",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Guest not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: result[0],
    });
  });
};


// UPDATE GUEST
const editGuest = (req, res) => {
  const sql = `
    SELECT g.id
    FROM guests g
    INNER JOIN weddings w
      ON g.wedding_id = w.id
    WHERE g.id = ?
      AND w.user_id = ?
  `;

  db.query(sql, [req.params.id, req.user.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error.",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Guest not found.",
      });
    }

    updateGuest(req.params.id, req.body, (err) => {
      if (err) {
        console.log("Update Guest Error:", err);

        return res.status(500).json({
          success: false,
          message: "Failed to update guest.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Guest updated successfully.",
      });
    });
  });
};


// DELETE GUEST
const removeGuest = (req, res) => {
  const sql = `
    SELECT g.id
    FROM guests g
    INNER JOIN weddings w
      ON g.wedding_id = w.id
    WHERE g.id = ?
      AND w.user_id = ?
  `;

  db.query(sql, [req.params.id, req.user.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error.",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Guest not found.",
      });
    }

    deleteGuest(req.params.id, (err) => {
      if (err) {
        console.log("Delete Guest Error:", err);

        return res.status(500).json({
          success: false,
          message: "Failed to delete guest.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Guest deleted successfully.",
      });
    });
  });
};


module.exports = {
  addGuest,
  getWeddingGuests,
  getGuest,
  editGuest,
  removeGuest,
};