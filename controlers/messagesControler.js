const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");
//const { sendAnSms } = require("../services/smsService");

const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().lean().exec();
  if (!messages?.length) {
    return res.status(200).json([]);
  }

  res.json(messages);
});
const createMessage = asyncHandler(async (req, res) => {
  const { name, messageText, email, phone } = req.body;

  if (!name || !messageText || !email || !phone) {
    return res.status(400).json({ message: "All field are required" });
  }

  const newMessage = await Message.create({
    name,
    messageText,
    email,
    phone
  });

  if (newMessage) {
    res.status(201).json({ message: `Message sent succesfully`, newMessage });
   
    // await sendAnSms([], "Website message", true);
    return;
  } else {
    return res.status(400).json({ message: "Invalid Message inputs" });
   
  }
});
const updateMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //const {sender, message} = req.body;
  const { seen } = req.body;

  // Validate ID first
  if (!id) {
    return res.status(400).json({ message: "Message ID is required" });
  }

  // Convert seen string back to boolean
  const isSeen = seen === "true" || seen === true;

  // Validate all required fields
  if (typeof isSeen !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const updatedMessage = await Message.findById(id).exec();
  if (!updatedMessage) {
    return res.status(404).json({ message: "Message not found" });
  }

  // Update fields
  updatedMessage.seen = isSeen;

  const seenMessage = await updatedMessage.save();
  res.json({
    message: `${seenMessage.sender} message seen value is set as ${seenMessage.seen}`,
    seenMessage,
  });
});
const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Message ID is required" });
  }

  const message = await Message.findById(id).exec();
  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  // Store car info before deletion
  const messageInfo = `${message.sender} `;

  const result = await message.deleteOne();
  res.json({ message: `${messageInfo} deleted successfully!` });
});

module.exports = {
  getAllMessages,
  createMessage,
  updateMessage,
  deleteMessage,
};