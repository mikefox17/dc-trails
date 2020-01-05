const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const TrailSchema = new mongoose.Schema({
  trailId: {
    type: String,
    required: [true, "Please add an issue location"],
    unique: true,
    trim: true
  },
  issueDetail: {
    type: String,
    required: [true, "Please add an issue"],
    unique: true,
    trim: true
  },
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//geocode and create location

TrailSchema.pre("save", async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  //do not save address

  this.address = undefined;
  next();
});

module.exports = mongoose.model("Trail", TrailSchema);
