const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const IntroductionSchema = new Schema(
  {
    headline: {
      type: String,
      required: [true, "Require Headline"],
    },

    skills_initiative: {
      type: String,
      required: [true, "Require Skills Inatiative"],
    },

    skills: {
      type: [String],
      default: [],
      required: [true, "Require Skills"],
    },  

    desc: {
      type: String,
      required: [true, "Require Description"],
    },

    image: {
      url: String,
      public_id: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Introduction", IntroductionSchema);