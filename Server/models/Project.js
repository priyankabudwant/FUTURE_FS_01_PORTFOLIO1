const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
 
  tags: [String],
  githubUrl: String,
  demoUrl: String,
});

module.exports = mongoose.model("Project", ProjectSchema);
