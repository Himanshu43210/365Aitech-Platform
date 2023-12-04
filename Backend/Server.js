const express = require("express");
const mongoose = require("mongoose");
const profileRoute = require("./routes/profile");
const authRoute = require("./routes/auth");
require("dotenv").config();

const app = express();
app.use(express.json());

const activityLogger = require("./middleware/activityLogger");
const errorHandler = require("./middleware/errorHandler");
const authHandler = require("./middleware/auth");

app.use("/auth", authRoute);

app.use(authHandler);
app.use(activityLogger);
app.use(errorHandler);

app.use("/profile", profileRoute);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
