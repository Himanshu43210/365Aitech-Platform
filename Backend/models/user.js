const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

module.exports = mongoose.model("User", userSchema);
