// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// internal imports

const app = express();

dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// server
app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
