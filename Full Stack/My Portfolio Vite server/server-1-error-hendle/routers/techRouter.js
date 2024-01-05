const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { createTech, getTech, deleteTech } = require("../controllers/techController");

router.post("/", upload.single("image"), createTech);
router.get("/", getTech);
router.delete("/:id", deleteTech);

module.exports = router;
