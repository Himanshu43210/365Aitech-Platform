const express = require("express");
const Agent = require("../models/agent"); // Import your Agent model
const router = express.Router();

router.post("/addAgent", async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    await newAgent.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adding agent:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.put("/updateAgent/:id", async (req, res) => {
  try {
    const agentId = req.params.id;
    const updateData = req.body;
    // Optionally add server-side logic to set 'updatedBy' if not set in request
    if (!updateData.updatedBy) {
      updateData.updatedBy = "DefaultUser"; // Replace with appropriate logic
    }
    const updatedAgent = await Agent.findByIdAndUpdate(agentId, updateData, {
      new: true,
    });
    res.status(200).json({ success: true, updatedAgent });
  } catch (error) {
    console.error("Error updating agent:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Fetch all agents
router.get("/getAgents", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch active agents
router.get("/getActiveAgents", async (req, res) => {
  try {
    const activeAgents = await Agent.find({ status: "active" });
    res.json(activeAgents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch archived agents with lastRun > 90 days
router.get("/getArchivedAgents", async (req, res) => {
  const ninetyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 90));

  try {
    const archivedAgents = await Agent.find({
      status: "archived",
      lastRun: { $lt: ninetyDaysAgo },
    });
    res.json(archivedAgents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
