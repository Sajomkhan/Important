const Project = require("../models/projectModel");
const cloudinary = require("../utils/cloudinary");
// const jwt = require("jsonwebtoken");
// const jwt_secret = process.env.JWT_SECRET_KEY;


// Create Project
exports.createProject = async (req, res) => {
  const { projectId, title, tech, github, live, desc } = req.body;
  const { path } = req.file;
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: "my_portfolio",
      width: 600,
      crop: "scale",
    });
    // Create data in DB
    const newProject = new Project({
      projectId,
      title,
      tech,
      github,
      live,
      desc,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    })
    console.log(newProject);
    const projectDoc = await newProject.save()
    res.json(projectDoc);
  } catch (error) {
    console.log(error);
  }
};


// Get Project from
exports.getProject = async (req, res) => {
  res.json(await Project.find().sort({ projectId: 1 }).limit(20));
};


// get singel Project info
exports.getSingleProject = async (req, res) => {
  const { id } = req.params;
  const projectDoc = await Project.findById(id);
  res.json(projectDoc);
};


// Delete Project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  // Delete image form cloudinary
  await cloudinary.uploader.destroy(project?.image.public_id);
  // Delete data from DB
  await Project.findByIdAndDelete(id).then(() => {
    return res.status(200).json("Delete success");
  });
};


// Update data
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { projectId, title, tech, github, live, desc } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    // Delete image from cloudinary
    let result;
    if (req.file) {
      await cloudinary.uploader.destroy(project.image.public_id);
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "my_portfolio",
        width: 600,
        crop: "scale",
      });
    }
    // New update data
    const updateData = {
      projectId,
      title,
      tech,
      github,
      live,
      desc,
      image: {
        public_id: result?.public_id || project.image.public_id,
        url: result?.secure_url || project.image.url,
      },
    };
    // Save Update data to DB
    const newProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json(newProject);
  } catch (error) {
    console.log(error);
  }
};
