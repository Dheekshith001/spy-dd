const path = require("path");
const fs = require("fs");
const { success, error } = require("../utils/responseHelper");

const hospitalListPath = path.join(__dirname, "../utils/hospitalList.json");

exports.handleEmergency = (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json(error("Invalid location data"));
    }
    const hospitals = JSON.parse(fs.readFileSync(hospitalListPath, "utf8"));
    // For demo, just return all hospitals
    res.json(success(hospitals));
  } catch (err) {
    next(err);
  }
};
