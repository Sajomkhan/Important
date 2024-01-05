const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AboutSchema = new Schema(
  {
    name: {
      type: String,
    },
    education: {
      type: String,
    },
    position: {
      type: String,
    },
    url: {
      type: String,
    },
    desc: {
      type: String,
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

const AboutModel = model("About", AboutSchema);

module.exports = AboutModel;
