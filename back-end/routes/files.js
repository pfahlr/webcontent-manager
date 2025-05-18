const express = require("express");
const File = require("../models/File");
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    directory,
    filename,
    body,
    description,
    teaser,
    keywords,
    lastmodified
  } = req.body;

  const file = new File({
    directory,
    filename,
    body,
    description,
    teaser,
    keywords,
    createdAt: new Date(lastmodified),
    updatedAt: new Date(lastmodified),
  });

  await file.save();
  res.json(file);
});

module.exports = router;
