const mysql = require("mysql")

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "james123",
  database: "blog"
})

db.connect((err) => {
  if(err) throw err;
  console.log("Database connected");
})

module.exports = db;