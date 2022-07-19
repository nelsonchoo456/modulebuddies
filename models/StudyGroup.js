const mongoose = require("mongoose");

const StudyGroupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  module: {
    type: String,
  },
  name: {
    type: String,
  },
  text: {
    type: String,
  },
  discord: {
    type: String,
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
});

module.exports = mongoose.model("study-group", StudyGroupSchema);
