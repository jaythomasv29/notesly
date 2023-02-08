const express = require("express");
const {
  getPostsByCategory,
  addPost,
  getPostById,
  deletePost,
  editPost
} = require("../controllers/post");
const router = express.Router();

router.get("/", getPostsByCategory);
router.get("/:id", getPostById);
router.post("/add", addPost);
router.put("/edit/:id", editPost);
router.delete("/:id", deletePost);

module.exports = router;
