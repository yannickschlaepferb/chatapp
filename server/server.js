const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const http = require("http");

dotenv.config();

const port = 3000;
const saltRound = 10;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors({
  origin : ["http://localhost:3001"],
  methods : ["GET", "POST", "DELETE"],
  credentials: true,
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT),
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database ");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  pool.execute(
    "SELECT username, password FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error during login:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid username or password" });
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          console.error("Error during password comparison:", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }

        if (!isValid) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid username or password" });
        }

        res.json({
          success: true,
          message: "Login successful",
          userId: user.id,
        });
      });
    }
  );
});

//SIGNUP
app.post("/signup", (req, res) => {
  console.log("here");
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.log(err);
    }
    pool.execute(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
        console.log(result);
      }
    );
    res.json({ success: true, message: "User created successfully" });
  });
});
