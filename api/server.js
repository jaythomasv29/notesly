const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const db = require("./db");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.post("/api/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  if(!file) return res.status(200).json("");
  res.status(200).json(file.filename);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
