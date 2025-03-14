const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, senderName, content } = req.body;

    if (!senderId || !receiverId || !senderName || !content) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = new Message({ senderId, receiverId, senderName, content });
    await newMessage.save();

    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message." });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
