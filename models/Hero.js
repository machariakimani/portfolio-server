// models/Hero.js
const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },
  heroPortrait: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    required: true
  },
  typingTexts: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model("Hero", heroSchema);