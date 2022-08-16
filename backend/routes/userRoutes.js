// external exorts
const express = require("express");

// internal imports
const { getAllUser, signup } = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup)

module.exports = router;
