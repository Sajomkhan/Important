const mongoose = require('mongoose')

const EducationSchema = new mongoose.Schema(
    {
        exam: String,
        institution: String,
        subject: String,
        result: String,
        years: String
    }, {timestamps: true}
)

module.exports = mongoose.model("Education", EducationSchema)