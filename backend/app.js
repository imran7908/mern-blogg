// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// internal imports
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express(); ///
dotenv.config();

app.use(express.json());

// database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

// server
app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
