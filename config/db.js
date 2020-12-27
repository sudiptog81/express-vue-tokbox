require("dotenv").config();

const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );
  mongoose.connection.once("open", () =>
    console.log("Connected to Database...")
  );
};
