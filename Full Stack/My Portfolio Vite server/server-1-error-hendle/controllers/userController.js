require('dotenv').config()
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const jwt_secret = process.env.JWT_SECRET_KEY

// User register
exports.userRegister = async (req, res) => {
  const { userName, password } = req.body
  const isEmailExist = await User.findOne({userName})
  if(isEmailExist) return res.status(400).json('Email already exist')

  try {
    const userDoc = await User.create({
      userName,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}


// login, create token & create cookie
exports.userLogin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const userDoc = await User.findOne({ userName });
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign({ userName, id: userDoc._id }, jwt_secret, {}, (error, token) => {
        if (error) throw error;
        res.cookie("token", token).json({
          id: userDoc._id,
          userName,
        });
      });
    } else {
      res.status(400).json("Wrong credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};


// Logout, remove cookies
exports.userLogout = async (req, res) => {
  res.cookie("token", "").json("logout");
};


// to check login, verify token from backend to frontend Header Component
exports.userProfile = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwt_secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};


// Delete user
exports.userDelete = async(req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwt_secret, {}, async (err, info) => {
    if (err) throw err;
    const { id } = req.params;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await Post.findByIdAndDelete(id)
  })
}

