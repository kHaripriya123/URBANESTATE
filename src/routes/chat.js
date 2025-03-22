// const express = require("express");
// const Message = require("../models/chat");

// const router = express.Router();

// // Send a message
// router.post("/", async (req, res) => {
//   try {
//     const { senderId, receiverId, text } = req.body;
//     const message = new Message({ senderId, receiverId, text });
//     await message.save();
//     res.status(201).json(message);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get messages between two users
// router.get("/:senderId/:receiverId", async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.params;
//     const messages = await Message.find({
//       $or: [
//         { senderId, receiverId },
//         { senderId: receiverId, receiverId: senderId },
//       ],
//     })
//     .populate("senderId", "name")
//     .populate("receiverId", "name")
//     .sort("createdAt");

//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
