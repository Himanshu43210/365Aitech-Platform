const mongoose = require("mongoose");
const { Schema } = mongoose;

const activityLogSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: String },
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);
