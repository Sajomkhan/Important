const Introduction = require("../models/introductionModel ");
const cloudinary = require("../utils/cloudinary");
// const jwt = require("jsonwebtoken");
// const jwt_secret = process.env.JWT_SECRET_KEY;


// Create Introduction
exports.createIntroduction = async (req, res) => {
  const { headline, skills_initiative, skills, desc } = req.body;
  const { path } = req.file;
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: "my_portfolio",
      width: 600,
      crop: "scale",
    });
    // Create data in DB
    const IntroductionDoc = await Introduction.create({
      headline,
      skills_initiative,
      skills,
      desc,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.json(IntroductionDoc);
  } catch (error) {
    console.log(error);
  }
};


// Get Introduction from
exports.getIntroduction = async (req, res) => {
  res.json(await Introduction.find().sort({ createdAt: -1 }).limit(20));
};


// get singel Introduction info
exports.getSingleIntroduction = async (req, res) => {
  const { id } = req.params;
  const introductionDoc = await Introduction.findById(id);
  res.json(introductionDoc);
};



// Delete Introduction
exports.deleteIntroduction = async (req, res) => {
  const { id } = req.params;
  const introduction = await Introduction.findById(id);
  // Delete image form cloudinary
  await cloudinary.uploader.destroy(introduction?.image.public_id);
  // Delete data from DB
  await Introduction.findByIdAndDelete(id).then(() => {
    return res.status(200).json("Delete success");
  });
};


// Update data
exports.updateIntroduction = async (req, res) => {
  const { id } = req.params;
  const { headline, skills_initiative, skills, desc } = req.body;
 
  try {
    const introduction = await Introduction.findById(id);
    // Delete image from cloudinary
    let result;
    if (req.file) {
      await cloudinary.uploader.destroy(introduction.image.public_id);
      result = await cloudinary.uploader.upload(req.file?.path, {
        folder: "my_portfolio",
        width: 600,
        crop: "scale",
      });
    }
    // New update data
    const updateData = {
      headline,
      skills_initiative,
      skills: skills.split('\n'),
      desc,
      image: {
        public_id: result?.public_id || introduction.image.public_id,
        url: result?.secure_url || introduction.image.url,
      },
    };
    // Save Update data to DB
    const newIntroduction = await Introduction.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json(newIntroduction);
  } catch (error) {
    console.log(error);
  }
};
