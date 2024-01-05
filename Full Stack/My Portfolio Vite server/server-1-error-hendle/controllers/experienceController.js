const Experience = require("../models/experienceModel");
// const jwt = require("jsonwebtoken");
// const jwt_secret = process.env.JWT_SECRET_KEY;


// Create Experience Data
exports.createExperience = async (req, res) => {
  const { position, company, years, responsibilities } = req.body;
  try {
    const experienceDoc = await Experience.create({
      position,
      company,
      years,
      responsibilities,
    });
    res.json(experienceDoc);
  } catch (error) {
    console.log(error);
  }
};


// Get Experience Data
exports.getExperience = async (req, res) => {
  res.json(await Experience.find().sort({ createdAt: -1 }).limit(20));
};


// get singel Experience info
exports.getSingleExperience = async (req, res) => {
try {
  const { id } = req.params;
  const experienceDoc = await Experience.findById(id);
  res.json(experienceDoc);
} catch (error) {
  console.log(error);
}
};


// Delete Experience
exports.deleteExperience = async (req, res) => {
  const { id } = req.params;
  await Experience.findByIdAndDelete(id).then(() => {
    res.status(200).json("Delete success");
  });
};


// Update data
exports.updateExperience = async (req, res) => {
  const { id } = req.params;
  const { position, company, years, responsibilities } = req.body;
  const updateData = { position, company, years, responsibilities }; 
  try {
    const newExperience = await Experience.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json(newExperience);
  } catch (error) {
    console.log(error);
  }
};
