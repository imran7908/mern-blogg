// external exorts
const express = require("express");

// internal imports
const {
  getAllBlog,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/", getAllBlog);
router.post("/add", addBlog);
router.put("/update/:id", updateBlog);
router.get("/:id", getById);
router.delete("/:id", deleteBlog);
router.get("/user/:id", getByUserId);

module.exports = router;
