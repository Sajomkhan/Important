// npm i bcryptjs
// npm i jsonwebtoken
// npm i cookie-parser
// npm i dotenv


//==================== index ======================//
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

app.use(cookieParser())


//==================== .env ======================//
JWT = "my jwt secret"

//==================== routes/auth.js ======================//

import express from 'express'
import { signin, signup } from '../controllers/auth.js';

const router = express.Router();

// CREATE A USER
router.post("/signup", signup)

// SIGN IN
router.post("/signin", signin)

export default router;


//==================== controllers/auth.js ======================//

import { createError } from "../error.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("user has been created");
  } catch (err) {
    next(createError(404, `Sorry! user has been not created. ${err}`));
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found"));

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isCorrectPassword) return next(createError(400, "Wrong credentials"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc // CUT OUT PASSWORD FORM USER

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

