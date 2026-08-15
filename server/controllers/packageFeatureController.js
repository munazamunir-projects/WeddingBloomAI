const {
  createFeature,
  getFeatures,
  getFeatureById,
  deleteFeature
} = require("../models/packageFeatureModel");

const addFeature = (req, res) => {

  createFeature(
    {
      feature_name: req.body.feature_name,
      description: req.body.description
    },
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Failed to create feature.",
          error: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: "Feature created successfully.",
        data: {
          id: result.insertId
        }
      });
    }
  );
};

const getAllFeatures = (req, res) => {

  getFeatures((err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch features.",
        error: err.message
      });
    }

    res.json({
      success: true,
      data: result
    });
  });
};

const getFeature = (req, res) => {

  getFeatureById(req.params.id, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch feature.",
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Feature not found."
      });
    }

    res.json({
      success: true,
      data: result[0]
    });
  });
};

const removeFeature = (req, res) => {

  deleteFeature(req.params.id, (err) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete feature.",
        error: err.message
      });
    }

    res.json({
      success: true,
      message: "Feature deleted successfully."
    });
  });
};

module.exports = {
  addFeature,
  getAllFeatures,
  getFeature,
  removeFeature
};