const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"] },
  status: {
    type: String,
    enum: ["open", "in-progress", "closed"],
    default: "open",
  },
  createdAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", schema);

module.exports = Issue;
