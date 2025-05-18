const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  directory: { type: mongoose.Schema.Types.ObjectId, ref: "Directory", required: true },
  filename: { type: String, required: true },
  body: String,
  description: String,
  teaser: String,
  keywords: [String],
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("File", FileSchema);
