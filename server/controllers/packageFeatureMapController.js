const {
  addFeatureToPackage,
  getPackageFeatures,
  removeFeatureFromPackage
} = require("../models/packageFeatureMapModel");

const addFeature = (req, res) => {

  addFeatureToPackage(
    req.params.packageId,
    req.body.feature_id,
    (err) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Failed to add feature.",
          error: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: "Feature added to package successfully."
      });
    }
  );
};

const getFeatures = (req, res) => {

  getPackageFeatures(
    req.params.packageId,
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch package features.",
          error: err.message
        });
      }

      res.json({
        success: true,
        data: result
      });
    }
  );
};

const removeFeature = (req, res) => {

  removeFeatureFromPackage(
    req.params.packageId,
    req.params.featureId,
    (err) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to remove feature.",
          error: err.message
        });
      }

      res.json({
        success: true,
        message: "Feature removed successfully."
      });
    }
  );
};

module.exports = {
  addFeature,
  getFeatures,
  removeFeature
};