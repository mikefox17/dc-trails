const express = require("express");
const { getTrails, addTrail } = require("../controllers/trails");

const router = express.Router();

router
  .route("/")
  .get(getTrails)
  .post(addTrail);

module.exports = router;
