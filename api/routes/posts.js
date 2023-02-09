const express = require("express");
const {
  getPostsByCategory,
  addPost,
  addCommentToPost,
  getPostById,
  deletePost,
  editPost,
  getCommentsByPostId,
  getCommentById
} = require("../controllers/post");
const { authenticateJWT } = require("../middlewares/middleware");
const router = express.Router();

router.get("/", getPostsByCategory);
router.get("/:id", getPostById);
router.get("/:id/comments", getCommentsByPostId)
router.get("/comments/:id", getCommentById)

router.post("/add", addPost);
router.post("/add/:id/comment", authenticateJWT, addCommentToPost);
router.put("/edit/:id", editPost);
router.delete("/:id", deletePost);

module.exports = router;
