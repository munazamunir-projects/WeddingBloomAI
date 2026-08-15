const {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead,
  deleteNotification
} = require("../models/notificationModel");

const addNotification = (req, res) => {
  const notificationData = {
    user_id: req.user.id,
    title: req.body.title,
    message: req.body.message,
    notification_type: req.body.notification_type,
    is_read: 0
  };

  createNotification(notificationData, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to create notification."
      });
    }

    res.status(201).json({
      success: true,
      message: "Notification created successfully.",
      data: {
        id: result.insertId
      }
    });
  });
};

const getMyNotifications = (req, res) => {
  getNotificationsByUser(req.user.id, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch notifications."
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  });
};

const readNotification = (req, res) => {
  markNotificationAsRead(
    req.params.id,
    req.user.id,
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Failed to mark notification as read."
        });
      }

      res.status(200).json({
        success: true,
        message: "Notification marked as read."
      });
    }
  );
};

const removeNotification = (req, res) => {
  deleteNotification(
    req.params.id,
    req.user.id,
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Failed to delete notification."
        });
      }

      res.status(200).json({
        success: true,
        message: "Notification deleted successfully."
      });
    }
  );
};

module.exports = {
  addNotification,
  getMyNotifications,
  readNotification,
  removeNotification
};