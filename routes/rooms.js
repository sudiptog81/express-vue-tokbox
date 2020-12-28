require("dotenv").config();

const express = require("express");

const Room = require("../models/Room");
const openTok = require("../config/openTok");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    session = openTok.createSession(
      {
        mediaMode: "relayed",
      },
      async (err, session) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "createSession error:" + err });
          return;
        }
        const { sessionId } = session;
        const room = new Room({
          sessionId,
        });
        await room.save();
        const token = openTok.generateToken(sessionId);
        res.json({
          apiKey: process.env.OPENTOK_KEY,
          roomId: room._id,
          sessionId: sessionId,
          token,
        });
      }
    );
  } catch (err) {
    console.err(err);
    res.status(500).json({ error: "createAndGetRoomToken error:" + err });
  }
});

router.get("/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const { sessionId } = await Room.findOne({ _id: roomId });
    const token = openTok.generateToken(sessionId);
    res.json({
      apiKey: process.env.OPENTOK_KEY,
      roomId: roomId,
      sessionId: sessionId,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "getRoomToken error:" + err });
  }
});

module.exports = router;
