const express = require("express");
const {
  getPostsByCategory,
  addPost,
  getPostById,
  deletePost,
} = require("../controllers/post");
const router = express.Router();

router.get("/", getPostsByCategory);
router.get("/:id", getPostById);
router.post("/add", addPost);


module.exports = router;
