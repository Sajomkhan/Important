const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Require Position"],
    },

    company: {
      type: String,
      required: [true, "Require Company Name"],
    },

    years: {
      type: String,
      required: [true, "Require years"],
    },

    responsibilities: {
        type: [String],
        default: []
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Experience", ExperienceSchema);
