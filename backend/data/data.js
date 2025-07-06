const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Mounika",
    email: "mounika@gmail.com",
    password: bcrypt.hashSync("mounika123", 10),
  },
  {
    name: "Geetha",
    email: "geetha@gmail.com",
    password: bcrypt.hashSync("geetha123", 10),
  },
  {
    name: "Prasanna",
    email: "prasanna@gmail.com",
    password: bcrypt.hashSync("prasanna123", 10),
  },
  {
    name: "Arjun",
    email: "arjun@gmail.com",
    password: bcrypt.hashSync("arjun123", 10),
  },
  {
    name: "Guest User",
    email: "guest@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

const chats = [
  {
    isGroupChat: false,
    users: [
      { name: "Mounika", email: "mounika@gmail.com" },
      { name: "Geetha", email: "geetha@gmail.com" },
    ],
    chatName: "Mounika & Geetha",
  },
  {
    isGroupChat: false,
    users: [
      { name: "Prasanna", email: "prasanna@gmail.com" },
      { name: "Arjun", email: "arjun@gmail.com" },
    ],
    chatName: "Prasanna & Arjun",
  },
  {
    isGroupChat: true,
    users: [
      { name: "Mounika", email: "mounika@gmail.com" },
      { name: "Geetha", email: "geetha@gmail.com" },
      { name: "Prasanna", email: "prasanna@gmail.com" },
      { name: "Arjun", email: "arjun@gmail.com" },
      { name: "Guest User", email: "guest@example.com" },
    ],
    chatName: "SRM Chat Group",
    groupAdmin: { name: "Mounika", email: "mounika@gmail.com" },
  },
];

module.exports = { users, chats };




