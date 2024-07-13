const router = require("express").Router();
const Conversation =require('../models/Conversion')


router.post("/", async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Check if a conversation exists between the sender and receiver
    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      // Conversation already exists
      return res.status(409).send({ success: false, message: "Chat already exists" });
    }

    // Create a new conversation if one doesn't exist
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });

    const savedConversation = await newConversation.save();
    res.status(201).send({ success: true, message: "Conversation created successfully", conversation: savedConversation });
  } catch (err) {
    res.status(500).send({ success: false, message: "Failed to create conversation", error: err });
  }
});


//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;