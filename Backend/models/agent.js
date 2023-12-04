const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: String,
  type: String,
  role: String,
  description: String,
  tag: String,
  status: String,
  lastRun: Date,
  createdBy: String,
  createdDate: { type: Date, default: Date.now },
  updatedBy: String,
  updateDate: { type: Date, default: Date.now },
});

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;
