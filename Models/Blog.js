const { Schema, model } = require("mongoose");

const blogSchma = new Schema({
  key: String,
  name: String,
  about: String,
  img: String,
  url: String,
  website: String,
});
const Blog = model("Blog", blogSchma);

module.exports = Blog;
