const db = require("../db");

const addPost = (req, res) => {
  res.json("add post");
};

const getPostsByCategory = (req, res) => {
  console.log(req.query.cat);
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE category = ?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
const getPostById = (req, res) => {
  console.log(req.params);
  const q =
    "SELECT p.id AS `id`, `category`, `title`, `desc`, `date`, p.img AS `post_img`, `uid`, `username`, u.img AS `user_img`, `email` FROM posts p INNER JOIN users u ON p.uid = u.id WHERE p.id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
const deletePost = (req, res) => {};

module.exports = {
  getPostsByCategory,
  addPost,
  getPostById,
  deletePost,
};
