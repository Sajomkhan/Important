const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const { createIntroduction, getIntroduction, updateIntroduction, deleteIntroduction } = require("../controllers/introductionController");


router.post("/", upload.single("image"), createIntroduction);
router.get("/", getIntroduction);
router.put("/:id", upload.single("image"), updateIntroduction);
router.delete("/:id", deleteIntroduction);

module.exports = router;