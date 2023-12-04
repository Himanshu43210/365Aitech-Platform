const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");
require("dotenv").config();

const router = express.Router();

router.get("/getTabs", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the header
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const role = await Role.findById(user.role);
    if (!role) return res.status(404).send("Role not found");

    const tabs = role.tabs; // Assuming tabs is an array in the Role model
    res.send(tabs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching tabs");
  }
});

module.exports = router;
