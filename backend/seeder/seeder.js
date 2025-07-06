const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../dotenv" });

const { users, chats } = require("../data/data");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const connectDB = require("../config/db");

console.log(" Using MONGO_URI:", process.env.MONGO_URI);
if (!process.env.MONGO_URI) {
  console.error(" MONGO_URI not found in .env");
  process.exit(1);
}
connectDB();

const importData = async () => {
  try {
    console.log(" Deleting old data...");
    await User.deleteMany();
    await Chat.deleteMany();

    console.log("Inserting sample users...");
    const createdUsers = await User.insertMany(users);
    const userMap = {};
    createdUsers.forEach((user) => {
      userMap[user.email] = user._id;
    });

    console.log(" Preparing chat data...");
    const updatedChats = chats.map((chat) => {
      const updatedChat = { ...chat };
      updatedChat.users = chat.users.map((u) => userMap[u.email]);

      if (chat.isGroupChat && chat.groupAdmin) {
        updatedChat.groupAdmin = userMap[chat.groupAdmin.email];
      }

      return updatedChat;
    });

    console.log("Inserting chat data...");
    await Chat.insertMany(updatedChats);

    console.log("Sample Users and Chats added successfully!");
    process.exit();
  } catch (error) {
    console.error(" Error with data import:", error);
    process.exit(1);
  }
};

importData();

