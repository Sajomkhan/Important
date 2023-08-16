const Project = require("../models/projectModel");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const fs = require("fs");

const jwt_secret = process.env.JWT_SECRET_KEY;


// Create Project from Post request
exports.createProject = async (req, res) => {

  // received image of file request
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extention = parts[parts.length - 1];
  const newPath = path + "." + extention;
  fs.renameSync(path, newPath);

  // received text requests
  const { title, tech, desc } = req.body;

  // for author info, we can use the verified cookies
  const { token } = req.cookies;

  jwt.verify(token, jwt_secret, {}, async (err, info) => {

    if (err) throw err;

    const postDoc = await Project.create({
      title,
      tech,
      desc,
      image: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
};


// Get Project from
exports.getProject = async (req, res) => {
  res.json(
    await Project.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
};


// get singel Project info
exports.getSingleProject = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Project.findById(id).populate("author", ["username"]);
  res.json(postDoc);
};


// Edit & update Project
exports.updateProject = async (req, res) => {
  
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, jwt_secret, {}, async (err, info) => {

    if (err) throw err;
    const { id, title, tech, desc } = req.body;
    const postDoc = await Project.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }    
    await postDoc
      .updateOne({
        title,
        tech,
        desc,
        image: newPath ? newPath : postDoc.image,
      })
      // delete previous upload file
      .then(() => {
        fs.unlinkSync(postDoc.image);
      })
      .then(() => {
        res.json(postDoc);
      });
  });
};


// Delete Project
exports.deleteProject = async (req, res) => {

  const { token } = req.cookies;

  jwt.verify(token, jwt_secret, {}, async (err, info) => {
    if (err) throw err;
    const { id } = req.params;
    const postDoc = await Project.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await Project.findByIdAndDelete(id)
      // delete upload file
      .then(() => {
        fs.unlinkSync(postDoc.image);
      })
      .then(() => {
        return res.status(200).json("Delete success");
      });
  });
};
