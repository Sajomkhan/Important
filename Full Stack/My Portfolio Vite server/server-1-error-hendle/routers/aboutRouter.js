const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const { createAbout, getAbout, updateAbout, deleteAbout } = require("../controllers/aboutController");


router.post("/", upload.single("image"), createAbout);
router.get("/", getAbout);
router.put("/:id", upload.single("image"), updateAbout);
router.delete("/:id", deleteAbout);

module.exports = router;