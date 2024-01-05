const express = require("express");
const router = express.Router();

const { userRegister, userLogin, userLogout, userProfile, userDelete } = require('../controllers/userController');

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout",userLogout);
router.get("/profile", userProfile);
router.post("/:id", userDelete)

module.exports = router;