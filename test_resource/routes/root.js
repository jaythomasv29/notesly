const express = require("express");
const router = express.Router();
const path = require("path");


// match the regex
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
})

module.exports = router;