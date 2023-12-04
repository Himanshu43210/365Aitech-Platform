const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new User({
      username,
      passwordHash: hashedPassword,
      email,
      roles: ["freeUser"], // Default role
    });

    user = await user.save();
    res
      .status(201)
      .send({ userId: user._id, message: "User created successfully" });
  } catch (error) {
    res.status(500).send("Error registering new user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).send("Invalid username or password");
    }

    const token = jwt.sign(
      { userId: user._id, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.send({ token });
  } catch (error) {
    res.status(500).send("Error during login");
  }
});

router.get("/getAuthTabs", async (req, res) => {
  // Implement logic to fetch tabs based on user roles
});

module.exports = router;