const {
  createEvent,
  getEventsByWedding,
  getEventById,
  updateEvent,
  deleteEvent
} = require("../models/eventModel");


// CREATE EVENT
const addEvent = (req, res) => {
  const eventData = {
    wedding_id: req.body.wedding_id,
    event_name: req.body.event_name,
    event_date: req.body.event_date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    venue: req.body.venue,
    description: req.body.description
  };

  createEvent(eventData, (err, result) => {
    if (err) {
      console.log("Create Event Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to create event.",
        error: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: {
        id: result.insertId
      }
    });
  });
};


// GET EVENTS FOR WEDDING
const getWeddingEvents = (req, res) => {
  getEventsByWedding(req.params.weddingId, (err, result) => {
    if (err) {
      console.log("Get Events Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch events.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  });
};


// GET SINGLE EVENT
const getEvent = (req, res) => {
  getEventById(req.params.id, (err, result) => {
    if (err) {
      console.log("Get Event Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch event.",
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found."
      });
    }

    res.status(200).json({
      success: true,
      data: result[0]
    });
  });
};


// UPDATE EVENT
const editEvent = (req, res) => {
  updateEvent(req.params.id, req.body, (err) => {
    if (err) {
      console.log("Update Event Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to update event.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully."
    });
  });
};


// DELETE EVENT
const removeEvent = (req, res) => {
  deleteEvent(req.params.id, (err) => {
    if (err) {
      console.log("Delete Event Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete event.",
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully."
    });
  });
};


module.exports = {
  addEvent,
  getWeddingEvents,
  getEvent,
  editEvent,
  removeEvent
};