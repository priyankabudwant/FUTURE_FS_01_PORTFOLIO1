const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// POST - Save message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET - Fetch messages
router.get("/", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = router;
