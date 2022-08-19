// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// internal imports
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express(); ///
dotenv.config();

app.use(express.json());
app.use(cors());

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
app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
