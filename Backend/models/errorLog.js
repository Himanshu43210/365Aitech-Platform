const mongoose = require("mongoose");
const { Schema } = mongoose;

const errorLogSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  timestamp: { type: Date, default: Date.now },
  errorStatement: { type: String, required: true },
  description: { type: String, required: true },
  apiEndpoint: { type: String, required: true },
});

module.exports = mongoose.model("ErrorLog", errorLogSchema);
