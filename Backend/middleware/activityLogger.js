const ActivityLog = require("../models/activityLog");

const activityLogger = (req, res, next) => {
  const userId = req.user ? req.user.userId : null; // Assuming req.user is set by your authentication middleware
  const action = `${req.method} ${req.originalUrl}`;
  const details = JSON.stringify(req.body);

  const logEntry = new ActivityLog({
    userId,
    action,
    details,
  });

  logEntry
    .save()
    .then(() => next())
    .catch((err) => console.error("Error logging activity:", err));
};

module.exports = activityLogger;
