const mongoose = require("mongoose");

const nanoid = require("../config/nanoid");

const RoomSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  sessionId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
