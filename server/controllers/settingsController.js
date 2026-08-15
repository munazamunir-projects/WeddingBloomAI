const {
  getSettingsByUserId,
  createSettings,
  updateSettings,
} = require("../models/settingsModel");


/* =========================
   GET SETTINGS
========================= */

const getSettings = async (req, res) => {

  try {

    const userId = req.user.id;

    let settings = await getSettingsByUserId(userId);


    /* =========================
       CREATE DEFAULT SETTINGS
       IF USER HAS NONE
    ========================= */

    if (!settings) {

      await createSettings(userId);

      settings = await getSettingsByUserId(userId);

    }


    res.status(200).json({
      success: true,
      data: {
        id: settings.id,
        user_id: settings.user_id,

        emailNotifications:
          Boolean(settings.email_notifications),

        weddingReminders:
          Boolean(settings.wedding_reminders),

        vendorUpdates:
          Boolean(settings.vendor_updates),

        darkMode:
          Boolean(settings.dark_mode),
      },
    });

  } catch (error) {

    console.error(
      "Get settings error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load settings.",
    });

  }

};


/* =========================
   UPDATE SETTINGS
========================= */

const updateSettingsController = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      emailNotifications,
      weddingReminders,
      vendorUpdates,
      darkMode,
    } = req.body;


    if (
      typeof emailNotifications !== "boolean" ||
      typeof weddingReminders !== "boolean" ||
      typeof vendorUpdates !== "boolean" ||
      typeof darkMode !== "boolean"
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid settings data.",
      });

    }


    let settings =
      await getSettingsByUserId(userId);


    /* =========================
       CREATE IF NOT EXISTS
    ========================= */

    if (!settings) {

      await createSettings(userId);

    }


    await updateSettings(
      userId,
      emailNotifications,
      weddingReminders,
      vendorUpdates,
      darkMode
    );


    settings =
      await getSettingsByUserId(userId);


    res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      data: {
        id: settings.id,
        user_id: settings.user_id,

        emailNotifications:
          Boolean(settings.email_notifications),

        weddingReminders:
          Boolean(settings.wedding_reminders),

        vendorUpdates:
          Boolean(settings.vendor_updates),

        darkMode:
          Boolean(settings.dark_mode),
      },
    });

  } catch (error) {

    console.error(
      "Update settings error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update settings.",
    });

  }

};


module.exports = {
  getSettings,
  updateSettingsController,
};