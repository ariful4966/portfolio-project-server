const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  key: String,
  category: String,
  name: String,
  about: String,
  img: String,
  url: String,
});

const Project = model("Project", projectSchema);
module.exports = Project;
