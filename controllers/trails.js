const Trail = require("../models/Trail");

// @desc GET ALL TRAILS
//@route GET /api/v1/trails
//@access PUBLIC

exports.getTrails = async (req, res, next) => {
  try {
    const trails = await Trail.find();

    return res.status(200).json({
      success: true,
      count: trails.length,
      data: trails
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc CREATE A TRAIL ISSUE
//@route POST /api/v1/trails
//@access PUBLIC

exports.addTrail = async (req, res, next) => {
  try {
    const trail = await Trail.create(req.body);

    return res.status(200).json({ success: true, data: trail });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "This issue already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};
