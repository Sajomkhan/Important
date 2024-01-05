const Tech = require("../models/techModel");
const cloudinary = require("../utils/cloudinary");

exports.createTech = async (req, res) => {
  const { path } = req.file;
  const { title } = req.body;
  
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: "my_portfolio",
      width: 200,
      crop: "scale",
    });

     // Create data in DB
    const tech = await Tech.create({
      title,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.json(tech);
  } catch (error) {
    console.log(error);
  }
};

exports.getTech = async (req, res) => {
  try {
    const tech = await Tech.find();
    res.json(tech);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTech = async ( req, res) => {
  try {
    //  Find tech by id
    const tech = await Tech.findById(req.params.id);

    // Delete image form cloudinary
    await cloudinary.uploader.destroy(tech?.image.public_id)

    // Delete data from db
    await Tech.findByIdAndDelete(req.params.id)
    res.json(tech)
    
  } catch (error) {
    console.log(error);    
  }
}
