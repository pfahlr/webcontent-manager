const mongoose = require("mongoose");

const DirectorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Directory", default: null },
});

module.exports = mongoose.model("Directory", DirectorySchema);
