const express = require("express");
const router = express.Router();

const { createExperience, getExperience, updateExperience, deleteExperience, getSingleExperience } = require("../controllers/experienceController");

router.post("/", createExperience);
router.get("/", getExperience);
router.get("/:id", getSingleExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);


module.exports = router;