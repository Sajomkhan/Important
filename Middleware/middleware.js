
//================== roote/verifyToken.js =====================//

import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT, (err, userInfo) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = userInfo;  // Setting user info into req
    next()
  });
};

//================== routes/users.js =====================// 
import { verifyToken } from '../verifyToken.js';

// UPDATE USER
router.put("/:id", verifyToken, update)
// DELETE USER
router.delete("/:id", verifyToken, deleteUser)


//================== routes/videos.js =====================//

import { verifyToken } from '../verifyToken.js';

 router.post("/", verifyToken, addVideo )
 router.put("/:id", verifyToken, updateVideo )
 router.delete("/:id", verifyToken, deleteVideo )


 //================== controllers/user.js =====================//

 import { createError } from "../error.js";
import User from "../models/User.js";


export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("The user has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};



 //================== controllers/videos.js =====================//

 import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const saveVideo = await newVideo.save();
    res.status(200).json(saveVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.parms.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo)
    } else{
        return next(createError(403, "You can not update only your video"));
    }
  } catch (err) {
    next(err);
  }
};

