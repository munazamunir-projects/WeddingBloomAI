const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} = require("../models/bookingModel");

const addBooking = (req, res) => {
  const bookingData = {
    wedding_id: req.body.wedding_id,
    vendor_id: req.body.vendor_id,
    package_id: req.body.package_id,
    event_id: req.body.event_id,
    booking_date: req.body.booking_date,
    service_date: req.body.service_date,
    total_amount: req.body.total_amount,
    status: req.body.status || "Pending",
    notes: req.body.notes
  };

  createBooking(bookingData, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to create booking."
      });
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: {
        id: result.insertId
      }
    });
  });
};

const getAllBookings = (req, res) => {
  getBookings((err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch bookings."
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  });
};

const getBooking = (req, res) => {
  getBookingById(req.params.id, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch booking."
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found."
      });
    }

    res.status(200).json({
      success: true,
      data: result[0]
    });
  });
};

const editBooking = (req, res) => {
  updateBooking(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to update booking."
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully."
    });
  });
};

const removeBooking = (req, res) => {
  deleteBooking(req.params.id, (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete booking."
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully."
    });
  });
};

module.exports = {
  addBooking,
  getAllBookings,
  getBooking,
  editBooking,
  removeBooking
};