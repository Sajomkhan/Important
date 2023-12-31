
// --------------------index.jx------------------------//
const app = require('./app')
const connectDB = require('./db/connection');
require('dotenv').config()

const PORT = process.env.PORT || 5010;

connectDB()

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});



// --------------------utils/errorResponse.js-----------------------//
class ErrorResponse extends Error {
  constructor(message, codeStatus) {
      super(message);
      this.codeStatus = codeStatus;
  }
}
module.exports = ErrorResponse;


// --------------------middleware/error.js-----------------------//
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
        const message = `Ressource not found ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoose duplicate value
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ErrorResponse(message, 400);
    }

    //Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => ' ' + val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.codeStatus || 500).json({
        success: false,
        error: error.message || "server error"
    })

}

module.exports = errorHandler;


// --------------------app.js-----------------------//
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require("cookie-parser");

// Import Router
const errorHandler = require('./middleware/error');
const userRouter = require("./routers/userRouter")
const projectRouter = require("./routers/projectRouter")

// Middleware
app.use(express.json())
app.use(express.urlencoded({extented: true}));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// API End Point
app.use("/api/user", userRouter)
app.use("/api/project", projectRouter)

//error middleware
app.use(errorHandler);

module.exports = app



// --------------------utils/multer.js-----------------------//

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads"); 
        // create "./uploads" file in main directory
    },
    filename: (req, file, callback) => {
        const fileName = Date.now() + '-' + file.originalname
        callback(null, fileName)
    }
})

const filefilter = (req, file, callback) => {
    if( file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ){
        callback(null, true)
    }
    else{
        callback(null, false)
        callback(new Error("Invalid file"))
    }
}

const upload = multer({
    storage : storage,
    filefilter: filefilter
})

module.exports = upload;



// ----------------router/projectRouter.js--------------------------//

const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const { createProject, getProject, getSingleProject, updateProject, deleteProject } = require('../controllers/projectController');

router.post("/", upload.single("image"), createProject);
router.get("/", getProject);
router.get("/:id", getSingleProject)
router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);

module.exports = router;


// ----------------controller/projectController.js--------------------------//
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
