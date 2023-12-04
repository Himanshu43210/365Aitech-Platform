const mongoose = require("mongoose");
const { Schema } = mongoose;

const tabSchema = new Schema({
  tabName: String,
  displayName: String,
  displayType: Number,
  webPage: String,
  parentId: String,
  isActive: Boolean,
  isAdd: Boolean,
  isEdit: Boolean,
  isDelete: Boolean,
  isView: Boolean,
  addWebpage: String,
  isMenu: Boolean,
  iconName: String,
  displayOrder: Number,
  encryptedTabId: String,
});

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  allowedApis: [{ type: String }],
  tabs: [tabSchema],
});

module.exports = mongoose.model("Role", roleSchema);
