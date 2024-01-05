const Education = require("../models/educationModel");

// Create Education Data
exports.createEducation = async (req, res) => {
  const { exam, institution, subject, result, years } = req.body;
  try {
    const educationDoc = await Education.create({
      exam,
      institution,
      subject,
      result,
      years,
    });
    res.json(educationDoc);
  } catch (error) {
    console.log(error);
  }
};

// Get Eduation Data
exports.getEducation = async (req, res) => {
  res.json(await Education.find().sort({ createAt: -1 }).limit(20));
};

// get Singel Education Data
exports.getSingleEducation = async (req, res) => {
  res.json(await Education.findById(id.req.params));
};

// Delete education data
exports.deleteEducation = async (req, res) => {
  await Education.findByIdAndDelete(id.req.params).then((res) => {
    return res.status(200).json("Delete success");
  });
};


// Update education data
exports.updateEducation = async(req, res) => {
    const { id } = req.params
    const { exam, institution, subject, result, years } = req.body;
    const updateData = { exam, institution, subject, result, years }

    try {
        const newEducation = await Education.findByIdAndUpdate( id, updateData, {new: true} )
        res.json(newEducation)
    } catch (error) {
        console.log(error);
    }
}
