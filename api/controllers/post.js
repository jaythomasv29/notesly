const db = require("../db");
const jwt = require("jsonwebtoken");

const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");
  jwt.verify(token, process.env.JWTSECRETKEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO posts (`category`, `title`, `desc`, `uid`, `img`) VALUES (?, ?, ?, ?, ?)";
    const values = [
      req.body.category,
      req.body.title,
      req.body.desc,
      userInfo.id,
      req.body.img,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been published");
    });
  });
};

const addCommentToPost = (req, res) => {
  const q = "INSERT INTO comments (`pid`, `uid`, `comment`) VALUES (?, ?, ?)";
  console.log(req.params.id);
  const values = [req.body.pid, req.body.uid, req.body.comment];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data.insertId);
  });
};

const getCommentById = (req, res) => {
  const q =
    "SELECT c.comment, c.date, u.id AS `uid`, u.username, u.email FROM comments c INNER JOIN users u ON c.uid = u.id INNER JOIN posts p on c.pid = p.id WHERE c.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if(err) return res.status(500).json("Error getting comment")
    res.json(data);
  });
};

const editPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");
  jwt.verify(token, process.env.JWTSECRETKEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "UPDATE posts SET `category`= ?, `title` = ?, `desc` = ?, `img` = ? WHERE `id` = ? AND `uid` = ?";
    const values = [
      req.body.category,
      req.body.title,
      req.body.desc,
      req.body.img,
      req.params.id,
      userInfo.id,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated");
    });
  });
};

const getPostsByCategory = (req, res) => {
  const q = req.query.cat
    ? "SELECT p.id AS `id`, `category`, `title`, `desc`, `date`, p.img AS `post_img`, `uid`, `username`, u.img AS `user_img`, `email` FROM posts p INNER JOIN users u ON p.uid = u.id WHERE category = ?"
    : "SELECT p.id AS `id`, `category`, `title`, `desc`, `date`, p.img AS `post_img`, `uid`, `username`, u.img AS `user_img`, `email` FROM posts p INNER JOIN users u ON p.uid = u.id";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
const getPostById = (req, res) => {
  const q =
    "SELECT p.id AS `id`, `category`, `title`, `desc`, `date`, p.img AS `post_img`, `uid`, `username`, u.img AS `user_img`, `email` FROM posts p INNER JOIN users u ON p.uid = u.id WHERE p.id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

const getCommentsByPostId = (req, res) => {
  const q =
    "SELECT c.id, c.comment, c.date, u.id AS `uid`, u.username, u.email FROM comments c INNER JOIN users u ON c.uid = u.id INNER JOIN posts p on c.pid = p.id WHERE p.id = ? ORDER BY c.date DESC";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
const deletePost = (req, res) => {
  // check if user is authenticated & has a web token
  const token = req.cookies.access_token;
  console.log(req.cookies);
  if (!token) return res.status(500).json("Not authenticated");

  // verify their jwt
  jwt.verify(token, process.env.JWTSECRETKEY, (err, userInfo) => {
    if (err)
      return res.status(403).json("Invalid credentials, token is not valid");

    const q = "DELETE from posts WHERE id = ? AND `uid` = ?";
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(`Post ${req.params.id} successfully deleted`);
    });
  });
};

module.exports = {
  getPostsByCategory,
  addPost,
  addCommentToPost,
  editPost,
  getPostById,
  deletePost,
  getCommentsByPostId,
  getCommentById
};
