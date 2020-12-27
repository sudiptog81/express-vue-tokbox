require("dotenv").config();

const OpenTok = require("opentok");

module.exports = new OpenTok(
  process.env.OPENTOK_KEY,
  process.env.OPENTOK_SECRET
);
