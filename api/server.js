const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const db = require("./db");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());


app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

})