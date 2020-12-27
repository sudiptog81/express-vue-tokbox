require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const history = require("connect-history-api-fallback");

const dbInit = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan("tiny"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dbInit();

app.use("/api/rooms/", require("./routes/rooms"));

app.use(history());
app.use(express.static("./client/dist"));

app.get("/", (req, res) => {
  res.sendFile("./client/dist/index.html");
});

app.listen(PORT, () => console.log(`Listening on http://0.0.0.0:${PORT}...`));
