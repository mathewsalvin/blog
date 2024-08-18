const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

require('./connection');
const BlogModel = require('./model');

// POST API to add new blog post
app.post("/add", async (req, res) => {
  try {
    const newBlog = new BlogModel(req.body);
    await newBlog.save();
    res.status(201).send({ message: "Blog post added successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error adding blog post", error });
  }
});

// GET API to fetch all blog posts
app.get("/details", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching blog posts", error });
  }
});

// DELETE API to remove a blog post by ID
app.delete("/removedetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await BlogModel.findByIdAndDelete(id);
    res.send({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting blog post", error });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, req.body, { new: true });
    res.send({ message: "Blog post updated successfully", updatedBlog });
  } catch (error) {
    res.status(500).send({ message: "Error updating blog post", error });
  }
});


