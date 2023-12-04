const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const activityLogger = require("./middleware/activityLogger");
const errorHandler = require("./middleware/errorHandler");
const authHandler = require("./middleware/auth");

app.use(express.json());
app.use(authHandler);
app.use(activityLogger);
app.use(errorHandler);

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
