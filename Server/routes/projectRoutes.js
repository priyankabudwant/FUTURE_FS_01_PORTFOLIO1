const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET all projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// ADD project
router.post("/", async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

// DELETE project
router.delete("/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

module.exports = router;
