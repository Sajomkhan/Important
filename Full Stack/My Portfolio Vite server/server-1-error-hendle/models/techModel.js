const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TechSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
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

const TechModel = model("Tech", TechSchema);

module.exports = TechModel;
