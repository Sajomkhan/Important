const About = require("../models/aboutModel");
const cloudinary = require("../utils/cloudinary");
// const jwt = require("jsonwebtoken");
// const jwt_secret = process.env.JWT_SECRET_KEY;


// Create About
exports.createAbout = async (req, res) => {
  const { name, education, position, url, desc } = req.body;
  const { path } = req.file;
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: "my_portfolio",
      width: 600,
      crop: "scale",
    });
    // Create data in DB
    const AboutDoc = await About.create({
      name,
      education,
      position,
      url,
      desc,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.json(AboutDoc);
  } catch (error) {
    console.log(error);
  }
};


// Get About from
exports.getAbout = async (req, res) => {
  res.json(await About.find().sort({ createdAt: -1 }).limit(20));
};


// get singel About info
exports.getSingleAbout = async (req, res) => {
  const { id } = req.params;
  const aboutDoc = await About.findById(id);
  res.json(aboutDoc);
};



// Delete About
exports.deleteAbout = async (req, res) => {
  const { id } = req.params;
  const about = await About.findById(id);
  // Delete image form cloudinary
  await cloudinary.uploader.destroy(about?.image.public_id);
  // Delete data from DB
  await About.findByIdAndDelete(id).then(() => {
    return res.status(200).json("Delete success");
  });
};


// Update data
exports.updateAbout = async (req, res) => {
  const { id } = req.params;
  const { name, education, position, url, desc } = req.body;
  try {
    const about = await About.findById(req.params.id);
    // Delete image from cloudinary
    let result;
    if (req.file) {
      await cloudinary.uploader.destroy(about.image.public_id);
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "my_portfolio",
        width: 600,
        crop: "scale",
      });
    }
    // New update data
    const updateData = {
      name,
      education,
      position,
      url,
      desc,
      image: {
        public_id: result?.public_id || about.image.public_id,
        url: result?.secure_url || about.image.url,
      },
    };
    // Save Update data to DB
    const newAbout = await About.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json(newAbout);
  } catch (error) {
    console.log(error);
  }
};
