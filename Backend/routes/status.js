const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Note = require('../models/Notes');

// GET /api/stats
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalNotes = await Note.countDocuments();

    res.json({
      users: totalUsers,
      notes: totalNotes,
      uptime: 99,
      support: 24
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;