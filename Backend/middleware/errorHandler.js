const ErrorLog = require("../models/errorLog");

const errorHandler = (err, req, res, next) => {
  const userId = req.user ? req.user.userId : null; // Assuming req.user is set by your authentication middleware
  const apiEndpoint = `${req.method} ${req.originalUrl}`;
  const errorStatement = err.message;
  const description = err.stack;

  const errorLogEntry = new ErrorLog({
    userId,
    apiEndpoint,
    errorStatement,
    description,
  });

  errorLogEntry
    .save()
    .then(() => res.status(500).send("An error occurred"))
    .catch((logErr) => console.error("Error logging error:", logErr));
};

module.exports = errorHandler;
