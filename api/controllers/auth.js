const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWTSECRETKEY;
const register = (req, res) => {
  const { email, username, password } = req.body;
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(q, [email, username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    const values = [username, email, hashedPassword];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  });
};
const login = (req, res) => {
  // CHECK USER
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Check password validate
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordValid)
      return res
        .status(400)
        .json("Invalid credentials. Wrong username or password");

    const token = jwt.sign({ id: data[0].id }, jwtSecretKey);
    const { password, ...otherUserDetails } = data[0];
    console.log(token);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(otherUserDetails);
  });
};
const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};

module.exports = {
  register,
  login,
  logout,
};
