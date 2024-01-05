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