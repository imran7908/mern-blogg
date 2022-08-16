const Blog = require("../model/Blog");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const { default: mongoose } = require("mongoose");

const getAllBlog = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({
      message: "No blogs found!",
    });
  }
  return res.status(200).json({ blogs });
};

const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(500).json({
      message: "Unable to find user by this ID!",
    });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });

  try {
    await blog.save();
    existingUser.blogs.push(blog);
    await existingUser.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ blog });
};

const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(500).json({
      message: "Unable to update the blog!",
    });
  }

  return res.status(200).json({ blog });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(404).json({
      message: "No blog is found!",
    });
  }

  return res.status(200).json({ blog });
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(500).json({
      message: "Unable to delete!",
    });
  }

  return res.status(200).json({
    message: "deleted successfully!",
  });
};

const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;

  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }

  if (!userBlogs) {
    return res.status(404).json({
      message: "No blogs found",
    });
  }

  return res.status(200).json({ blogs: userBlogs });
};

module.exports = {
  getAllBlog,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
};
