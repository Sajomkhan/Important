const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProjectSchema = new Schema(
  {
    projectId: { type: String },
    title: { type: String },
    tech: { type: String },
    github: { type: String },
    live: { type: String },
    desc: { type: String },
    image: {
      url: String,
      public_id: String,
    }
  },
  {
    timestamps: true,
  }
);

const ProjectModel = model("Project", ProjectSchema);

module.exports = ProjectModel;

